const SuggestedPrompts = ({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) => {
  const prompts = [
    "Plan a 7-day trip to Japan under $2000",
    "Best budget destinations in Southeast Asia",
    "Create an itinerary for Paris in 3 days",
    "What travel documents do I need for Morocco?",
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto mt-12 px-4">
      {prompts.map((p, i) => (
        <button
          key={i}
          onClick={() => onSelect(p)}
          className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-accent hover:text-accent hover:shadow-md transition-all duration-300"
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default SuggestedPrompts;
