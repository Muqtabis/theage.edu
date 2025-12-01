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
    eventDate: { 
        type: Date, 
        required: [true, 'Please specify the date and time of the event'],
    },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/600x400/fef3c7/92400e?text=Upcoming+Event',
    },
    timestamp: {
      type: Number, 
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', EventSchema);