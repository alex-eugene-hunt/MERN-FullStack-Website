import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import modelRouter from './routes/model.js';
import highScoresRouter from './routes/highScores.js';
import sendEmailRouter from './routes/sendEmail.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use('/api/model', modelRouter);
app.use('/api/highscores', highScoresRouter);
app.use('/api/send-email', sendEmailRouter);

// Basic health check route
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
