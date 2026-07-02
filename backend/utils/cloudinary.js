import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a Buffer to Cloudinary as a raw file (PDF).
 * Returns the Cloudinary upload result (secure_url, public_id, etc.)
 */
export const uploadBuffer = (buffer, folder = "pdfs") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

export default cloudinary;
