"use client";

import { useState } from "react";
import { Trip } from "@/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { Plane, Trash2, Calendar, Wallet, Clock } from "lucide-react";
import { motion } from "framer-motion";

const STATUS_VARIANT = {
  planning:  "warning",
  confirmed: "success",
  completed: "info",
} as const;

const TripList = ({
  trips,
  onDelete,
}: {
  trips: Trip[];
  onDelete: (id: string) => void;
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    await onDelete(deleteId);
    setIsDeleting(false);
    setDeleteId(null);
  };

  return (
    <>
      <div className="space-y-4">
        {trips.map((trip, i) => {
          const statusVariant =
            STATUS_VARIANT[trip.status as keyof typeof STATUS_VARIANT] ?? "default";

          return (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: icon + info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                      <Plane className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-primary leading-tight">
                        {trip.title}
                      </h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                        {trip.destination}
                        {trip.duration ? (
                          <>
                            <span className="text-slate-300">•</span>
                            <Clock className="w-3.5 h-3.5" />
                            {trip.duration}d
                          </>
                        ) : null}
                      </p>
                    </div>
                  </div>

                  {/* Right: meta + actions */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                    <div className="hidden md:block text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                        Dates
                      </p>
                      <p className="text-sm font-semibold text-primary flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-300" />
                        {new Date(trip.startDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                        {" – "}
                        {new Date(trip.endDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="hidden sm:block text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                        Budget
                      </p>
                      <p className="text-sm font-bold text-primary flex items-center gap-1">
                        <Wallet className="w-3.5 h-3.5 text-accent" />
                        ${trip.budget?.toLocaleString()}
                      </p>
                    </div>

                    <Badge variant={statusVariant} dot>
                      {trip.status}
                    </Badge>

                    <div className="flex items-center gap-2">
                      <Link href={`/trips/${trip._id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                      <button
                        onClick={() => setDeleteId(trip._id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Trip"
        description="This action is permanent and cannot be undone. All itinerary data will be lost."
        confirmLabel="Delete Trip"
        cancelLabel="Keep It"
        onConfirm={handleConfirmDelete}
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
};

export default TripList;
