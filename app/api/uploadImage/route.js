import { NextResponse } from "next/server";
import { FileModel } from "@/model/UploadImage/page";
import connectDB from "@/testConnect/page";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await connectDB();

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ success: false, message: "No file provided" });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");
  const isImage = file.type.startsWith("image/");

  const newFile = new FileModel({
    filename: file.name,
    contentType: file.type,
    fileBase64: base64,
    isImage,
  });

  await newFile.save();

  return NextResponse.json({ success: true, message: `${isImage ? "Image" : "File"} uploaded` });
}

export async function GET() {
  await connectDB();
  const files = await FileModel.find().sort({ createdAt: -1 });
  return NextResponse.json(files);
}
