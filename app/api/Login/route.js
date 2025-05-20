import testConnect from "@/testConnect/page"; // Your DB connect middleware
import User from "@/model/UserLogin/page"; // Your User model
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const POST = testConnect(async (req) => {
  const body = await req.json();

  // Find user by email
  const user = await User.findOne({ email: body.email });

  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: "User not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Decrypt password from DB
  const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

  if (body.password !== decryptedPassword) {
    return new Response(
      JSON.stringify({ success: false, error: "Invalid password" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Create JWT token with user info including role
  const token = jwt.sign(
    {
      email: user.email,
      name: user.name,
      role: user.role || "user", // Make sure role exists in DB, else default "user"
    },
    process.env.JWT_SECRET_,
    { expiresIn: "1d" }
  );

  // Send response with token and user info
  return new Response(
    JSON.stringify({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role || "user",
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
});
