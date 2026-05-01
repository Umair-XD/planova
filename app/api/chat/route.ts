import { streamText, convertToModelMessages } from "ai";
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

    const { messages } = body;
    const sessionId = body.sessionId || body.id || `session_${Date.now()}`;

    const lastMessage = messages[messages.length - 1];

    // ai v6 UIMessages use `parts` array instead of `content` string
    const textContent =
      lastMessage.content ||
      (lastMessage.parts &&
        lastMessage.parts
          .filter((p: any) => p.type === "text")
          .map((p: any) => p.text)
          .join("")) ||
      "";

    await dbConnect();

    // Save user message
    await Message.create({
      userId: session.user.id,
      sessionId,
      role: "user",
      content: textContent,
    });

    // convertToModelMessages can fail if UIMessage shapes are non-standard, so we fallback to manual extraction.
    let modelMessages: any[] = [];
    try {
      const converted = await convertToModelMessages(messages);
      if (Array.isArray(converted) && converted.length > 0) {
        modelMessages = converted;
      } else {
        throw new Error("empty or non-array result");
      }
    } catch {
      modelMessages = messages
        .map((m: any) => {
          const text = Array.isArray(m.parts)
            ? m.parts
                .filter((p: any) => p.type === "text")
                .map((p: any) => p.text)
                .join("\n")
            : typeof m.content === "string"
            ? m.content
            : "";
          return { role: m.role as "user" | "assistant", content: text };
        })
        .filter((m: any) => m.content);
    }

    const result = streamText({
      model: "google/gemini-3-flash" as any,
      messages: [
        {
          role: "system",
          content: `You are Planova AI, an expert luxury travel assistant. Your mission is to help users plan trips, discover destinations, and curate detailed itineraries.

## STRICT SCOPE
- Only answer questions about travel, destinations, flights, hotels, itineraries, local culture, budgets, and travel tips.
- If asked about anything unrelated to travel, politely decline and redirect the conversation to travel planning.

## COMPLETENESS — THIS IS YOUR MOST IMPORTANT RULE
- **Always give the full answer in one response.** Never stop halfway through an itinerary.
- **Never truncate.** If a trip is 5 days, write all 5 days.
- **Never ask "Shall I continue?"** Just continue.

## HOW TO EXPLAIN ITINERARIES
- Number every day (Day 1, Day 2…) and structure the day with Morning, Afternoon, and Evening.
- For each activity explain: **what it is**, **why it matters**, and **estimated time/cost**.

## ITINERARY FORMAT
1. **Overview** — brief summary of the trip vibe.
2. **Accommodation** — suggested areas or specific hotel styles.
3. **Daily Plan** — structured days (see above).
4. **Budget Estimate** — approximate costs for the trip.
5. **Pro Tips** — local etiquette, transport tips, or packing advice.

## PERSONALITY & FORMATTING
- Warm, enthusiastic, and sophisticated — like a high-end luxury travel concierge.
- Use clean markdown: headers (##), bold for key terms, numbered lists for days.
- Write for readability — use whitespace between sections, keep paragraphs focused.`
        },
        ...modelMessages,
      ],
      onFinish: async (response) => {
        // Save assistant message
        await Message.create({
          userId: session.user.id,
          sessionId,
          role: "assistant",
          content: response.text,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
