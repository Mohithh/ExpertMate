import mongoose from "mongoose";

const userRequestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userEmail: { type: String, required: true },
    facultyEmail: { type: String, required: true },

    category: { type: String, required: true }, // e.g., Mentorship
    subject: { type: String, required: true },
    message: { type: String, required: true },
    urgency: { type: String, required: true },
    expectedResponseDate: { type: String, default: "" },

    status: { type: String, required: true },

    mainCategory: { type: String, required: true },      
    categoryType: { type: String, required: true },      
  },
  { timestamps: true }
);

const UserRequest =
  mongoose.models.UserRequest || mongoose.model("UserRequest", userRequestSchema);

export default UserRequest;
