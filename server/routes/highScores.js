const express = require('express');
const router = express.Router();
const HighScore = require('../models/HighScore');

// Get top 3 scores
router.get('/:game', async (req, res) => {
    try {
        const scores = await HighScore.find({ game: req.params.game })
            .sort({ score: -1 })
            .limit(3);
        res.json(scores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Submit new score
router.post('/', async (req, res) => {
    const highScore = new HighScore({
        playerName: req.body.playerName,
        score: req.body.score,
        game: req.body.game
    });

    try {
        const newScore = await highScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
