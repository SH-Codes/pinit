import mongoose from 'mongoose'; // Ensure mongoose is imported

const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
    minlength: 10,
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
  },
  email: {
    type: String,
    maxlength: 64,
    match: [/.+@.+\..+/, 'Please provide a valid email address'],
    default: null,
  },
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true,
  },
  rsvpStatus: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Declined'], 
    default: 'Pending',
  },
  rsvpDate: {
    type: Date,
    default: Date.now, // Automatically set to the time of RSVP
  },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt`

const Attendee = mongoose.model('Attendee', attendeeSchema);

// Export the model
export default Attendee;