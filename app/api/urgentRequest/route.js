import { NextResponse } from "next/server";
import connectDB from "@/testConnect/page";
import UserRequest from "@/model/UserRequest/page";

export async function POST(req) {
  try {
    await connectDB();

    const { facultyEmail } = await req.json();
    const requests = await UserRequest.find({ facultyEmail, urgency: "High" });

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching urgent requests:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
