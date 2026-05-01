import Link from "next/link";
import { MessageSquare, Map as MapIcon, Download } from "lucide-react";
import Badge from "@/components/ui/Badge";

const QuickActions = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Link href="/chat" className="group">
        <div className="bg-accent text-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-lg font-bold">Plan New Trip with AI</span>
          </div>
        </div>
      </Link>

      <Link href="/trips" className="group">
        <div className="bg-white border-2 border-accent/20 text-accent p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/5 rounded-xl">
              <MapIcon className="w-6 h-6 text-accent" />
            </div>
            <span className="text-lg font-bold">View All My Trips</span>
          </div>
        </div>
      </Link>

      <div className="bg-slate-50 border-2 border-slate-100 text-slate-400 p-6 rounded-2xl cursor-not-allowed flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-xl text-slate-300">
            <Download className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold">Export as PDF</span>
        </div>
        <Badge variant="warning">Coming Soon</Badge>
      </div>
    </div>
  );
};

export default QuickActions;
