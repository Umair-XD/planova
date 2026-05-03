import ReactMarkdown from "react-markdown";
import { User, Bot } from "lucide-react";

const ChatMessage = ({
  role,
  content,
  timestamp,
}: {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3 group`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-sm ${
          isUser ? "bg-primary text-white" : "bg-accent text-white"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble */}
      <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[72%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-primary text-white rounded-tr-sm"
              : "bg-white shadow-sm border border-slate-100 text-slate-800 rounded-tl-sm"
          }`}
        >
          {isUser ? (
            <p>{content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-slate prose-p:my-1 prose-li:my-0.5 prose-headings:mt-3 prose-headings:mb-1">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
        {timestamp && (
          <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity px-1">
            {new Date(timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
