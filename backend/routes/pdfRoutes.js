import express from "express";
import { protect } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import {
  uploadPdf,
  listPdfs,
  getChat,
  askQuestion,
} from "../controllers/pdfController.js";

const router = express.Router();

// Every route here is protected -> user must be logged in.
router.post("/upload", protect, upload.single("pdf"), uploadPdf);
router.get("/", protect, listPdfs);
router.get("/:id/chat", protect, getChat);
router.post("/:id/ask", protect, askQuestion);

export default router;
