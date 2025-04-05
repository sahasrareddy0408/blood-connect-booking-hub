
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection string (you'll need to set this as an environment variable)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodbank';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
