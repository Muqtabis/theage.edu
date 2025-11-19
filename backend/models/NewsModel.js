const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the news article'],
    },
    content: {
      type: String,
      required: [true, 'Please add content for the news article'],
    },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/600x400/e0f1fe/08539c?text=Default+News',
    },
    date: {
      type: String, // Storing the formatted date string (e.g., NOV 10, 2025)
      required: true,
    },
    timestamp: {
      type: Number, // Storing the numerical timestamp for sorting (Date.now())
      required: true,
      default: Date.now(),
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model('News', NewsSchema);