const Content = require('../models/ContentModel');

// @desc    Get website content
// @route   GET /api/content
const getContent = async (req, res) => {
  try {
    let content = await Content.findOne({ key: 'main_site_content' });
    if (!content) {
      // Seed default document
      content = await Content.create({ key: 'main_site_content' });
    }
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getContent:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update website content
// @route   PUT /api/content
const updateContent = async (req, res) => {
  try {
    const updates = req.body;
    let content = await Content.findOne({ key: 'main_site_content' });

    if (!content) {
      content = new Content({ key: 'main_site_content', ...updates });
    } else {
      // Merge updates
      if (updates.general) content.general = { ...content.general.toObject(), ...updates.general };
      if (updates.home) content.home = { ...content.home.toObject(), ...updates.home };
      if (updates.about) content.about = { ...content.about.toObject(), ...updates.about };
      if (updates.admissions) content.admissions = { ...content.admissions.toObject(), ...updates.admissions };
      if (updates.academics) content.academics = { ...content.academics.toObject(), ...updates.academics };
      if (updates.studentLife) content.studentLife = { ...content.studentLife.toObject(), ...updates.studentLife };
    }

    const savedContent = await content.save();
    res.status(200).json(savedContent);
  } catch (error) {
    console.error('Error in updateContent:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload an image for site content (Hero, Principal photo, etc.)
// @route   POST /api/content/upload-image
const uploadContentImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error('Error in uploadContentImage:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset website content to defaults
// @route   POST /api/content/reset
const resetContent = async (req, res) => {
  try {
    await Content.deleteMany({ key: 'main_site_content' });
    const fresh = await Content.create({ key: 'main_site_content' });
    res.status(200).json(fresh);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContent,
  updateContent,
  uploadContentImage,
  resetContent,
};
