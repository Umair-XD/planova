"use client";

import { motion } from "framer-motion";
import { MapPin, DollarSign, Calendar, FileQuestion } from "lucide-react";

const PROMPTS = [
  { text: "Plan a 7-day trip to Japan under $2,000", icon: <Calendar className="w-4 h-4" /> },
  { text: "Best budget destinations in Southeast Asia", icon: <DollarSign className="w-4 h-4" /> },
  { text: "Create an itinerary for Paris in 3 days", icon: <MapPin className="w-4 h-4" /> },
  { text: "What travel documents do I need for Morocco?", icon: <FileQuestion className="w-4 h-4" /> },
];

const SuggestedPrompts = ({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto mt-10 px-4">
      {PROMPTS.map((p, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
          onClick={() => onSelect(p.text)}
          className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-accent hover:text-accent hover:shadow-md transition-all duration-200 group"
        >
          <span className="text-slate-400 group-hover:text-accent transition-colors">
            {p.icon}
          </span>
          {p.text}
        </motion.button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
