"use client";

import { useState, useEffect } from "react";
import TripList from "@/components/trips/TripList";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import { Plane, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch("/api/trips");
      const data = await res.json();
      if (data.data) {
        setTrips(data.data);
      }
    } catch (error) {
      toast.error("Failed to load trips");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/trips/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Trip deleted");
        setTrips(trips.filter((t: any) => t._id !== id));
      } else {
        toast.error("Failed to delete trip");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const filteredTrips = trips.filter((t: any) => {
    if (filter === "All") return true;
    return t.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">
            My Trips
          </h1>
          <p className="text-slate-500">
            Manage and view your planned adventures.
          </p>
        </div>
        <Link href="/chat">
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" /> New Trip
          </Button>
        </Link>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {["All", "Planning", "Confirmed", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              filter === tab
                ? "bg-primary text-white shadow-md"
                : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-white animate-pulse rounded-2xl border border-slate-100"
            />
          ))}
        </div>
      ) : filteredTrips.length === 0 ? (
        <EmptyState
          icon={Plane}
          title={filter === "All" ? "No trips found" : `No ${filter} trips`}
          description="Ready to start planning your next journey?"
          actionLabel="Start Planning with AI"
          actionHref="/chat"
        />
      ) : (
        <TripList trips={filteredTrips} onDelete={handleDelete} />
      )}
    </div>
  );
}
