const Album = require('../models/AlbumModel');

// @desc    Get all albums
const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find().sort({ timestamp: -1 });
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single album
const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (!album) return res.status(404).json({ message: 'Album not found.' });
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new album
const createAlbum = async (req, res) => {
    const { title, description } = req.body;

    // 1. Handle Cover Image Upload
    // If a file named 'coverImage' is uploaded, use its Cloudinary URL
    let coverUrl;
    if (req.file && req.file.path) {
        coverUrl = req.file.path;
    }

    if (!title || !description) {
        return res.status(400).json({ message: 'Please include a title and description.' });
    }

    try {
        const album = await Album.create({
            title,
            description,
            // Use uploaded URL, or the default placeholder
            coverImage: coverUrl || 'https://placehold.co/600x400/b9e5fd/0c457e?text=No+Cover',
            timestamp: Date.now(),
        });
        res.status(201).json(album);
    } catch (error) {
        console.error("DB Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an album
const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.id);
        if (!album) return res.status(404).json({ message: 'Album not found.' });
        res.status(200).json({ message: 'Album removed.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload photo to album (The specific Drag & Drop handler)
const uploadPhoto = async (req, res) => {
    // req.file contains the Cloudinary info now
    const file = req.file; 
    const { albumId } = req.body; 

    if (!file) return res.status(400).json({ message: 'No image file uploaded.' });
    
    if (!albumId) {
        return res.status(400).json({ message: 'Album ID is required.' });
    }

    try {
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found.' });
        }

        // 1. Get Cloudinary URL directly
        const publicUrl = file.path; 
        
        // 2. Push to album array
        album.images.push({ src: publicUrl, alt: file.originalname });
        await album.save();

        res.status(200).json({ message: 'Photo saved.', url: publicUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getAlbums, 
    getAlbumById, 
    createAlbum, 
    deleteAlbum, 
    uploadPhoto 
};