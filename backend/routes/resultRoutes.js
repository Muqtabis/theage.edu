const express = require('express');
const router = express.Router();
const { getResults, uploadResult, deleteResult } = require('../controllers/resultController');

// IMPORTANT: Import the Cloudinary storage config
const upload = require('../config/storage');

router.route('/')
    .get(getResults)
    // Cloudinary middleware handles the file (PDF, Doc, or Image)
    .post(upload.single('file'), uploadResult); 

router.route('/:id').delete(deleteResult);

module.exports = router;