import mongoose from "mongoose";
import LawyerDetails from "@/model/LawyerDetails/page"

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected 
  }
  await mongoose.connect(process.env.MONGODB_URI);
};

export const POST = async (request) => {
  try {
    await connectDb();
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'email', 'name', 'mobile', 'barNumber', 
      'country', 'city', 'specialization',
      'qualification', 'experience', 'description'
    ];
    
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid email format"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate mobile number format
    if (!/^\d{10,15}$/.test(body.mobile)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid phone number format (10-15 digits required)"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate description length
    if (body.description.length < 50) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Description must be at least 50 characters"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newLawyer = new LawyerDetails({
      email: body.email.toLowerCase().trim(),
      name: body.name.trim(),
      description: body.description.trim(),
      mobile: body.mobile.trim(),
      barNumber: body.barNumber.trim(),
      firm: body.firm ? body.firm.trim() : null,
      country: body.country.trim(),
      city: body.city.trim(),
      specialization: body.specialization.trim(),
      qualification: body.qualification.trim(),
      experience: body.experience.trim(),
      status: 'pending'
    });

    const savedLawyer = await newLawyer.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Lawyer registration submitted successfully! Your account will be reviewed within 2 business days.",
        data: {
          id: savedLawyer._id,
          name: savedLawyer.name,
          email: savedLawyer.email,
          status: savedLawyer.status
        }
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      const message = field === 'email' 
        ? 'Email already exists in our system' 
        : 'Bar number already exists in our system';
      
      return new Response(
        JSON.stringify({
          success: false,
          error: message
        }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return new Response(
        JSON.stringify({
          success: false,
          error: errors.join(', ')
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Internal server error"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};