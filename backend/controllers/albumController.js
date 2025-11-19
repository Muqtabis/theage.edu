const Album = require('../models/AlbumModel');
const fs = require('fs');

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
    const { title, description, coverImage } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: 'Please include a title and description.' });
    }

    try {
        const album = await Album.create({
            title,
            description,
            coverImage: coverImage || 'https://placehold.co/600x400/b9e5fd/0c457e?text=No+Cover',
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
    const file = req.file; 
    const { albumId } = req.body; 

    if (!file) return res.status(400).json({ message: 'No image file uploaded.' });
    if (!albumId) {
        if (file) fs.unlinkSync(file.path); 
        return res.status(400).json({ message: 'Album ID is required.' });
    }

    try {
        const album = await Album.findById(albumId);
        if (!album) {
            fs.unlinkSync(file.path);
            return res.status(404).json({ message: 'Album not found.' });
        }

        // Generate Public URL
        const publicUrl = `http://localhost:5000/uploads/${file.filename}`;
        
        album.images.push({ src: publicUrl, alt: file.originalname });
        await album.save();

        res.status(200).json({ message: 'Photo saved.', url: publicUrl });
    } catch (error) {
        if (file) fs.unlinkSync(file.path); 
        res.status(500).json({ message: error.message });
    }
};

// 🚨 EXPORT EVERYTHING
module.exports = { 
    getAlbums, 
    getAlbumById, 
    createAlbum, 
    deleteAlbum, 
    uploadPhoto 
};