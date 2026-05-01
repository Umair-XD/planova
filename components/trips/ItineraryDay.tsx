"use client";

import { useState } from "react";
import { ChevronDown, Clock, Coffee, Home } from "lucide-react";

const ItineraryDay = ({ day }: { day: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold">
            {day.day}
          </div>
          <div className="text-left">
            <h4 className="font-bold text-primary">{day.title}</h4>
            <p className="text-xs text-slate-400">
              {new Date(day.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-slate-50 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            {day.activities.map((act: any, i: number) => (
              <div
                key={i}
                className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-slate-100 last:before:hidden"
              >
                <div className="absolute left-0 top-1 w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-accent flex items-center gap-1 mb-1">
                      <Clock className="w-3 h-3" /> {act.time}
                    </p>
                    <p className="text-slate-700">{act.description}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    ${act.cost}
                  </span>
                </div>
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Home className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Accommodation
                  </p>
                  <p className="text-sm font-semibold">
                    {day.accommodation || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                <Coffee className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Meals
                  </p>
                  <p className="text-sm font-semibold">
                    {day.meals?.join(", ") || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryDay;
