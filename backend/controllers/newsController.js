const News = require('../models/NewsModel');

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
  
  // 1. Get Cloudinary URL if file exists
  let imageUrl;
  if (req.file && req.file.path) {
      imageUrl = req.file.path;
  }

  if (!title || !content) {
    return res.status(400).json({ message: 'Please include a title and content.' });
  }

  try {
    const news = await News.create({
      title,
      content,
      // If imageUrl is undefined, Mongoose will use the default from Schema
      imageUrl: imageUrl, 
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      timestamp: Date.now(),
    });
    res.status(201).json(news);
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    res.status(500).json({ message: 'Server error during insertion.' });
  }
};

// @desc    Delete a news article
// @route   DELETE /api/news/:id
const deleteNews = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ message: 'News article not found' });
    }

    // We simply delete the database record. 
    // (Cloudinary images persist, which is fine for this scale)
    await newsItem.deleteOne();

    res.status(200).json({ message: 'News article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getNews,
  createNews,
  deleteNews, 
};