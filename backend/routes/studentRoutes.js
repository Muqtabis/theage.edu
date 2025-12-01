const express = require('express');
const router = express.Router();
const { getStudents, createStudent, deleteStudent } = require('../controllers/studentController');

// 1. Import the Cloudinary upload config
const {upload} = require('../config/storage');

router.route('/')
    .get(getStudents)
    // 2. Add 'upload.single' middleware before the controller
    // IMPORTANT: Ensure your frontend form sends the file with the name 'image'
    .post(upload.single('image'), createStudent);

router.route('/:id').delete(deleteStudent);

module.exports = router;