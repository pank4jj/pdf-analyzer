
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: { type: String, enum: ["user", "ai"], required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const chatSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pdf: { type: mongoose.Schema.Types.ObjectId, ref: "Pdf", required: true },
    messages: [messageSchema], // an array of all messages in this conversation
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
