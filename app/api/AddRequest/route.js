import { NextResponse } from "next/server";
import connectToDB from "@/testConnect/page"; // adjust path
import UserRequest from "@/model/UserRequest/page"; // adjust path

export async function POST(request) {
  try {
    await connectToDB();

    const data = await request.json();

    const requiredFields = [
      "name",
      "userEmail",
      "facultyEmail",
      "category",
      "subject",
      "message",
      "urgency",
      "status",
      "mainCategory",
      "categoryType",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // expectedResponseDate is optional, but if provided, it will be stored
    // You can add additional validation if needed

    const newRequest = new UserRequest(data);
    await newRequest.save();

    return NextResponse.json(
      { message: "Request added successfully", data: newRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /userRequest:", error);
    return NextResponse.json({ error: "Failed to add request" }, { status: 500 });
  }
}
