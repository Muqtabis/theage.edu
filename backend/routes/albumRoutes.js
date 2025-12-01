const express = require('express');
const router = express.Router();

// 1. Import Cloudinary Config
const {upload} = require('../config/storage');

const { 
    getAlbums, 
    getAlbumById, 
    createAlbum, 
    deleteAlbum, 
    uploadPhoto 
} = require('../controllers/albumController');

// 2. Routes for "/"
router.route('/')
    .get(getAlbums)
    // ✅ NEW: Allow uploading a cover image when creating the album
    .post(upload.single('coverImage'), createAlbum);

// 3. Routes for "/:id"
router.route('/:id')
    .get(getAlbumById)
    .delete(deleteAlbum);

// 4. Route for Drag-and-Drop Photo Upload
router.route('/upload-photo')
    // ✅ Uses Cloudinary storage
    .post(upload.single('image'), uploadPhoto);

module.exports = router;