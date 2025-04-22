// model/UploadImage/page.js
import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  fileBase64: String,
  isImage: Boolean,
}, { timestamps: true });

export const FileModel = mongoose.models.FileModel || mongoose.model("FileModel", FileSchema);
