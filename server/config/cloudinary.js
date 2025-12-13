import {v2 as cloudinaryV2} from 'cloudinary';

cloudinaryV2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME,
    secure: true,
});

const cloudinary = cloudinaryV2;

export default cloudinary;
