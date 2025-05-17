import mongoose from "mongoose";

const lawyerDetailsSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  mobile: { type: String, required: true },
  barNumber: { type: String, required: true, unique: true },
  firm: { type: String },
  country: { type: String, required: true },
  city: { type: String, required: true },
  specialization: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

const LawyerDetails = mongoose.models.LawyerDetails || mongoose.model("LawyerDetails", lawyerDetailsSchema);

export default LawyerDetails;