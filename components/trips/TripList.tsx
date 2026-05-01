"use client";

import { Trip } from "@/types";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Plane, Trash2 } from "lucide-react";

const TripList = ({
  trips,
  onDelete,
}: {
  trips: Trip[];
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="space-y-6">
      {trips.map((trip) => (
        <Card key={trip._id} className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                <Plane className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary">{trip.title}</h3>
                <p className="text-slate-500 flex items-center gap-2">
                  {trip.destination} • {trip.duration || 0} days
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Dates
                </p>
                <p className="text-sm font-semibold text-primary">
                  {new Date(trip.startDate).toLocaleDateString()} -{" "}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                  Budget
                </p>
                <p className="text-sm font-semibold text-primary">
                  ${trip.budget}
                </p>
              </div>
              <Badge variant={trip.status === "confirmed" ? "success" : "warning"}>
                {trip.status}
              </Badge>
              <div className="flex items-center gap-2">
                <Link href={`/trips/${trip._id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
                <button
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this trip?")) {
                      onDelete(trip._id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TripList;
