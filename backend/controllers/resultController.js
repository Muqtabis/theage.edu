const Result = require('../models/ResultModel');
const fs = require('fs');

// @desc Get all results
const getResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Upload a result file (PDF/Image)
const uploadResult = async (req, res) => {
    const { title, grade } = req.body;
    const file = req.file;

    if (!file || !title || !grade) {
        if (file) fs.unlinkSync(file.path);
        return res.status(400).json({ message: 'Please provide title, grade, and file.' });
    }

    try {
        const publicUrl = `http://localhost:5000/uploads/${file.filename}`;
        const result = await Result.create({
            title,
            grade,
            fileUrl: publicUrl,
            date: new Date().toLocaleDateString(),
        });
        res.status(201).json(result);
    } catch (error) {
        if (file) fs.unlinkSync(file.path);
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete result
const deleteResult = async (req, res) => {
    try {
        const result = await Result.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Not found' });
        // Optional: Add logic here to fs.unlinkSync the file from /uploads if you want to clean up storage
        res.status(200).json({ message: 'Result deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getResults, uploadResult, deleteResult };