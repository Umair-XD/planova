"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import TripDetailCard from "@/components/trips/TripDetailCard";
import ItineraryDay from "@/components/trips/ItineraryDay";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Share2, Info, List, DollarSign } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [trip, setTrip] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("Itinerary");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`/api/trips/${id}`);
        const data = await res.json();
        if (data.data) {
          setTrip(data.data);
        } else {
          toast.error("Trip not found");
          router.push("/trips");
        }
      } catch (error) {
        toast.error("Failed to load trip");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [id, router]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    try {
      const res = await fetch(`/api/trips/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Trip deleted");
        router.push("/trips");
      }
    } catch (error) {
      toast.error("Failed to delete trip");
    }
  };

  if (isLoading)
    return <div className="p-12 text-center">Loading trip details...</div>;
  if (!trip) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="text-slate-500 hover:text-primary font-medium flex items-center gap-2"
        >
          ← Back to Trips
        </button>
        <div className="flex gap-3">
          <div className="group relative">
            <button
              disabled
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              Coming Soon
            </span>
          </div>
          <div className="group relative">
            <button
              disabled
              className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 cursor-not-allowed"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              Coming Soon
            </span>
          </div>
          <button
            onClick={handleDelete}
            className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <TripDetailCard trip={trip} />

      <div className="flex gap-8 border-b border-slate-100 mb-8 overflow-x-auto">
        {[
          { name: "Itinerary", icon: <List className="w-4 h-4" /> },
          { name: "Budget Breakdown", icon: <DollarSign className="w-4 h-4" /> },
          { name: "Trip Info", icon: <Info className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${
              activeTab === tab.name
                ? "text-primary"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.icon} {tab.name}
            {activeTab === tab.name && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="max-w-4xl">
        {activeTab === "Itinerary" && (
          <div className="animate-in fade-in duration-500">
            {trip.itinerary?.length > 0 ? (
              trip.itinerary.map((day: any) => (
                <ItineraryDay key={day.day} day={day} />
              ))
            ) : (
              <p className="text-slate-500 italic">
                No itinerary details available.
              </p>
            )}
          </div>
        )}

        {activeTab === "Budget Breakdown" && (
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden animate-in fade-in duration-500">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Activity/Title
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                    Est. Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {trip.itinerary?.map((day: any) => (
                  <tr key={day.day}>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      Day {day.day}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {day.title}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary text-right">
                      ${day.estimatedCost}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={2} className="px-6 py-6 text-primary">
                    Total Estimated Cost
                  </td>
                  <td className="px-6 py-6 text-2xl text-accent text-right">
                    ${trip.totalEstimatedCost || trip.budget}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Trip Info" && (
          <div className="bg-white p-8 rounded-3xl border border-slate-100 animate-in fade-in duration-500">
            <h3 className="text-xl font-bold text-primary mb-6">
              General Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                    Destination
                  </p>
                  <p className="text-slate-700 font-medium">
                    {trip.destination}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                    Duration
                  </p>
                  <p className="text-slate-700 font-medium">
                    {trip.duration} days
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {trip.tags?.map((tag: string) => (
                    <Badge key={tag} className="bg-accent/10 text-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold mb-2">
                  Notes
                </p>
                <p className="text-slate-600 leading-relaxed italic">
                  {trip.notes || "No extra notes for this trip."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
