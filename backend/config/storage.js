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

// 2. Storage Config (Split logic for PDF vs Image)
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Create a clean, unique filename
        const safeName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, "_");
        const uniqueId = `${safeName}_${Date.now()}`;

        // CHECK FILE TYPE
        if (file.mimetype === 'application/pdf') {
            return {
                folder: 'theage_edu_uploads',
                // FIX: 'raw' prevents Cloudinary from corrupting the PDF
                resource_type: 'raw', 
                // IMPORTANT: We must manually add .pdf extension for raw files
                public_id: uniqueId + '.pdf',
            };
        } else {
            return {
                folder: 'theage_edu_uploads',
                // Images are processed normally
                resource_type: 'image',
                allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
                public_id: uniqueId,
            };
        }
    },
});

// 3. Initialize Multer
const upload = multer({ storage: storage });

// 4. Export Object
module.exports = {
    cloudinary,
    storage,
    upload
};