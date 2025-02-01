const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-netlify-app.netlify.app'] // Replace with your Netlify domain
    : 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use('/api/highscores', require('./routes/highScores'));

// Basic route to test
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

const PORT = process.env.PORT || 5000;

// MongoDB connection options
const mongooseOptions = {
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    if (error.name === 'MongooseServerSelectionError') {
      console.error('Please check if your IP is whitelisted in MongoDB Atlas');
      console.error('Current environment:', process.env.NODE_ENV);
    }
  });