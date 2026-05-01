import { Map, Globe, Calendar, Wallet } from "lucide-react";
import Card from "@/components/ui/Card";

interface StatProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatCard = ({ icon, value, label }: StatProps) => (
  <Card className="p-6 flex items-center gap-4 border border-slate-50">
    <div className="p-3 bg-accent/10 rounded-xl text-accent">{icon}</div>
    <div>
      <p className="text-2xl font-bold text-primary leading-tight">{value}</p>
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
        {label}
      </p>
    </div>
  </Card>
);

const StatsBar = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard
        icon={<Map className="w-6 h-6" />}
        value={stats.totalTrips || 0}
        label="Total Trips"
      />
      <StatCard
        icon={<Globe className="w-6 h-6" />}
        value={stats.countries || 0}
        label="Countries"
      />
      <StatCard
        icon={<Calendar className="w-6 h-6" />}
        value={stats.totalDays || 0}
        label="Days Traveled"
      />
      <StatCard
        icon={<Wallet className="w-6 h-6" />}
        value={`$${stats.totalBudget?.toLocaleString() || 0}`}
        label="Budget Used"
      />
    </div>
  );
};

export default StatsBar;
