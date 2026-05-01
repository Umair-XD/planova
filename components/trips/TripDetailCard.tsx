import Badge from "@/components/ui/Badge";
import { Calendar, Wallet, MapPin, Clock } from "lucide-react";

const TripDetailCard = ({ trip }: { trip: any }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge
              variant={trip.status === "confirmed" ? "success" : "warning"}
            >
              {trip.status}
            </Badge>
            <div className="flex gap-2">
              {trip.tags?.map((tag: string) => (
                <Badge key={tag} className="bg-slate-50">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <h1 className="text-4xl font-heading font-bold text-primary">
            {trip.title}
          </h1>
          <p className="text-slate-500 flex items-center gap-2 mt-2">
            <MapPin className="w-5 h-5 text-accent" /> {trip.destination}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-slate-400 uppercase font-bold tracking-widest mb-1">
            Total Budget
          </p>
          <p className="text-4xl font-bold text-primary">
            ${trip.budget?.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-50">
        <div>
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">
            Start Date
          </p>
          <p className="font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-300" />{" "}
            {new Date(trip.startDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">
            End Date
          </p>
          <p className="font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-300" />{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">
            Duration
          </p>
          <p className="font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-300" /> {trip.duration} Days
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 uppercase font-bold mb-1">
            Currency
          </p>
          <p className="font-semibold flex items-center gap-2">
            <Wallet className="w-4 h-4 text-slate-300" /> {trip.currency || "USD"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripDetailCard;
