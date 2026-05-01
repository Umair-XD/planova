import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 text-white mt-1">
        <Bot className="w-4 h-4" />
      </div>
      <div className="bg-white shadow-sm border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center h-10">
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;
