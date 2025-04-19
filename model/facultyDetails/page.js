import mongoose from "mongoose";

const facultyDetailsSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },

    country: { type: String, required: true },
    city: { type: String, required: true },

    profession: { type: String, required: true },
    professionCategory: { type: String, required: true },

    gender: { type: String, required: true },
    experience: { type: String, required: true },
    age: { type: String, required: true },

    workingMode: { type: String, required: true },
    jobType: { type: String, required: true },
  },
  { timestamps: true }
);

const FacultyDetails =
  mongoose.models.FacultyDetails || mongoose.model("FacultyDetails", facultyDetailsSchema);

export default FacultyDetails;
