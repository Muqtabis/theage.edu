const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig'); // Import Multer

// Import ONLY the functions that actually exist in the controller
const { 
    getAlbums, 
    getAlbumById, 
    createAlbum, 
    deleteAlbum, 
    uploadPhoto 
} = require('../controllers/albumController');

// 1. Routes for "/"
router.route('/')
    .get(getAlbums)
    .post(createAlbum);

// 2. Routes for "/:id"
router.route('/:id')
    .get(getAlbumById)
    .delete(deleteAlbum);

// 3. Route for Drag-and-Drop Upload
router.route('/upload-photo')
    .post(upload.single('image'), uploadPhoto);

module.exports = router;