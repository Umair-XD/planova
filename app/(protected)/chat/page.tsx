"use client";

import {
  useRef,
  useEffect,
  useState,
  useMemo,
  memo,
  useCallback,
  Suspense,
  type FormEvent,
} from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import ChatInput from "@/components/chat/ChatInput";
import {
  Compass,
  AlertCircle,
  Sparkles,
  User,
  Copy,
  Check,
  RotateCcw,
  ArrowDown,
  MapPin,
  Plane,
  Wallet,
  Bot,
} from "lucide-react";
import { toast } from "react-hot-toast";

/* ─── helpers ──────────────────────────────────────────── */

function getTextContent(message: UIMessage): string {
  if (typeof (message as any).content === "string") return (message as any).content;
  if (Array.isArray((message as any).parts)) {
    return (message as any).parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("");
  }
  return "";
}

/* ─── avatars ──────────────────────────────────────────── */

function AssistantAvatar() {
  return (
    <div className="shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center shadow-md shadow-accent/20 mt-0.5">
      <Bot className="h-4 w-4 text-white" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="shrink-0 h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-slate-700 flex items-center justify-center shadow-md mt-0.5">
      <User className="h-4 w-4 text-white" />
    </div>
  );
}

/* ─── typing indicator ─────────────────────────────────── */

function ThinkingIndicator() {
  return (
    <div className="flex items-end gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <AssistantAvatar />
      <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="h-2 w-2 rounded-full bg-accent/60 animate-bounce"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── single message ───────────────────────────────────── */

const ChatMessage = memo(
  ({
    message,
    isLast,
    isStreaming,
    isLoading,
    onCopy,
    copiedId,
    onRegenerate,
  }: {
    message: UIMessage;
    isLast: boolean;
    isStreaming: boolean;
    isLoading: boolean;
    onCopy: (text: string, id: string) => void;
    copiedId: string | null;
    onRegenerate: () => void;
  }) => {
    const isUser = message.role === "user";
    const parts: any[] = Array.isArray((message as any).parts)
      ? (message as any).parts
      : [{ type: "text", text: getTextContent(message) }];

    return (
      <div
        className={`flex items-start gap-3 md:gap-4 group/msg animate-in fade-in slide-in-from-bottom-3 duration-400 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {isUser ? <UserAvatar /> : <AssistantAvatar />}

        <div
          className={`relative flex flex-col gap-1.5 max-w-[82%] md:max-w-[72%] ${
            isUser ? "items-end" : "items-start"
          }`}
        >
          <div
            className={`px-4 py-3 text-sm leading-relaxed break-words ${
              isUser
                ? "bg-primary text-white font-medium rounded-2xl rounded-br-sm shadow-md"
                : "bg-white border border-slate-100 rounded-2xl rounded-bl-sm shadow-sm text-slate-800"
            }`}
          >
            {isUser ? (
              <div className="whitespace-pre-wrap">
                {parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i}>{part.text}</span>
                  ) : part.type === "file" ? (
                    <div key={i} className="mt-2 rounded-xl overflow-hidden border border-white/20">
                      <img
                        src={part.url}
                        alt="Attached image"
                        className="max-h-64 w-auto object-contain"
                      />
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none prose-slate prose-p:my-1.5 prose-p:leading-relaxed prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-4 prose-headings:mb-1.5 prose-h2:text-base prose-h3:text-sm prose-ul:my-2 prose-ul:pl-4 prose-li:my-0.5 prose-ol:my-2 prose-ol:pl-4 prose-strong:font-semibold prose-strong:text-slate-900 prose-code:text-accent prose-code:bg-accent/8 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:before:content-none prose-code:after:content-none prose-pre:bg-slate-900 prose-pre:rounded-xl prose-blockquote:border-l-accent/40 prose-blockquote:text-slate-500 prose-hr:border-slate-100">
                {parts.map((part, i) =>
                  part.type === "text" ? (
                    <ReactMarkdown key={i}>{part.text}</ReactMarkdown>
                  ) : part.type === "file" ? (
                    <div key={i} className="not-prose mt-2 rounded-xl overflow-hidden border border-slate-100">
                      <img
                        src={part.url}
                        alt="Image"
                        className="max-h-[60dvh] w-auto object-contain"
                      />
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Message actions */}
          {!isUser && (
            <div className="flex items-center gap-0.5 px-1 opacity-0 group-hover/msg:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onCopy(getTextContent(message), message.id)}
                className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                title="Copy"
              >
                {copiedId === message.id ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                )}
              </button>
              {isLast && !isStreaming && !isLoading && (
                <button
                  onClick={onRegenerate}
                  className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
                  title="Regenerate"
                >
                  <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

/* ─── prompt cards ─────────────────────────────────────── */

const PROMPT_CARDS = [
  { icon: Sparkles, text: "Plan a 7-day trip to Japan under $2,000", sub: "ITINERARY" },
  { icon: Wallet,   text: "Best budget destinations in Southeast Asia", sub: "BUDGET" },
  { icon: MapPin,   text: "Create a 3-day itinerary for Paris",          sub: "GUIDE" },
  { icon: Plane,    text: "What travel documents do I need for Morocco?", sub: "TIPS" },
];

/* ─── main page ────────────────────────────────────────── */

function ChatContent() {
  const searchParams = useSearchParams();
  const existingSessionId = searchParams.get("session");
  const [sessionId] = useState(existingSessionId || `session_${Date.now()}`);

  // Lock document scroll — the fixed chat panel owns the full viewport
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const [localInput, setLocalInput] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isAtBottom = useRef(true);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { sessionId } }),
    [sessionId]
  );

  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport,
    messages: [] as UIMessage[],
  });

  const isStreaming = status === "streaming";
  const isLoading  = status === "submitted";

  /* ── send handler ──────────────────────────────── */
  const handleSend = useCallback(
    async (text: string, files?: FileList) => {
      if (!text.trim() && (!files || files.length === 0)) return;
      isAtBottom.current = true;

      let attachments: { url: string; mediaType: string }[] | undefined;
      if (files && files.length > 0) {
        attachments = await Promise.all(
          Array.from(files).map(
            (file) =>
              new Promise<{ url: string; mediaType: string }>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () =>
                  resolve({ url: reader.result as string, mediaType: file.type });
                reader.onerror = reject;
                reader.readAsDataURL(file);
              })
          )
        );
      }

      sendMessage(
        { text, files },
        {
          body: {
            sessionId,
            ...(attachments && attachments.length > 0 ? { attachments } : {}),
          },
        }
      );
      setLocalInput("");
    },
    [sendMessage, sessionId]
  );

  const handleFormSubmit = useCallback(
    (e: FormEvent, files?: FileList) => {
      e.preventDefault();
      handleSend(localInput, files);
    },
    [handleSend, localInput]
  );

  /* ── scroll management ─────────────────────────── */
  const scrollToBottom = useCallback(() => {
    isAtBottom.current = true;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    if (isStreaming || isLoading) isAtBottom.current = true;
    if (isAtBottom.current) {
      const id = requestAnimationFrame(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: isStreaming ? "instant" : "smooth",
          block: "end",
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [messages, isStreaming, isLoading]);

  useEffect(() => {
    if (messages.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 80;
      isAtBottom.current = nearBottom;
      setShowScrollButton(!nearBottom);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [messages.length]);

  /* ── copy ──────────────────────────────────────── */
  const handleCopy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  /* ─────────────────────────────────────────────── */
  return (
    <div className="fixed inset-x-0 bottom-0 top-16 flex flex-col bg-slate-50/50 overflow-hidden">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.07),transparent)]" />

      <div className="flex-1 overflow-hidden relative">
        {/* ── Empty state ─────────────────────────── */}
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-500">
            {/* Icon */}
            <div className="relative mb-5">
              <div className="absolute inset-0 bg-accent/10 blur-2xl rounded-full scale-[2] opacity-50" />
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center shadow-xl shadow-accent/20">
                <Compass className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-primary mb-2">
              Where to next?
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-md mb-8 font-medium">
              Your AI travel concierge — itineraries, budgets, and hidden gems anywhere on Earth.
            </p>

            {/* Prompt cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full max-w-lg text-left mb-8">
              {PROMPT_CARDS.map((card) => (
                <button
                  key={card.text}
                  onClick={() => handleSend(card.text)}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white/70 hover:bg-white hover:border-accent/30 hover:shadow-sm transition-all text-left focus:outline-none"
                >
                  <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-accent/8 flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                    <card.icon className="h-4 w-4 text-accent/70 group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 leading-snug transition-colors">
                      {card.text}
                    </p>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-0.5 block">
                      {card.sub}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ── Messages list ──────────────────────── */
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto no-scrollbar"
          >
            <div className="mx-auto max-w-3xl px-4 py-6 space-y-5 pb-4">
              {messages.map((message, i) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLast={i === messages.length - 1}
                  isStreaming={isStreaming}
                  isLoading={isLoading}
                  onCopy={handleCopy}
                  copiedId={copiedId}
                  onRegenerate={() => regenerate({ body: { sessionId } })}
                />
              ))}

              {isLoading && <ThinkingIndicator />}

              {error && (
                <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span className="flex-1 font-medium">
                    {error.message || "Something went wrong. Please try again."}
                  </span>
                  <button
                    onClick={() => regenerate({ body: { sessionId } })}
                    className="text-xs font-bold border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>
        )}
      </div>

      {/* Scroll-to-bottom button */}
      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 right-6 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-lg flex items-center justify-center text-accent hover:bg-white transition-all z-10 animate-in fade-in zoom-in duration-200"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}

      {/* Input bar */}
      <div className="relative z-10 border-t border-slate-100 bg-white/70 backdrop-blur-xl pt-2">
        <ChatInput
          input={localInput}
          onInputChange={setLocalInput}
          onSubmit={handleFormSubmit}
          isStreaming={isStreaming || isLoading}
          onStop={() => stop()}
        />
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-[calc(100dvh-64px)] bg-slate-50">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-medium">Loading chat…</p>
          </div>
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
