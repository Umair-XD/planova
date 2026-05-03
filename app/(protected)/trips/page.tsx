"use client";

import { useState, useEffect, useMemo } from "react";
import TripList from "@/components/trips/TripList";
import PageHeader from "@/components/ui/PageHeader";
import TabBar from "@/components/ui/TabBar";
import EmptyState from "@/components/ui/EmptyState";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { TripRowSkeleton } from "@/components/ui/Skeleton";
import { Plane, Plus, Search } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const STATUS_TABS = ["All", "Planning", "Confirmed", "Completed"];

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const res = await fetch("/api/trips");
      const data = await res.json();
      if (data.data) setTrips(data.data);
    } catch {
      toast.error("Failed to load trips");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchTrips(); }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/trips/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Trip deleted");
        setTrips((prev) => prev.filter((t: any) => t._id !== id));
      } else {
        toast.error("Failed to delete trip");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  /* Tab counts */
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { All: trips.length };
    STATUS_TABS.slice(1).forEach((s) => {
      counts[s] = trips.filter((t) => t.status.toLowerCase() === s.toLowerCase()).length;
    });
    return counts;
  }, [trips]);

  /* Filtered + searched */
  const filteredTrips = useMemo(() => {
    let list = trips;
    if (filter !== "All") list = list.filter((t) => t.status.toLowerCase() === filter.toLowerCase());
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.destination?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [trips, filter, search]);

  const tabs = STATUS_TABS.map((s) => ({ key: s, label: s, count: tabCounts[s] ?? 0 }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageHeader
        title="My Trips"
        subtitle="Manage and view all your planned adventures."
        action={
          <Link href="/chat">
            <Button leftIcon={<Plus className="w-4 h-4" />}>New Trip</Button>
          </Link>
        }
      />

      {/* Search + filter row */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search trips or destinations…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <TabBar
        tabs={tabs}
        activeTab={filter}
        onTabChange={setFilter}
        variant="pills"
        className="mb-8"
      />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <TripRowSkeleton key={i} />)}
        </div>
      ) : filteredTrips.length === 0 ? (
        <EmptyState
          icon={Plane}
          title={
            search
              ? `No trips matching "${search}"`
              : filter === "All"
              ? "No trips found"
              : `No ${filter.toLowerCase()} trips`
          }
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
