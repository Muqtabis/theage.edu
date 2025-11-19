const express = require('express');
const router = express.Router();

// 1. Import deleteNews here
const { getNews, createNews, deleteNews } = require('../controllers/newsController');
const upload = require('../config/multerConfig'); 

// 2. Base Routes (GET all, POST new)
router.route('/')
    .get(getNews)
    .post(upload.single('image'), createNews); 

// 3. ✅ NEW: ID Route (DELETE specific item)
// This handles requests to http://localhost:5000/api/news/65a... (some ID)
router.route('/:id')
    .delete(deleteNews);

module.exports = router;