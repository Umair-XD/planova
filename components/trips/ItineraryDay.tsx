"use client";

import { useState } from "react";
import { ChevronDown, Clock, Coffee, Home, DollarSign } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ItineraryDay = ({ day }: { day: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white mb-3 shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center text-sm font-bold shrink-0">
            {day.day}
          </div>
          <div className="text-left">
            <h4 className="font-bold text-primary text-sm">{day.title}</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {day.date
                ? new Date(day.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })
                : ""}
              {day.estimatedCost
                ? ` · $${day.estimatedCost.toLocaleString()} est.`
                : ""}
            </p>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-50">
              {/* Activities timeline */}
              {day.activities?.length > 0 ? (
                <div className="space-y-5 mt-3">
                  {day.activities.map((act: any, i: number) => (
                    <div
                      key={i}
                      className="relative pl-9 before:absolute before:left-[13px] before:top-5 before:bottom-[-20px] before:w-[2px] before:bg-slate-100 last:before:hidden"
                    >
                      <div className="absolute left-0 top-0.5 w-7 h-7 bg-accent/10 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                      </div>
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="text-xs font-bold text-accent flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" /> {act.time}
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {act.description}
                          </p>
                        </div>
                        {act.cost > 0 && (
                          <span className="shrink-0 text-xs font-bold text-slate-500 flex items-center gap-0.5">
                            <DollarSign className="w-3 h-3" />{act.cost}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic mt-3">
                  No activities listed for this day.
                </p>
              )}

              {/* Accommodation & meals */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Home className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                      Accommodation
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {day.accommodation || "Not specified"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <Coffee className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                      Meals
                    </p>
                    <p className="text-sm font-semibold text-primary">
                      {day.meals?.join(", ") || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItineraryDay;
