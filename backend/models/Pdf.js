
import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalName: { type: String, required: true }, // the name the user's file had
    storedName: { type: String, required: true },   // the name we saved it as on disk
    path: { type: String, required: true },          // where the file lives on the server
    size: { type: Number },                          // file size in bytes
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);
