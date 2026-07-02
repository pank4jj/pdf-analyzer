import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    originalName: { type: String, required: true },       // filename the user uploaded
    cloudinaryUrl: { type: String, required: true },      // permanent URL to the file
    cloudinaryPublicId: { type: String, required: true }, // needed if we ever delete it
    size: { type: Number },                               // bytes
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);
