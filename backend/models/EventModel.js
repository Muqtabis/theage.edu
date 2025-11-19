const mongoose = require('mongoose');

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the event'],
    },
    location: {
      type: String,
      default: 'School Premises',
    },
    // The date the event takes place, used for expiry logic
    eventDate: { 
        type: Date, // CRITICAL: Store as a native Date object
        required: [true, 'Please specify the date and time of the event'],
    },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/600x400/fef3c7/92400e?text=Upcoming+Event',
    },
    // Timestamp for when the article was created (for sorting upcoming events)
    timestamp: {
      type: Number, 
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', EventSchema);