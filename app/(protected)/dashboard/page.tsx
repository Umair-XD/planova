import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsBar from "@/components/dashboard/StatsBar";
import QuickActions from "@/components/dashboard/QuickActions";
import TripGrid from "@/components/dashboard/TripGrid";
import RecentChats from "@/components/dashboard/RecentChats";
import SectionHeader from "@/components/ui/SectionHeader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Trip from "@/models/Trip";
import Message from "@/models/Message";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Planova",
  description: "View your travel stats and manage your upcoming trips.",
};

async function getDashboardData(userId: string) {
  await dbConnect();

  const [trips, allTrips, recentMessages] = await Promise.all([
    Trip.find({ userId }).sort({ createdAt: -1 }).limit(6),
    Trip.find({ userId }),
    Message.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20),
  ]);

  const totalTrips = allTrips.length;
  const countries = new Set(allTrips.map((t) => t.destination)).size;
  const totalDays = allTrips.reduce((acc, t) => {
    const diff = new Date(t.endDate).getTime() - new Date(t.startDate).getTime();
    return acc + Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }, 0);
  const totalBudget = allTrips.reduce((acc, t) => acc + (t.budget || 0), 0);

  return {
    trips: JSON.parse(JSON.stringify(trips)),
    stats: { totalTrips, countries, totalDays, totalBudget },
    recentChats: JSON.parse(JSON.stringify(recentMessages)),
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const { trips, stats, recentChats } = await getDashboardData(session!.user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <WelcomeHeader />
      <StatsBar stats={stats} />
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SectionHeader
            title="Recent Trips"
            subtitle={`${trips.length} of ${stats.totalTrips} trips`}
            actionLabel="View all"
            actionHref="/trips"
          />
          <TripGrid trips={trips} />
        </div>

        <div className="lg:col-span-1">
          <SectionHeader title="Chat History" />
          <RecentChats chats={recentChats} />
        </div>
      </div>
    </div>
  );
}
