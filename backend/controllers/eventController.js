const Event = require('../models/EventModel');

// @desc    Get all current and future events (sorted by nearest date)
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const now = new Date();
        // 🚨 CRITICAL LOGIC: Fetch only events whose eventDate is NOW or in the FUTURE
        const events = await Event.find({ eventDate: { $gte: now } })
                                  .sort({ eventDate: 1 }); // Sort by nearest event date (ascending)
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
    const { title, location, eventDate, imageUrl } = req.body;

    if (!title || !eventDate) {
        res.status(400).json({ message: 'Please include a title and event date.' });
        return;
    }

    try {
        const event = await Event.create({
            title,
            location,
            eventDate: new Date(eventDate), // Convert string input to Date object
            imageUrl,
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
    // Add deleteEvent logic here later
};