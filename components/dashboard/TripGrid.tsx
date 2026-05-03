import Link from "next/link";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Plane, Calendar, Wallet, ArrowRight } from "lucide-react";

const DESTINATION_GRADIENTS = [
  "from-teal-500 to-cyan-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-green-600",
];

const STATUS_VARIANT = {
  planning:  "warning",
  confirmed: "success",
  completed: "info",
} as const;

const TripCard = ({ trip, index }: { trip: any; index: number }) => {
  const gradient = DESTINATION_GRADIENTS[index % DESTINATION_GRADIENTS.length];
  const initials = trip.destination.substring(0, 2).toUpperCase();
  const statusVariant = STATUS_VARIANT[trip.status as keyof typeof STATUS_VARIANT] ?? "default";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
        {/* Color header */}
        <div className={`h-36 bg-gradient-to-br ${gradient} relative flex items-center justify-center overflow-hidden`}>
          <span className="text-7xl font-black text-white/20 select-none group-hover:scale-110 transition-transform duration-500">
            {initials}
          </span>
          <div className="absolute top-3 right-3">
            <Badge variant={statusVariant} dot>
              {trip.status}
            </Badge>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-xs font-semibold">
            <Plane className="w-3.5 h-3.5" />
            {trip.destination}
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-base font-bold text-primary mb-3 line-clamp-1">
            {trip.title}
          </h3>

          <div className="flex justify-between items-center text-sm mb-4">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {new Date(trip.startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5 font-bold text-primary">
              <Wallet className="w-3.5 h-3.5 text-accent" />
              ${trip.budget?.toLocaleString()}
            </span>
          </div>

          <Link
            href={`/trips/${trip._id}`}
            className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 border-2 border-slate-100 rounded-xl text-sm font-semibold text-slate-600 hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const TripGrid = ({ trips }: { trips: any[] }) => {
  if (!trips || trips.length === 0) {
    return (
      <EmptyState
        icon={Plane}
        title="No trips yet"
        description="Start your journey by planning a new trip with our AI assistant."
        actionLabel="Plan New Trip"
        actionHref="/chat"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {trips.map((trip, i) => (
        <TripCard key={trip._id} trip={trip} index={i} />
      ))}
    </div>
  );
};

export default TripGrid;
