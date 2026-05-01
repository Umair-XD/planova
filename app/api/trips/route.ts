import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Trip from "@/models/Trip";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    await dbConnect();
    const trips = await Trip.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });
    return NextResponse.json({ data: trips, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    const body = await req.json();
    const { title, destination, startDate, endDate, budget } = body;

    if (!title || !destination || !startDate || !endDate || !budget) {
      return NextResponse.json(
        { data: null, error: "Missing fields" },
        { status: 400 }
      );
    }

    await dbConnect();
    const trip = await Trip.create({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json({ data: trip, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}
