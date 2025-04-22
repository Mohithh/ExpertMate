// /app/api/doctorList/route.js
import { NextResponse } from 'next/server';
import FacultyDetails from '@/model/facultyDetails/page'; // adjust the path if needed
import connectDB from '@/testConnect/page'; // assumes you have a MongoDB connection file

export async function GET() {
  try {
    await connectDB();

    const doctors = await FacultyDetails.find({ profession: "doctor" });

    if (doctors.length === 0) {
      return NextResponse.json({ success: false, message: "No doctors found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: doctors }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching doctors:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
