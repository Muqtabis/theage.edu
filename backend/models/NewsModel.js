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
      // Default image if upload fails or is skipped
      default: 'https://placehold.co/600x400/e0f1fe/08539c?text=Default+News',
    },
    date: {
      type: String, 
      required: true,
    },
    timestamp: {
      type: Number, 
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('News', NewsSchema);