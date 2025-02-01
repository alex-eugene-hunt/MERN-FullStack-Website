const mongoose = require('mongoose');

const highScoreSchema = new mongoose.Schema({
    playerName: {
        type: String,
        required: true,
        trim: true
    },
    score: {
        type: Number,
        required: true
    },
    game: {
        type: String,
        required: true,
        default: 'Asteroids'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Index for efficient querying of high scores
highScoreSchema.index({ game: 1, score: -1 });

module.exports = mongoose.model('HighScore', highScoreSchema);
