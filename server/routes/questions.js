import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().sort({ date: -1 });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Save a new question
router.post('/', async (req, res) => {
    const question = new Question({
        question: req.body.question,
        answer: req.body.answer
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
