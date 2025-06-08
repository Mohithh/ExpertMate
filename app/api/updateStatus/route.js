import { NextResponse } from "next/server";
import connectToDB from "@/testConnect/page"; // adjust path
import UserRequest from "@/model/UserRequest/page"; // adjust path

export async function PUT(request) {
  try {
    await connectToDB();

    const body = await request.json();
    const { _id, userEmail, facultyEmail, status } = body;

    // Validate
    if (!userEmail || !facultyEmail || !_id || !status) {
      return NextResponse.json(
        { error: "userEmail, facultyEmail, _id, and status are all required." },
        { status: 400 }
      );
    }

    // Match request exactly
    const requestToUpdate = await UserRequest.findOne({
      _id,
      userEmail,
      facultyEmail,
    });

    if (!requestToUpdate) {
      return NextResponse.json(
        { error: "No matching request found for provided details." },
        { status: 404 }
      );
    }

    // Update the status
    requestToUpdate.status = status;
    await requestToUpdate.save();

    return NextResponse.json(
      {
        message: "Request status updated successfully",
        data: requestToUpdate,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}
