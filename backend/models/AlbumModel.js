const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    src: { type: String, required: true }, // Cloudinary URL
    alt: { type: String, default: 'Gallery Photo' }
});

const AlbumSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title for the album'],
        },
        description: {
            type: String,
            required: [true, 'Please add a short description'],
        },
        coverImage: {
            type: String,
            default: 'https://placehold.co/600x400/b9e5fd/0c457e?text=No+Cover',
        },
        images: {
            type: [ImageSchema], // Array of image objects
            default: [],
        },
        timestamp: {
            type: Number,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Album', AlbumSchema);