// /app/api/teacherList/route.js
import { NextResponse } from 'next/server';
import FacultyDetails from '@/model/facultyDetails/page'; // adjust the path if needed
import connectDB from '@/testConnect/page'; // assumes you have a MongoDB connection file

export async function GET() {
  try {
    await connectDB();

    const teachers = await FacultyDetails.find({ profession: "teacher" });

    if (teachers.length === 0) {
      return NextResponse.json({ success: false, message: "No teachers found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: teachers }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching teachers:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
