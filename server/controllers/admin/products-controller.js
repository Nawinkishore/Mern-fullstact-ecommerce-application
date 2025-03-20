import { imageUploadUtils } from "../../helpers/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const result = await imageUploadUtils(req.file.buffer, req.file.mimetype);

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      result,
    });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
// add a product

// fetch all the products

// edit a products

// delete a product

export { handleImageUpload };
