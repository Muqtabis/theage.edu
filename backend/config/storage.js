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
        // Create a safe unique filename (removes spaces, adds timestamp)
        const safeName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, "_");
        const uniqueId = `${safeName}_${Date.now()}`;

        return {
            folder: 'theage_edu_uploads',
            // CRITICAL FIX: 'auto' lets Cloudinary handle PDFs correctly
            resource_type: 'auto', 
            allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
            public_id: uniqueId,
        };
    },
});

// 3. Initialize Multer
const upload = multer({ storage: storage });

// 4. Export as an object
module.exports = {
    cloudinary,
    storage,
    upload
};