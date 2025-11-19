const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema(
  {
    title: { type: String, required: true }, // e.g., "Class 10 Term 1 Results"
    grade: { type: String, required: true }, // e.g., "Class 10"
    fileUrl: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', ResultSchema);