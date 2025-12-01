const Result = require('../models/ResultModel');

// @desc Get all results
const getResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Upload a result file (PDF/Image/Doc)
const uploadResult = async (req, res) => {
    const { title, grade } = req.body;
    
    // 1. Get Cloudinary URL
    // Since we updated storage.js, this handles 'raw' files (PDFs) too!
    const fileUrl = req.file ? req.file.path : null;

    if (!fileUrl || !title || !grade) {
        return res.status(400).json({ message: 'Please provide title, grade, and file.' });
    }

    try {
        const result = await Result.create({
            title,
            grade,
            fileUrl: fileUrl, // Save Cloudinary URL
            date: new Date().toLocaleDateString(),
        });
        res.status(201).json(result);
    } catch (error) {
        console.error("DB Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete result
const deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Not found' });
        
        // We delete the database entry. The file stays on Cloudinary.
        res.status(200).json({ message: 'Result deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getResults, uploadResult, deleteResult };