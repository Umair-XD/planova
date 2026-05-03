import { streamText, convertToModelMessages, type ModelMessage } from "ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { messages, attachments } = body;
    const sessionId = body.sessionId || body.id || `session_${Date.now()}`;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "No messages provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Extract plain text from the last user message for DB persistence
    const lastMessage = messages[messages.length - 1];
    const textContent =
      typeof lastMessage.content === "string"
        ? lastMessage.content
        : Array.isArray(lastMessage.parts)
        ? lastMessage.parts
            .filter((p: any) => p.type === "text")
            .map((p: any) => p.text)
            .join("")
        : "";

    await dbConnect();
    await Message.create({
      userId: session.user.id,
      sessionId,
      role: "user",
      content: textContent,
    });

    // Build model messages manually so image parts are never dropped.
    // convertToModelMessages may silently strip file parts in some SDK versions.
    const modelMessages: ModelMessage[] = [];

    for (const m of messages as any[]) {
      const role = m.role as "user" | "assistant";

      if (Array.isArray(m.parts) && m.parts.length > 0) {
        const content: any[] = [];

        for (const part of m.parts) {
          if (part.type === "text" && typeof part.text === "string" && part.text) {
            content.push({ type: "text", text: part.text });
          } else if (part.type === "file" && part.url) {
            // Forward image attachment as-is (data URL or remote URL)
            content.push({
              type: "image",
              image: part.url,
              ...(part.mediaType ? { mimeType: part.mediaType } : {}),
            });
          }
        }

        if (content.length === 0) continue;

        modelMessages.push({
          role,
          content:
            content.length === 1 && content[0].type === "text"
              ? content[0].text
              : content,
        });
      } else if (typeof m.content === "string" && m.content) {
        modelMessages.push({ role, content: m.content });
      }
    }

    // Last-resort fallback
    if (modelMessages.length === 0) {
      try {
        const converted = convertToModelMessages(messages);
        if (Array.isArray(converted)) modelMessages.push(...converted);
      } catch {
        // ignore
      }
    }

    // Inject pre-encoded image attachments sent directly from the client.
    // Guarantees the model receives real base64 data URLs even when the SDK
    // stored ephemeral blob:// URLs in the message parts.
    if (Array.isArray(attachments) && attachments.length > 0 && modelMessages.length > 0) {
      const lastMsg = modelMessages[modelMessages.length - 1];
      if (lastMsg.role === "user") {
        const existingParts: any[] =
          typeof lastMsg.content === "string"
            ? [{ type: "text", text: lastMsg.content }]
            : [...(lastMsg.content as any[])];

        for (const att of attachments as { url: string; mediaType: string }[]) {
          const alreadyHas = existingParts.some(
            (p) => p.type === "image" && p.image === att.url
          );
          if (!alreadyHas && att.url) {
            existingParts.push({
              type: "image",
              image: att.url,
              ...(att.mediaType ? { mimeType: att.mediaType } : {}),
            });
          }
        }
        lastMsg.content = existingParts;
      }
    }

    const result = streamText({
      model: "openai/gpt-4o" as any,
      messages: [
        {
          role: "system",
          content: `You are Planova AI, an expert luxury travel assistant. Your mission is to help users plan trips, discover destinations, and curate detailed itineraries.

## STRICT SCOPE
- Only answer questions about travel, destinations, flights, hotels, itineraries, local culture, budgets, and travel tips.
- You may analyse images, but ONLY if they contain travel-related content (destinations, landmarks, maps, accommodation, food at a destination, etc.).
- If asked about anything unrelated to travel, politely decline and redirect to travel planning.

## COMPLETENESS — THIS IS YOUR MOST IMPORTANT RULE
- **Always give the full answer in one response.** Never stop halfway through an itinerary.
- **Never truncate.** If a trip is 5 days, write all 5 days with full detail.
- **Never ask "Shall I continue?"** Just continue — assume the user always wants the complete answer.

## HOW TO STRUCTURE ITINERARIES
- Number every day (Day 1, Day 2…) and structure each day with Morning, Afternoon, and Evening.
- For each activity: **what it is**, **why it's worth it**, and **estimated time & cost**.
- Include transport tips between locations.

## ITINERARY FORMAT
1. **Overview** — brief summary of the trip vibe and highlights.
2. **Accommodation** — suggested areas or hotel tiers with why they're ideal.
3. **Daily Plan** — structured days (see above).
4. **Budget Estimate** — breakdown by category (accommodation, food, transport, activities).
5. **Pro Tips** — local etiquette, best time to visit, transport tips, packing advice.

## PERSONALITY & FORMATTING
- Warm, enthusiastic, and sophisticated — like a high-end luxury travel concierge.
- Use clean markdown: headers (##), bold for key terms, numbered lists for days, bullet lists for tips.
- Write for readability — use whitespace between sections, keep paragraphs focused.
- Do not pad with filler phrases. Every sentence should add value.`,
        },
        ...modelMessages,
      ],
      timeout: { totalMs: 90_000 },
      onFinish: async (response) => {
        await Message.create({
          userId: session.user.id,
          sessionId,
          role: "assistant",
          content: response.text,
        });
      },
      onError: (error) => {
        console.error("Stream error:", error);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
