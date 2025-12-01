const Result = require('../models/ResultModel');
// Import cloudinary so we can delete files later
const { cloudinary } = require('../config/storage');

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
    
    // Cloudinary automatically provides the 'path' as a valid URL
    const fileUrl = req.file ? req.file.path : null;

    if (!fileUrl || !title || !grade) {
        return res.status(400).json({ message: 'Please provide title, grade, and file.' });
    }

    try {
        const result = await Result.create({
            title,
            grade,
            fileUrl: fileUrl, // Saves the Cloudinary URL (https://...)
            date: new Date().toLocaleDateString(),
        });
        res.status(201).json(result);
    } catch (error) {
        console.error("DB Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

// @desc Delete result AND remove file from Cloudinary
const deleteResult = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) return res.status(404).json({ message: 'Not found' });

        // Extract the public_id to delete from Cloudinary
        // Logic: Splits URL to find the folder/filename part
        if (result.fileUrl) {
            const urlParts = result.fileUrl.split('/');
            // Gets the last part (filename.pdf)
            const fileNameWithExt = urlParts[urlParts.length - 1]; 
            // Removes .pdf extension
            const publicIdRaw = fileNameWithExt.split('.')[0]; 
            
            // Construct the full public ID (folder + filename)
            const publicId = `theage_edu_uploads/${publicIdRaw}`;

            // Delete file from Cloudinary (resource_type: 'raw' or 'image' handled)
            // We try/catch here so if the file is missing, we still delete the DB entry
            try {
                await cloudinary.uploader.destroy(publicId); 
            } catch (err) {
                console.log("Cloudinary delete error (safe to ignore):", err);
            }
        }
        
        // Delete from Database
        await Result.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Result and file deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getResults, uploadResult, deleteResult };