import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    await dbConnect();
    const user = await User.findById(session.user.id).select("-password");
    return NextResponse.json({ data: user, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json(
        { data: null, error: "Unauthorized" },
        { status: 401 }
      );

    const { name, avatar } = await req.json();
    await dbConnect();

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: { name, avatar } },
      { new: true }
    ).select("-password");

    return NextResponse.json({ data: user, error: null });
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    );
  }
}
