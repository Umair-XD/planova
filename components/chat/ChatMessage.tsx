import ReactMarkdown from "react-markdown";
import { User, Bot } from "lucide-react";

const ChatMessage = ({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start gap-3`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
          isUser ? "bg-primary text-white" : "bg-accent text-white"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
          isUser
            ? "bg-primary text-white rounded-tr-sm"
            : "bg-white shadow-sm border border-slate-100 text-slate-800 rounded-tl-sm"
        }`}
      >
        <div className="prose prose-sm max-w-none prose-slate">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
