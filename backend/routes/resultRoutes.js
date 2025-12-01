const express = require('express');
const router = express.Router();
const { getResults, uploadResult, deleteResult } = require('../controllers/resultController');

// FIX: Destructure { upload } because we exported an object in storage.js
const { upload } = require('../config/storage');

router.route('/')
    .get(getResults)
    // upload.single('file') handles the image/PDF upload to Cloudinary
    .post(upload.single('file'), uploadResult); 

router.route('/:id').delete(deleteResult);

module.exports = router;