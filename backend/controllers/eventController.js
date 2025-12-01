const Event = require('../models/EventModel');

// @desc    Get all current and future events
// @route   GET /api/events
const getEvents = async (req, res) => {
    try {
        const now = new Date();
        // Fetch only events whose eventDate is NOW or in the FUTURE
        const events = await Event.find({ eventDate: { $gte: now } })
                                  .sort({ eventDate: 1 }); 
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new event
// @route   POST /api/events
const createEvent = async (req, res) => {
    const { title, location, eventDate } = req.body;

    // 1. Get Cloudinary URL if file exists
    let imageUrl;
    if (req.file && req.file.path) {
        imageUrl = req.file.path;
    }

    if (!title || !eventDate) {
        return res.status(400).json({ message: 'Please include a title and event date.' });
    }

    try {
        const event = await Event.create({
            title,
            location,
            eventDate: new Date(eventDate),
            // Use uploaded URL or let Mongoose use the default
            imageUrl: imageUrl, 
            timestamp: Date.now(),
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
};