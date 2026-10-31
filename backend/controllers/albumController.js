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

    let coverUrl;
    if (req.file && req.file.path) {
        coverUrl = req.file.path;
    } else if (req.body.coverImage) {
        coverUrl = req.body.coverImage;
    }

    if (!title || !description) {
        return res.status(400).json({ message: 'Please include a title and description.' });
    }

    try {
        const album = await Album.create({
            title,
            description,
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

// @desc    Upload photo to album
const uploadPhoto = async (req, res) => {
    const file = req.file; 
    const { albumId, alt } = req.body; 

    if (!file) return res.status(400).json({ message: 'No image file uploaded.' });
    if (!albumId) return res.status(400).json({ message: 'Album ID is required.' });

    try {
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found.' });
        }

        const publicUrl = file.path; 
        album.images.push({ src: publicUrl, alt: alt || file.originalname });
        
        // If album has default cover image or no cover image, use this first photo!
        if (!album.coverImage || album.coverImage.includes('placehold.co')) {
            album.coverImage = publicUrl;
        }

        await album.save();
        res.status(200).json({ message: 'Photo saved.', url: publicUrl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete photo from album
const deletePhoto = async (req, res) => {
    const { albumId, photoId } = req.params;
    try {
        const album = await Album.findById(albumId);
        if (!album) return res.status(404).json({ message: 'Album not found' });

        album.images = album.images.filter(img => img._id.toString() !== photoId);
        await album.save();
        res.status(200).json({ message: 'Photo removed', album });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    getAlbums, 
    getAlbumById, 
    createAlbum, 
    deleteAlbum, 
    uploadPhoto,
    deletePhoto,
};
