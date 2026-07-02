import { GoogleGenerativeAI } from "@google/generative-ai";
import Pdf from "../models/Pdf.js";
import Chat from "../models/Chat.js";
import { uploadBuffer } from "../utils/cloudinary.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

/**
 * Fetch a PDF from its Cloudinary URL and convert it to the inline
 * data format that Gemini expects.
 */
const fileToGeminiPart = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Could not fetch PDF from storage.");
  const buffer = await response.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType: "application/pdf",
    },
  };
};

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No PDF uploaded." });
    }

    // Upload the in-memory buffer straight to Cloudinary
    const result = await uploadBuffer(req.file.buffer);

    const pdf = await Pdf.create({
      user: req.userId,
      originalName: req.file.originalname,
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
      size: req.file.size,
    });

    await Chat.create({ user: req.userId, pdf: pdf._id, messages: [] });

    res.status(201).json({ pdf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json({ pdfs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ pdf: req.params.id, user: req.userId });
    res.json({ messages: chat ? chat.messages : [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Question is required." });
    }

    const pdf = await Pdf.findOne({ _id: req.params.id, user: req.userId });
    if (!pdf) return res.status(404).json({ message: "PDF not found." });

    const geminiPart = await fileToGeminiPart(pdf.cloudinaryUrl);

    const result = await model.generateContent([geminiPart, { text: question }]);
    const answer = result.response.text();

    const chat = await Chat.findOne({ pdf: pdf._id, user: req.userId });
    chat.messages.push({ role: "user", content: question });
    chat.messages.push({ role: "ai", content: answer });
    await chat.save();

    res.json({ answer });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({ message: "AI request failed: " + error.message });
  }
};
