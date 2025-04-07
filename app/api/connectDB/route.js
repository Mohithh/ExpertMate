import mongoose from "mongoose";
import testConnect from "@/testConnect/page";
export async function GET() {
  try {
    await testConnect(); // Validate DB linkage
    return new Response(
      JSON.stringify({ response: "Secure channel established with MongoDB." }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "X-Security-Token": "Active",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ anomaly: "Database handshake disrupted", diagnostics: err.message }),
      {
        status: 503,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": "3600",
        },
      }
    );
  }  
}