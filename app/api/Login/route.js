import testConnect from "@/testConnect/page";
import User from "@/model/UserLogin/page";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { NextResponse } from 'next/server';

export const POST = testConnect(async (req) => {
  try {
    const body = await req.json();

    // Validate input
    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user (case-insensitive search)
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${body.email}$`, 'i') } 
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Decrypt and compare password
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_);
    const userPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (body.password !== userPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { success: true, email: user.email, name: user.name },
      process.env.JWT_SECRET_,
      { expiresIn: '1d' }
    );

    return NextResponse.json(
      { success: true, token },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
});