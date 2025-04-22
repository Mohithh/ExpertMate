// /app/api/engineerList/route.js
import { NextResponse } from 'next/server';
import FacultyDetails from '@/model/facultyDetails/page'; // adjust the path if needed
import connectDB from '@/testConnect/page'; // assumes you have a MongoDB connection file

export async function GET() {
  try {
    await connectDB();

    const engineers = await FacultyDetails.find({ profession: "engineer" });

    if (engineers.length === 0) {
      return NextResponse.json({ success: false, message: "No engineers found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: engineers }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching engineers:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
