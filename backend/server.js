import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

// --- Middleware ---
app.use(cors({
  // In production, only allow requests from the deployed frontend.
  // Locally FRONTEND_URL is http://localhost:5173 which also works fine.
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));
app.use(express.json());

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

app.get("/", (req, res) => res.send("DocuMind API is running ✅"));

// --- Start ---
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
