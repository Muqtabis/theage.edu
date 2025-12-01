const Result = require('../models/ResultModel');
const { cloudinary } = require('../config/storage');

const getResults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const uploadResult = async (req, res) => {
    const { title, grade } = req.body;
    // Cloudinary URL is automatically here
    const fileUrl = req.file ? req.file.path : null;

    if (!fileUrl || !title || !grade) {
        return res.status(400).json({ message: 'Missing fields' });
    }

    try {
        const result = await Result.create({
            title,
            grade,
            fileUrl, 
            date: new Date().toLocaleDateString(),
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) return res.status(404).json({ message: 'Not found' });

        // Delete from Cloudinary logic
        if (result.fileUrl) {
            const urlParts = result.fileUrl.split('/');
            const fileName = urlParts.pop(); 
            // If it's raw (PDF), we need the extension for the ID sometimes, 
            // but usually just the name. For simplicity, we try to destroy using just name.
            const publicIdRaw = fileName.split('.')[0]; 
            const publicId = `theage_edu_uploads/${publicIdRaw}`;

            // We attempt to delete as 'image' AND 'raw' just to be safe
            try {
                await cloudinary.uploader.destroy(publicId); // try as image
                await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' }); // try as raw
            } catch (e) { console.log("Delete error ignored", e); }
        }

        await Result.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getResults, uploadResult, deleteResult };