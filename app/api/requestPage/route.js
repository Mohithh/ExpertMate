// app/api/getRequestDetails/route.js

import { NextResponse } from 'next/server';
import UserRequest from "@/model/UserRequest/page"; // adjust path
import connectDB from '@/testConnect/page'; // your MongoDB connection utility

export async function POST(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    const requestData = await UserRequest.findById(id);

    if (!requestData) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: requestData }, { status: 200 });

  } catch (error) {
    console.error('Error fetching request:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
