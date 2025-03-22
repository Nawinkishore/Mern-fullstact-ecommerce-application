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
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStock,
  } = req.body;
  try {
    if (
      !image ||
      !title ||
      !description ||
      !category ||
      !brand ||
      !price ||
      !salePrice ||
      !totalStock
    ) {
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

// Update product by id
const updateProductById = async (req, res) => {
  const { id } = req.params;
  // const {
  //   image,
  //   title,
  //   description,
  //   category,
  //   brand,
  //   price,
  //   salePrice,
  //   totalStock,
  // } = req.body;
  const updateFields = req.body;
  try {
    // const product = await Product.findById({ _id: id });
    // if (!product) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Product not found",
    //   });
    // }
    // Product.image = image ?? product.image;
    // Product.title = title ?? product.title;
    // Product.description = description ?? product.description;
    // Product.category = category ?? product.category;
    // Product.brand = brand ?? product.brand;
    // Product.price = price ?? product.price;
    // Product.salePrice = salePrice ?? product.salePrice;
    // Product.totalStock = totalStock ?? product.totalStock;
    // await Product.save();
    // res.status(200).json({
    //   success: true,
    //   message: "Product updated successfully",
    // });
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Delete product by id
const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    await Product.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    res.status.json({
      success: false,
      message: "Something went wrong",
      error: e.message,
    });
  }
};

export { handleImageUpload, addProducts, fetchAllProducts };
