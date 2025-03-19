import { v2 as cloudinary} from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

const storage = new multer.memoryStorage();
async function imageUploadUtils(file)
{
    const result = await cloudinary.uploader.upload(file, {
        resouce_type : 'auto',
    });
    return result;
}

const upload = multer( {storage});

export { upload, imageUploadUtils };
