import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import highScoresRouter from './routes/highScores.js';
import sendEmailRouter from './routes/sendEmail.js';
import modelRouter from './routes/model.js';
import HighScore from './models/HighScore.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as the view engine and specify the views folder
app.set('view engine', 'ejs');
app.set('views', './views'); // Make sure your admin.ejs will be in the ./views folder

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Routes
app.use('/api/highscores', highScoresRouter);
app.use('/api/send-email', sendEmailRouter);
app.use('/api/model', modelRouter);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
