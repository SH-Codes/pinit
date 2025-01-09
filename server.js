import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db.js';
import User from './models/users.js';
import Event from './models/events.js';
import Attendee from './models/attendees.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'; 

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // To parse JSON data
app.use(cookieParser()); // To parse cookies

// Connect to MongoDB
connectDB();

// Test Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Signup API
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    // Send response with the token and user details
    res.status(201).json({
      message: 'Signup successful!',
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });

  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Signin API
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a new JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in the cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    // Send response with the token and user details
    res.json({
      message: 'Signin successful!',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Error during signin:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware to protect routes (only accessible with a valid token)
const protect = (req, res, next) => {
  const token = req.cookies.token; // Get token from the cookie

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user ID to the request object
    req.user = decoded.userId;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Handles Events creation (protected route)
app.post('/events', protect, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user, // Store the userId in the event
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Handles RSVP's for Attendees (protected route)
app.post('/attendees', protect, async (req, res) => {
  try {
    const attendee = new Attendee({
      ...req.body,
      userId: req.user, // Store the userId in the attendee
    });
    await attendee.save();
    res.status(201).json(attendee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Protected route (Profile)
app.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Starts Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
