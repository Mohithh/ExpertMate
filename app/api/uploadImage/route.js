import { NextResponse } from "next/server";
import { FileModel } from "@/model/UploadImage/page";
import connectDB from "@/testConnect/page";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
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

    const updatedData = {
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
    };

    const result = await FileModel.findOneAndUpdate(
      { email },
      updatedData,
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: result ? "Updated successfully" : "Created new entry",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({
      success: false,
      message: "Server error",
      error: error.message || "Unknown error",
    });
  }
}
