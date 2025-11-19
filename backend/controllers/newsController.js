const News = require('../models/NewsModel');
const fs = require('fs'); 
const path = require('path');

// @desc    Get all news articles
// @route   GET /api/news
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ timestamp: -1 }); 
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new news article
// @route   POST /api/news
const createNews = async (req, res) => {
  const { title, content } = req.body; 
  const file = req.file;

  if (!title || !content || !file) {
    if (file) fs.unlinkSync(file.path); 
    return res.status(400).json({ message: 'Please include a title, content, and an image file.' });
  }

  try {
    const publicUrl = `http://localhost:5000/uploads/${file.filename}`;

    const news = await News.create({
      title,
      content,
      imageUrl: publicUrl,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      timestamp: Date.now(),
    });
    res.status(201).json(news);
  } catch (error) {
    if (file) fs.unlinkSync(file.path); 
    console.error(`MongoDB Error: ${error.message}`);
    res.status(500).json({ message: 'Server error during insertion.' });
  }
};

// ✅ NEW: Delete News Logic
// @desc    Delete a news article
// @route   DELETE /api/news/:id
const deleteNews = async (req, res) => {
  try {
    // 1. Find the article first
    const newsItem = await News.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ message: 'News article not found' });
    }

    // 2. (Optional) Delete the image file from the 'uploads' folder
    if (newsItem.imageUrl) {
      try {
        // Extract filename from the full URL (e.g., "image-123.jpg")
        const filename = newsItem.imageUrl.split('/uploads/')[1];
        if (filename) {
            const filePath = path.join(__dirname, '..', 'uploads', filename);
            // Check if file exists before trying to delete
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
      } catch (err) {
        console.error("Could not delete image file:", err);
        // Continue deleting the database entry even if file deletion fails
      }
    }

    // 3. Delete from Database
    await newsItem.deleteOne();

    res.status(200).json({ message: 'News article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNews,
  createNews,
  deleteNews, // ✅ Ensure this is exported
};