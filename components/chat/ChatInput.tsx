"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatInput = ({
  onSend,
  disabled,
}: {
  onSend: (msg: string) => void;
  disabled: boolean;
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  return (
    <div className="p-4 border-t border-slate-100 bg-white">
      <div className="max-w-4xl mx-auto relative">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask anything about your next trip..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none transition-all"
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-medium">
            {input.length} / 1000
          </span>
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="p-2 bg-accent text-white rounded-lg disabled:opacity-50 disabled:bg-slate-300 transition-all shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
