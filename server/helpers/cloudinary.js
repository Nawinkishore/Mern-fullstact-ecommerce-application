import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer configuration for memory storage
const storage = multer.memoryStorage();

async function imageUploadUtils(fileBuffer, mimetype) {
  const result = await cloudinary.uploader.upload(
    `data:${mimetype};base64,${fileBuffer.toString("base64")}`,
    {
      resource_type: "auto",
    }
  );
  return result;
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file limit
});

export { upload, imageUploadUtils };
