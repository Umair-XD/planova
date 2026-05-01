"use client";

import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

// Helper: extract text from ai v6 UIMessage (parts-based) or v4 (content-based)
function getTextContent(message: any): string {
  if (typeof message.content === "string" && message.content) {
    return message.content;
  }
  if (Array.isArray(message.parts)) {
    return message.parts
      .filter((p: any) => p.type === "text")
      .map((p: any) => p.text)
      .join("");
  }
  return "";
}

const ChatWindow = ({
  messages,
  isLoading,
}: {
  messages: any[];
  isLoading: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className="flex-grow overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
    >
      {messages.map((m: any, i: number) => {
        const textContent = getTextContent(m);
        if (!textContent && m.role === "assistant" && isLoading) {
          // Still streaming, show nothing yet for this message
          return null;
        }
        return (
          <ChatMessage key={m.id || i} role={m.role} content={textContent} />
        );
      })}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatWindow;
