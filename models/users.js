import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 32
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 64,
    match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email validation
  },
  password: {
    type: String,
    required: true,
    maxlength: 32
  },
  image: {
    type: String,
    default: null // Optional: Use null if no image is provided
  }
}, { timestamps: true });

// Create the user model
const User = mongoose.model('User', userSchema);

// Default export
export default User;