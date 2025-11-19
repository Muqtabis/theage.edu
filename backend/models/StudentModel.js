const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the student\'s full name'],
    },
    grade: {
      type: Number,
      required: [true, 'Please add the student\'s grade level'],
    },
    admissionId: {
      type: String,
      unique: true,
      required: true,
    },
    parentEmail: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['Active', 'Graduated', 'Alumni'],
        default: 'Active',
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Student', StudentSchema);