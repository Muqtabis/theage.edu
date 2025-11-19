const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add the teacher\'s name'],
    },
    subject: {
      type: String,
      required: [true, 'Please add the subject'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    qualification: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Teacher', TeacherSchema);