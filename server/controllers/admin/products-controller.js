import { imageUploadUtils } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";

// Handle image upload
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

// Add a product
const addProducts = async (req, res) => {
  const { image, title, description, category, brand, price, salePrice, totalStock } = req.body;
  try {
    if (!image || !title || !description || !category || !brand || !price || !salePrice || !totalStock) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const product = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Fetch Products Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Export all functions as named exports
export { handleImageUpload, addProducts, fetchAllProducts };