import { NextResponse } from "next/server";
import connectDB from "@/testConnect/page";
import UserRequest from "@/model/UserRequest/page";


export async function POST(req) {
  try {
    await connectDB();

    const {
      name,
      userEmail,
      facultyEmail,
      category,
      subject,
      message,
      urgency,
      expectedResponseDate,
      status,
      mainCategory,
      categoryType,
    } = await req.json();

    // Check if user is blocked by faculty
    const isBlocked = await UserRequest.findOne({
      userEmail,
      facultyEmail,
      status: "blocked",
    });

    if (isBlocked) {
      return NextResponse.json(
        { error: "You have been blocked by this faculty member." },
        { status: 403 }
      );
    }

    const newRequest = new UserRequest({
      name,
      userEmail,
      facultyEmail,
      category,
      subject,
      message,
      urgency,
      expectedResponseDate,
      status,
      mainCategory,
      categoryType,
    });

    await newRequest.save();

    return NextResponse.json(
      { message: "Request sent successfully", request: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
