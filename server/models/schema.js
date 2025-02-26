import mongoose from 'mongoose';

// Schema for AlexAI questions
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Schema for Asteroids game scores
const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const Question = mongoose.model('Question', questionSchema);
export const Score = mongoose.model('Score', scoreSchema);
