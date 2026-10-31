const express = require('express');
const router = express.Router();
const { upload } = require('../config/storage');

const { 
    getAlbums, 
    getAlbumById, 
    createAlbum, 
    deleteAlbum, 
    uploadPhoto,
    deletePhoto,
} = require('../controllers/albumController');

router.route('/')
    .get(getAlbums)
    .post(upload.single('coverImage'), createAlbum);

router.route('/:id')
    .get(getAlbumById)
    .delete(deleteAlbum);

router.route('/upload-photo')
    .post(upload.single('image'), uploadPhoto);

router.route('/:albumId/photos/:photoId')
    .delete(deletePhoto);

module.exports = router;
