import { NextResponse } from "next/server";
import connectToDB from "@/testConnect/page"; 
import UserRequest from "@/model/UserRequest/page"; 




export async function POST(request) {
  try {
    await connectToDB();

    const body = await request.json();

    let requests;

    if (body.userEmail) {
      // Fetch requests made by the user, sorted by latest first
      requests = await UserRequest.find({ userEmail: body.userEmail }).sort({ createdAt: -1 });
    } else if (body.facultyEmail) {
      // Fetch requests received by the faculty, sorted by latest first
      requests = await UserRequest.find({ facultyEmail: body.facultyEmail }).sort({ createdAt: -1 });
    } else {
      return NextResponse.json({ error: "userEmail or facultyEmail is required" }, { status: 400 });
    }

    return NextResponse.json({ message: "Requests fetched successfully", data: requests }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}
