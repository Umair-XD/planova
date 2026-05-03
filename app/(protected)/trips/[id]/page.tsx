"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import TripDetailCard from "@/components/trips/TripDetailCard";
import ItineraryDay from "@/components/trips/ItineraryDay";
import TabBar from "@/components/ui/TabBar";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { toast } from "react-hot-toast";
import { Trash2, Edit2, Share2, Info, List, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const TABS = [
  { key: "Itinerary",        label: "Itinerary",        icon: <List className="w-4 h-4" /> },
  { key: "Budget Breakdown", label: "Budget",            icon: <DollarSign className="w-4 h-4" /> },
  { key: "Trip Info",        label: "Trip Info",         icon: <Info className="w-4 h-4" /> },
];

function TripDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <Skeleton className="h-5 w-32" />
      <div className="bg-white rounded-3xl p-8 border border-slate-100 space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-5 w-1/4" />
        <div className="grid grid-cols-4 gap-6 pt-6">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 rounded-xl" />)}
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16 rounded-2xl" />)}
      </div>
    </div>
  );
}

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      } catch {
        toast.error("Failed to load trip");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrip();
  }, [id, router]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/trips/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Trip deleted");
        router.push("/trips");
      } else {
        toast.error("Failed to delete trip");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) return <TripDetailSkeleton />;
  if (!trip) return null;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/trips"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-accent transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Trips
          </Link>

          <div className="flex gap-2">
            <div className="group relative">
              <button
                disabled
                className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 cursor-not-allowed"
                title="Coming soon"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </span>
            </div>
            <div className="group relative">
              <button
                disabled
                className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-300 cursor-not-allowed"
                title="Coming soon"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </span>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2.5 bg-red-50 border border-red-100 rounded-xl text-red-500 hover:bg-red-100 transition-colors"
              title="Delete trip"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <TripDetailCard trip={trip} />

        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          className="mb-8"
        />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="max-w-4xl"
        >
          {activeTab === "Itinerary" && (
            <div>
              {trip.itinerary?.length > 0 ? (
                trip.itinerary.map((day: any) => (
                  <ItineraryDay key={day.day} day={day} />
                ))
              ) : (
                <p className="text-slate-400 italic py-8 text-center">
                  No itinerary details available for this trip.
                </p>
              )}
            </div>
          )}

          {activeTab === "Budget Breakdown" && (
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {["Day", "Activity / Title", "Est. Cost"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider ${
                          i === 2 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {trip.itinerary?.map((day: any) => (
                    <tr key={day.day} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-bold text-primary whitespace-nowrap">
                        Day {day.day}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{day.title}</td>
                      <td className="px-6 py-4 text-sm font-bold text-primary text-right">
                        ${day.estimatedCost?.toLocaleString() ?? 0}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-accent/5 font-bold border-t-2 border-accent/20">
                    <td colSpan={2} className="px-6 py-5 text-primary text-sm">
                      Total Estimated Cost
                    </td>
                    <td className="px-6 py-5 text-xl text-accent text-right">
                      ${(trip.totalEstimatedCost || trip.budget)?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "Trip Info" && (
            <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { label: "Destination", value: trip.destination },
                  { label: "Duration", value: `${trip.duration} days` },
                  { label: "Currency", value: trip.currency || "USD" },
                  {
                    label: "Status",
                    value: (
                      <Badge
                        variant={
                          trip.status === "confirmed"
                            ? "success"
                            : trip.status === "completed"
                            ? "info"
                            : "warning"
                        }
                        dot
                      >
                        {trip.status}
                      </Badge>
                    ),
                  },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5">
                      {label}
                    </p>
                    <div className="text-slate-700 font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              {trip.tags?.length > 0 && (
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">
                    Tags
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trip.tags.map((tag: string) => (
                      <Badge key={tag} variant="accent">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2">
                  Notes
                </p>
                <p className="text-slate-600 leading-relaxed text-sm italic">
                  {trip.notes || "No additional notes for this trip."}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete this trip?"
        description={`"${trip.title}" will be permanently deleted. This cannot be undone.`}
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}
