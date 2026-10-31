const express = require('express');
const router = express.Router();
const { getEvents, createEvent, deleteEvent, updateEvent } = require('../controllers/eventController');
const { upload } = require('../config/storage');

router.route('/')
    .get(getEvents)
    .post(upload.single('image'), createEvent);

router.route('/:id')
    .delete(deleteEvent)
    .put(upload.single('image'), updateEvent);

module.exports = router;
