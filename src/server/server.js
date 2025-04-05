
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
require('dotenv').config();

// Import route files (we'll create these next)
const donationRoutes = require('./routes/donation');
const bloodRequestRoutes = require('./routes/bloodRequest');
const authRoutes = require('./routes/auth');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Blood Donation API is running');
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
