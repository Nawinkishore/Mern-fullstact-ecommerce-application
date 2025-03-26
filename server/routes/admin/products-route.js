import express from "express";
import {
  handleImageUpload,
  addProducts,
  editProduct,
  fetchAllProducts,
  deleteProductById,
} from "../../controllers/admin/products-controller.js";
import { upload } from "../../helpers/cloudinary.js";
const router = express.Router();
router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProducts);
router.post("/update/:id", editProduct);
router.get("/get", fetchAllProducts);
router.delete("/delete/:id", deleteProductById);

export default router;
