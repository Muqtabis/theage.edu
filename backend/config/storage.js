const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');

dotenv.config();

// 1. Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Storage Config
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Clean filename logic
        const safeName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, "_");
        const uniqueId = `${safeName}_${Date.now()}`;

        // ---------------------------------------------------------
        // FIX: Revert to 'auto' now that size limits are fixed
        // ---------------------------------------------------------
        if (file.mimetype === 'application/pdf') {
            return {
                folder: 'theage_edu_uploads',
                // 'auto' allows Cloudinary to serve it as 'application/pdf' (Viewable)
                resource_type: 'auto', 
                allowed_formats: ['pdf'],
                // Do NOT add .pdf extension manually here, Cloudinary does it for 'auto'
                public_id: uniqueId, 
            };
        } else {
            return {
                folder: 'theage_edu_uploads',
                resource_type: 'image',
                allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
                public_id: uniqueId,
            };
        }
    },
});

// 3. Initialize Multer
const upload = multer({ storage: storage });

module.exports = { cloudinary, storage, upload };