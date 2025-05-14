import { NextResponse } from "next/server";
import Chat from "@/model/chat/page";
import connectDB from "@/testConnect/page"; // your MongoDB connection file




export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body
    const { senderEmail, receiverEmail } = await req.json();

    // Ensure both senderEmail and receiverEmail are provided in the body
    if (!senderEmail || !receiverEmail) {
      return NextResponse.json({ error: "Both senderEmail and receiverEmail are required" }, { status: 400 });
    }

    // Fetch chats where senderEmail and receiverEmail match exactly
    const chats = await Chat.find({
      $or: [
        { senderEmail, receiverEmail }, // sender -> receiver
        { senderEmail: receiverEmail, receiverEmail: senderEmail }, // receiver -> sender
      ],
    }).sort({ createdAt: 1 }); // Sort by creation time (ascending)

    if (chats.length === 0) {
      return NextResponse.json({ message: "No chats found between these users" }, { status: 404 });
    }

    return NextResponse.json({ chats }, { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
