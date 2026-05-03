"use client";

import { Map, Globe, Calendar, Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
  delay?: number;
}

const StatCard = ({ icon, value, label, color, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-primary leading-tight">{value}</p>
      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
        {label}
      </p>
    </div>
  </motion.div>
);

const StatsBar = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
      <StatCard
        icon={<Map className="w-5 h-5 text-accent" />}
        value={stats.totalTrips || 0}
        label="Total Trips"
        color="bg-accent/10"
        delay={0}
      />
      <StatCard
        icon={<Globe className="w-5 h-5 text-blue-500" />}
        value={stats.countries || 0}
        label="Countries"
        color="bg-blue-50"
        delay={0.05}
      />
      <StatCard
        icon={<Calendar className="w-5 h-5 text-violet-500" />}
        value={stats.totalDays || 0}
        label="Days Traveled"
        color="bg-violet-50"
        delay={0.1}
      />
      <StatCard
        icon={<Wallet className="w-5 h-5 text-amber-500" />}
        value={`$${(stats.totalBudget || 0).toLocaleString()}`}
        label="Total Budget"
        color="bg-amber-50"
        delay={0.15}
      />
    </div>
  );
};

export default StatsBar;
