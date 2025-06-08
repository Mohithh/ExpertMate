import { NextResponse } from "next/server";
import connectToDB from "@/testConnect/page"; 
import UserRequest from "@/model/UserRequest/page"; 




export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();
    const { userEmail, facultyEmail, status } = body;

    if ((!userEmail && !facultyEmail) || !status) {
      return NextResponse.json(
        { error: "Please provide either userEmail or facultyEmail along with status" },
        { status: 400 }
      );
    }

    let query = { status };

    if (userEmail) {
      query.userEmail = userEmail;
    } else if (facultyEmail) {
      query.facultyEmail = facultyEmail;
    }

    let requests;

    // Special case: Blocked (return one)
    if (status === "Blocked") {
      requests = await UserRequest.findOne(query).sort({ createdAt: -1 }); // Ensure latest blocked request
      return NextResponse.json(
        {
          message: requests
            ? "Blocked status fetched"
            : "No blocked request found",
          data: requests ? [requests] : [],
        },
        { status: 200 }
      );
    }

    // General case - sort by newest first
    requests = await UserRequest.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message:
          requests.length > 0
            ? "Filtered requests fetched successfully"
            : "No matching requests found",
        data: requests,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error filtering user requests:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}
