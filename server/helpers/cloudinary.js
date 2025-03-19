import cloudinary from 'cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name : 'dakiluddl',
    api_key : '279921496553248',
    api_secret : 'k_R76opxhucd4A1E5AIJho0NZOo'
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
