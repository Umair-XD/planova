import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Trip from "@/models/Trip";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    await dbConnect();
    const trip = await Trip.findOne({ _id: id, userId: session.user.id });
    if (!trip)
      return NextResponse.json(
        { data: null, error: "Not found" },
        { status: 404 }
      );

    return NextResponse.json({ data: trip, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    const body = await req.json();
    await dbConnect();

    const trip = await Trip.findOneAndUpdate(
      { _id: id, userId: session.user.id },
      { $set: body },
      { new: true }
    );

    if (!trip)
      return NextResponse.json(
        { data: null, error: "Not found" },
        { status: 404 }
      );
    return NextResponse.json({ data: trip, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    await dbConnect();
    const trip = await Trip.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!trip)
      return NextResponse.json(
        { data: null, error: "Not found" },
        { status: 404 }
      );
    return NextResponse.json({ data: "Trip deleted successfully", error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}
