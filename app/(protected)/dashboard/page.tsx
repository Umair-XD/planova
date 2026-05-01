import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsBar from "@/components/dashboard/StatsBar";
import QuickActions from "@/components/dashboard/QuickActions";
import TripGrid from "@/components/dashboard/TripGrid";
import RecentChats from "@/components/dashboard/RecentChats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Trip from "@/models/Trip";
import Message from "@/models/Message";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Planova",
  description: "View your travel stats and manage your upcoming trips.",
};

async function getDashboardData(userId: string) {
  await dbConnect();

  const trips = await Trip.find({ userId }).sort({ createdAt: -1 }).limit(6);
  const totalTrips = await Trip.countDocuments({ userId });

  // Calculate stats
  const allTrips = await Trip.find({ userId });
  const countries = new Set(allTrips.map((t) => t.destination)).size;
  const totalDays = allTrips.reduce((acc, t) => {
    const start = new Date(t.startDate);
    const end = new Date(t.endDate);
    return (
      acc +
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    );
  }, 0);
  const totalBudget = allTrips.reduce((acc, t) => acc + (t.budget || 0), 0);

  // Recent chats
  const recentMessages = await Message.find({ userId, role: "assistant" })
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    trips: JSON.parse(JSON.stringify(trips)),
    stats: {
      totalTrips,
      countries,
      totalDays,
      totalBudget,
    },
    recentChats: JSON.parse(JSON.stringify(recentMessages)),
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const { trips, stats, recentChats } = await getDashboardData(
    session!.user.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <WelcomeHeader />
      <StatsBar stats={stats} />
      <QuickActions />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary">
              Your Recent Trips
            </h2>
            <Link
              href="/trips"
              className="text-accent hover:underline font-semibold text-sm"
            >
              View all
            </Link>
          </div>
          <TripGrid trips={trips} />
        </div>

        <div className="lg:col-span-1">
          <RecentChats chats={recentChats} />
        </div>
      </div>
    </div>
  );
}
