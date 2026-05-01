"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useSearchParams } from "next/navigation";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import SuggestedPrompts from "@/components/chat/SuggestedPrompts";
import { useState, useMemo, Suspense } from "react";

function ChatContent() {
  const searchParams = useSearchParams();
  const existingSessionId = searchParams.get("session");
  const [sessionId] = useState(existingSessionId || `session_${Date.now()}`);

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { sessionId },
      }),
    [sessionId]
  );

  const { messages, sendMessage, status, error } = useChat({ transport });

  const isLoading = status === "submitted" || status === "streaming";

  const handleSend = async (content: string) => {
    if (!content.trim() || isLoading) return;
    await sendMessage({ text: content });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50">
      <div className="flex-grow flex flex-col max-w-5xl mx-auto w-full relative">
        {messages.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl font-heading font-bold text-primary mb-4">
                Where to next?
              </h1>
              <p className="text-slate-500 max-w-md mx-auto">
                Ask me to plan your next adventure, estimate budgets, or find
                hidden gems anywhere in the world.
              </p>
            </div>
            <SuggestedPrompts onSelect={handleSend} />
          </div>
        ) : (
          <ChatWindow messages={messages} isLoading={isLoading} />
        )}

        {error && (
          <div className="mx-4 mb-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
            <strong>Error:</strong> {error.message}
          </div>
        )}
      </div>
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading chat...
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
