const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // 1. Detect if the file is a "Raw" file (PDF, Word, etc.)
        const isRaw = file.mimetype === 'application/pdf' || 
                      file.mimetype === 'application/msword' || 
                      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        if (isRaw) {
            return {
                folder: 'theage_edu_uploads',
                resource_type: 'raw', // <--- CRITICAL: Tells Cloudinary this is a file, not an image
                public_id: file.originalname.split('.')[0], // Use original filename
                format: file.mimetype === 'application/pdf' ? 'pdf' : 'doc'
            };
        }

        // 2. Default behavior for Images
        return {
            folder: 'theage_edu_uploads',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
            resource_type: 'image'
        };
    },
});

const upload = multer({ storage: storage });

module.exports = upload;