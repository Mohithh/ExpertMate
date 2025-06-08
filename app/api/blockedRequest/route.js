import { NextResponse } from "next/server";
import connectToDB from "@/testConnect/page"; // adjust path
import UserRequest from "@/model/UserRequest/page"; // adjust path

export async function PUT(request) {
  try {
    await connectToDB();

    const body = await request.json();
    const { userEmail, facultyEmail, status } = body;

    // Validate input
    if (!userEmail || !facultyEmail || !status) {
      return NextResponse.json(
        { error: "userEmail, facultyEmail, and status are required" },
        { status: 400 }
      );
    }

    // Define update condition and new status
    let filter = { userEmail, facultyEmail };
    let update = {};

    if (status === "Blocked") {
      update = { status: "Blocked" }; // block all
    } else if (status === "Unblocked") {
      filter.status = "Blocked"; // only unblock blocked ones
      update = { status: "Pending" }; // unblock = set to pending
    } else {
      return NextResponse.json(
        { error: "Invalid status. Use 'Blocked' or 'Unblocked' only." },
        { status: 400 }
      );
    }

    // Perform update
    const result = await UserRequest.updateMany(filter, { $set: update });

    return NextResponse.json(
      {
        message: `Status updated successfully for ${result.modifiedCount} request(s)`,
        modifiedCount: result.modifiedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in block/unblock update:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
