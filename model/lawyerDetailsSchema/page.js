import mongoose from "mongoose";

const lawyerDetailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [50, "Description must be at least 50 characters"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^\d{10,15}$/, "Invalid mobile number format"],
    },
    barNumber: {
      type: String,
      required: [true, "Bar number is required"],
      unique: true,
      trim: true,
    },
    firm: {
      type: String,
      default: null,
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    specialization: {
      type: String,
      required: [true, "Specialization is required"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // Added timestamps for createdAt and updatedAt
  }
);

const LawyerDetails =
  mongoose.models.LawyerDetails ||
  mongoose.model("LawyerDetails", lawyerDetailsSchema);

export default LawyerDetails;