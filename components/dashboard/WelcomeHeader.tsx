"use client";

import Avatar from "@/components/ui/Avatar";
import { useSession } from "next-auth/react";
import { Sun, Sunset, Moon } from "lucide-react";

function getGreeting(): { text: string; icon: React.ReactNode } {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12)
    return { text: "Good morning", icon: <Sun className="w-5 h-5 text-amber-400" /> };
  if (hour >= 12 && hour < 18)
    return { text: "Good afternoon", icon: <Sunset className="w-5 h-5 text-orange-400" /> };
  return { text: "Good evening", icon: <Moon className="w-5 h-5 text-indigo-400" /> };
}

const WelcomeHeader = () => {
  const { data: session } = useSession();
  const { text, icon } = getGreeting();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const firstName = session?.user?.name?.split(" ")[0] || "Traveler";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 animate-fade-up">
      <div>
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h1 className="text-3xl font-heading font-bold text-primary">
            {text}, {firstName}!
          </h1>
        </div>
        <p className="text-slate-400 text-sm">{today}</p>
      </div>
      <div className="flex items-center gap-3 bg-white py-2.5 px-4 rounded-2xl shadow-sm border border-slate-100 self-start md:self-auto">
        <Avatar
          src={session?.user?.image}
          name={session?.user?.name}
          size="md"
        />
        <div>
          <p className="text-sm font-bold text-primary leading-tight">
            {session?.user?.name}
          </p>
          <p className="text-xs text-accent font-semibold">Premium Member</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
