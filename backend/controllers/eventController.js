const Event = require('../models/EventModel');

// @desc    Get all current and future events (or all events if query all=true)
// @route   GET /api/events
const getEvents = async (req, res) => {
    try {
        let query = {};
        if (req.query.all !== 'true') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            query = { eventDate: { $gte: today } };
        }
        const events = await Event.find(query).sort({ eventDate: 1 });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new event
// @route   POST /api/events
const createEvent = async (req, res) => {
    const { title, location, eventDate } = req.body;

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
            location: location || 'School Premises',
            eventDate: new Date(eventDate),
            imageUrl: imageUrl || 'https://placehold.co/600x400/fef3c7/92400e?text=School+Event', 
            timestamp: Date.now(),
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
const updateEvent = async (req, res) => {
    try {
        const { title, location, eventDate } = req.body;
        const updateData = {};
        if (title) updateData.title = title;
        if (location) updateData.location = location;
        if (eventDate) updateData.eventDate = new Date(eventDate);
        if (req.file && req.file.path) updateData.imageUrl = req.file.path;

        const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    createEvent,
    deleteEvent,
    updateEvent,
};
