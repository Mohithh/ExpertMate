import { NextResponse } from "next/server";
import connectDB from "@/testConnect/page";
import UserRequest from "@/model/UserRequest/page";
export async function POST(req) {
  try {
    await connectDB();

    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "userEmail is required" },
        { status: 400 }
      );
    }

    const requests = await UserRequest.find({ userEmail }).sort({ createdAt: -1 });

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}