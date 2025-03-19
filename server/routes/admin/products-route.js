import express from 'express';
import { handleImageUpload } from '../../controllers/auth/admin/products-controller.js';
import { upload } from '../../helpers/cloudinary.js';
const router = express.Router();
router.post('/upload-image', upload.single('my_file'), handleImageUpload);
export default router;