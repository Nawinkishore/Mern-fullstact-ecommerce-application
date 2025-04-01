import { getFilteredProducts } from "../../controllers/shop/products-controller.js";
import express from "express";
const router = express.Router();
router.get("/get", getFilteredProducts);
export default router;