import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import highScoresRouter from './routes/highScores.js';
import sendEmailRouter from './routes/sendEmail.js';
import modelRouter from './routes/model.js';
import questionsRouter from './routes/questions.js';
import HighScore from './models/HighScore.js';

dotenv.config();

const app = express();

// Set EJS as the view engine and specify the views folder
app.set('view engine', 'ejs');
app.set('views', './views'); // Make sure your admin.ejs will be in the ./views folder

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://alex-eugene-hunt.rocks'] // Replace with your Netlify domain
    : 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use('/api/highscores', highScoresRouter);
app.use('/api/send-email', sendEmailRouter);
app.use('/api/model', modelRouter);
app.use('/api/questions', questionsRouter);

// Basic route to test
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Admin route to view database stats / table of all inputted scores
app.get('/admin', async (req, res) => {
  try {
    // Find all high scores and sort descending by score
    const scores = await HighScore.find().sort({ score: -1 }).lean();
    // Render the admin.ejs template and pass in the scores
    res.render('admin', { scores });
  } catch (error) {
    res.status(500).send("Error retrieving scores: " + error.message);
  }
});

// MongoDB connection options
const mongooseOptions = {
  retryWrites: true,
  w: 'majority',
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 5000;
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
