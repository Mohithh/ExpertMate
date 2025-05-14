import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');
    const image = formData.get('image');
    const file = formData.get('file');

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Upload profile picture if exists
    if (image) {
      const profileBlob = await put(`lawyers/${email}/profile.${image.name.split('.').pop()}`, image, {
        access: 'public',
      });
    }

    // Upload document if exists
    if (file) {
      const docBlob = await put(`lawyers/${email}/license.${file.name.split('.').pop()}`, file, {
        access: 'public',
      });
    }

    return NextResponse.json(
      { success: true, message: "Files uploaded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "File upload failed" },
      { status: 500 }
    );
  }
}