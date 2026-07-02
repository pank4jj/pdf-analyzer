import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files are allowed."));
};

// memoryStorage keeps the file in req.file.buffer — no local disk needed.
// We upload from that buffer straight to Cloudinary in the controller.
export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});
