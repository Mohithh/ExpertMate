import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    email: String,
    image: {
      filename: String,
      contentType: String,
      fileBase64: String,
    },
    file: {
      filename: String,
      contentType: String,
      fileBase64: String,
    },
  },
  { timestamps: true }
);

export const FileModel =
  mongoose.models.File || mongoose.model("File", fileSchema);
