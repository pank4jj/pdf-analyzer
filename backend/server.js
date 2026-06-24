import "dotenv/config"; // loads variables from .env
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

const app = express();

// --- Middleware ---
app.use(cors());            // lets the React frontend talk to this server
app.use(express.json());    // lets us read JSON request bodies

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

// A simple test route so you can check the server is alive in a browser.
app.get("/", (req, res) => res.send("PDF Analyzer API is running ✅"));

// --- Start ---
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
