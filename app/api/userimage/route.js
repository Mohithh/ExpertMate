import { NextResponse } from "next/server";
import { FileModel } from "@/model/UploadImage/page";
import connectDB from "@/testConnect/page";

export async function POST(req) {
  await connectDB();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required!" });
  }

  const userData = await FileModel.findOne({ email });

  if (!userData) {
    return NextResponse.json({ success: false, message: "No data found for this email." });
  }

  return NextResponse.json({ success: true, data: userData });
}
