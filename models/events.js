import mongoose from 'mongoose';

// Define the event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 32
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    maxlength: 64
  }
}, { timestamps: true }); // Adds `createdAt` and `updatedAt` fields

// Create the event model
const Event = mongoose.model('Event', eventSchema);

// Default export
export default Event;