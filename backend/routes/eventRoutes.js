const express = require('express');
const router = express.Router();
const { getEvents, createEvent } = require('../controllers/eventController');

// Import Cloudinary config
const {upload}= require('../config/storage');

router.route('/')
    .get(getEvents) 
    // Add middleware to handle file upload
    .post(upload.single('image'), createEvent);

module.exports = router;