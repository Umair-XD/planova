import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Plane, Calendar, Wallet } from "lucide-react";

const TripCard = ({ trip }: { trip: any }) => {
  const initials = trip.destination.substring(0, 2).toUpperCase();
  const statusColors = {
    planning: "warning" as const,
    confirmed: "success" as const,
    completed: "info" as const,
  };

  return (
    <Card className="flex flex-col h-full">
      <div className="h-40 bg-gradient-to-br from-primary to-accent relative flex items-center justify-center text-white/20 overflow-hidden">
        <span className="text-8xl font-bold select-none">{initials}</span>
        <div className="absolute top-4 right-4">
          <Badge
            variant={statusColors[trip.status as keyof typeof statusColors]}
          >
            {trip.status}
          </Badge>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">
          {trip.title}
        </h3>
        <p className="text-slate-500 text-sm mb-4 flex items-center gap-2">
          <Plane className="w-4 h-4" /> {trip.destination}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-4 h-4" />
              {new Date(trip.startDate).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5 font-semibold text-primary">
              <Wallet className="w-4 h-4" /> ${trip.budget}
            </span>
          </div>
          <Link href={`/trips/${trip._id}`} className="block w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </div>
  );
};

export default TripGrid;
