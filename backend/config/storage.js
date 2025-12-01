const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Clean filename
        const safeName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, "_");
        const uniqueId = `${safeName}_${Date.now()}`;

        // CHECK FILE TYPE
        if (file.mimetype === 'application/pdf') {
            return {
                folder: 'theage_edu_uploads',
                // FIX: Use 'raw' to bypass the 401 Image Security check
                resource_type: 'raw', 
                // IMPORTANT: Manually add extension for raw files
                public_id: uniqueId + '.pdf',
            };
        } else {
            return {
                folder: 'theage_edu_uploads',
                // Images stay as 'image'
                resource_type: 'image',
                allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
                public_id: uniqueId,
            };
        }
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, storage, upload };