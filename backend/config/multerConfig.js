const multer = require('multer');
const path = require('path');

// 1. Define where Multer should store the file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Files will be stored in the 'backend/uploads' folder
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        // Create a unique file name using current timestamp and original extension
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// 2. Define the Multer instance that handles single file uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB
    fileFilter: (req, file, cb) => {
        // 🚨 UPDATE: Add 'pdf' to regex and mimetype check
        const filetypes = /jpeg|jpg|png|gif|webp|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype) || file.mimetype === 'application/pdf';

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images or PDFs Only!'));
        }
    },
});

// Export a middleware function that handles the upload
module.exports = upload;