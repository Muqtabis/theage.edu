const express = require('express');
const router = express.Router();
const { getNews, createNews, deleteNews } = require('../controllers/newsController');

// IMPORTANT: Import the Cloudinary storage config we created earlier
const {upload}= require('../config/storage'); 

// 1. Base Routes
router.route('/')
    .get(getNews)
    // upload.single('image') intercepts the file and sends it to Cloudinary
    .post(upload.single('image'), createNews); 

// 2. ID Route
router.route('/:id')
    .delete(deleteNews);

module.exports = router;