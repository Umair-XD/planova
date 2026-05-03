import Badge from "@/components/ui/Badge";
import { Calendar, Wallet, MapPin, Clock, Globe } from "lucide-react";

const META = [
  { key: "startDate", label: "Start Date",  icon: <Calendar className="w-4 h-4 text-accent" /> },
  { key: "endDate",   label: "End Date",    icon: <Calendar className="w-4 h-4 text-accent" /> },
  { key: "duration",  label: "Duration",    icon: <Clock className="w-4 h-4 text-accent" /> },
  { key: "currency",  label: "Currency",    icon: <Globe className="w-4 h-4 text-accent" /> },
];

const STATUS_VARIANT = {
  planning:  "warning",
  confirmed: "success",
  completed: "info",
} as const;

const TripDetailCard = ({ trip }: { trip: any }) => {
  const statusVariant =
    STATUS_VARIANT[trip.status as keyof typeof STATUS_VARIANT] ?? "default";

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={statusVariant} dot>{trip.status}</Badge>
            {trip.tags?.map((tag: string) => (
              <Badge key={tag} variant="accent">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary leading-tight">
            {trip.title}
          </h1>
          <p className="text-slate-500 flex items-center gap-2 mt-2 text-sm">
            <MapPin className="w-4 h-4 text-accent shrink-0" />
            {trip.destination}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">
            Total Budget
          </p>
          <p className="text-4xl font-heading font-bold text-primary">
            <span className="text-accent text-2xl font-bold mr-1">$</span>
            {trip.budget?.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">{trip.currency || "USD"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-50">
        {META.map(({ key, label, icon }) => {
          let val: string;
          if (key === "startDate" || key === "endDate") {
            val = new Date(trip[key]).toLocaleDateString("en-US", {
              month: "short", day: "numeric", year: "numeric",
            });
          } else if (key === "duration") {
            val = `${trip.duration} days`;
          } else {
            val = trip[key] || "USD";
          }
          return (
            <div key={key} className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                {icon}
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  {label}
                </p>
              </div>
              <p className="font-semibold text-primary text-sm">{val}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripDetailCard;
