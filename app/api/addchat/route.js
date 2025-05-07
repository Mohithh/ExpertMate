import { NextResponse } from "next/server";
import Chat from "@/model/chat/page";
import connectDB from "@/testConnect/page"; // your MongoDB connection file



export async function POST(req) {
  try {
    await connectDB();

    const reqBody = await req.json();
    const { senderEmail, receiverEmail, text } = reqBody; // ✅ fixed here

    if (!senderEmail || !receiverEmail || !text) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newChat = new Chat({ senderEmail, receiverEmail, text });
    await newChat.save();

    return NextResponse.json({ message: "Chat saved", chat: newChat }, { status: 201 });
  } catch (error) {
    console.error("Error saving chat:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
