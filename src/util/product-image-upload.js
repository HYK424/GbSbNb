import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productImg',
    allowedFormats: ['png', 'jpeg', 'jpg'],
  },
});

const productImageUpload = multer({ storage });

export { cloudinary, productImageUpload };
