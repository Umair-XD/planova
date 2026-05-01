"use client";

import Avatar from "@/components/ui/Avatar";
import { useSession } from "next-auth/react";

const WelcomeHeader = () => {
  const { data: session } = useSession();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-primary">
          Good morning, {session?.user?.name?.split(" ")[0] || "Traveler"}
        </h1>
        <p className="text-slate-500">{today}</p>
      </div>
      <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-2xl shadow-sm border border-slate-100">
        <Avatar
          src={session?.user?.image}
          name={session?.user?.name}
          size="md"
        />
        <div>
          <p className="text-sm font-bold text-primary leading-none">
            {session?.user?.name}
          </p>
          <p className="text-xs text-slate-400">Premium Member</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
