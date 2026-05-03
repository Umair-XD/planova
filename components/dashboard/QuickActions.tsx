import Link from "next/link";
import { MessageSquare, Map as MapIcon, Sparkles } from "lucide-react";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {/* Plan new trip */}
      <Link href="/chat" className="group block">
        <div className="relative overflow-hidden bg-gradient-to-br from-accent to-teal-600 text-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute -right-2 -top-6 w-16 h-16 bg-white/5 rounded-full" />
          <div className="relative flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-bold">Plan New Trip</p>
              <p className="text-xs text-teal-100 mt-0.5">Chat with AI assistant</p>
            </div>
          </div>
        </div>
      </Link>

      {/* View all trips */}
      <Link href="/trips" className="group block">
        <div className="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-accent/30 transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-accent/10 transition-colors">
              <MapIcon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </div>
            <div>
              <p className="text-lg font-bold text-primary">My Trips</p>
              <p className="text-xs text-slate-400 mt-0.5">View all adventures</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Coming soon */}
      <div className="relative bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-2xl opacity-60 cursor-not-allowed">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-xl">
            <Sparkles className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-400">Smart Insights</p>
            <p className="text-xs text-slate-300 mt-0.5">Coming soon</p>
          </div>
        </div>
        <span className="absolute top-3 right-3 text-[10px] font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wide">
          Soon
        </span>
      </div>
    </div>
  );
};

export default QuickActions;
