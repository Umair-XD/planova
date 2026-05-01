import Link from "next/link";
import Card from "@/components/ui/Card";
import { MessageSquare, ArrowRight } from "lucide-react";

const RecentChats = ({ chats }: { chats: any[] }) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-accent" /> Recent Planning Chats
      </h3>

      {chats.length === 0 ? (
        <p className="text-slate-500 text-sm italic py-4">
          No recent chats. Start a new conversation to plan your next trip!
        </p>
      ) : (
        <div className="divide-y divide-slate-50">
          {chats.map((chat) => (
            <div
              key={chat.sessionId}
              className="py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-accent/10 rounded-full">
                  <span className="text-xs font-bold text-accent">AI</span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm text-slate-700 truncate max-w-[200px] md:max-w-[400px]">
                    {chat.content}
                  </p>
                  <p className="text-xs text-slate-400">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Link
                href={`/chat?session=${chat.sessionId}`}
                className="flex items-center gap-1 text-xs font-bold text-accent hover:underline shrink-0"
              >
                Continue <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentChats;
