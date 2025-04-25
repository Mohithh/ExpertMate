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

  const email = formData.get("email");
  const image = formData.get("image");
  const file = formData.get("file");

  if (!email || !image || !file) {
    return NextResponse.json({
      success: false,
      message: "Email, image, and file are required!",
    });
  }

  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  const newEntry = new FileModel({
    email,
    image: {
      filename: image.name,
      contentType: image.type,
      fileBase64: imageBuffer.toString("base64"),
    },
    file: {
      filename: file.name,
      contentType: file.type,
      fileBase64: fileBuffer.toString("base64"),
    },
  });

  await newEntry.save();

  return NextResponse.json({ success: true, message: "Uploaded successfully" });
}

export async function GET() {
  await connectDB();
  const files = await FileModel.find().sort({ createdAt: -1 });
  return NextResponse.json(files);
}
