import Link from "next/link";
import { MessageSquare, ArrowRight, Bot } from "lucide-react";
import Button from "@/components/ui/Button";

const RecentChats = ({ chats }: { chats: any[] }) => {
  // Deduplicate by sessionId, keep only the latest per session
  const uniqueChats = chats.reduce<Record<string, any>>((acc, chat) => {
    if (!acc[chat.sessionId] || new Date(chat.createdAt) > new Date(acc[chat.sessionId].createdAt)) {
      acc[chat.sessionId] = chat;
    }
    return acc;
  }, {});

  const sessions = Object.values(uniqueChats).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
        <h3 className="font-bold text-primary flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-accent" />
          Recent Chats
        </h3>
        <Link
          href="/chat"
          className="text-xs font-semibold text-accent hover:underline underline-offset-2"
        >
          New chat
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="px-6 py-10 text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Bot className="w-6 h-6 text-accent" />
          </div>
          <p className="text-sm text-slate-500 font-medium">No chats yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Start planning your next trip with AI
          </p>
          <Link href="/chat">
            <Button size="sm">Start a Chat</Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {sessions.map((chat) => (
            <div
              key={chat.sessionId}
              className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors group"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-accent" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm text-slate-700 truncate font-medium">
                    {chat.content.length > 60
                      ? chat.content.substring(0, 60) + "…"
                      : chat.content}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(chat.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <Link
                href={`/chat?session=${chat.sessionId}`}
                className="flex items-center gap-1 text-xs font-bold text-accent shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentChats;
