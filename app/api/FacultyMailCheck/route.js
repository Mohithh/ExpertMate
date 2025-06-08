import { NextResponse } from "next/server";
import Faculty from "@/model/facultyLogin/page";
import connectDB from "@/testConnect/page"; // Ensure you have a DB connection utility



export async function POST(req) {
  try {
    await connectDB(); // Connect to MongoDB

    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const faculty = await Faculty.findOne({ email });

    if (faculty) {
      return NextResponse.json({
        success: true,
        exists: true,
        message: "Faculty found",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          exists: false,
          message: "Unauthorized: Faculty not found",
        },
        { status: 401 } // Unauthorized
      );
    }
  } catch (error) {
    console.error("Error checking faculty email:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
