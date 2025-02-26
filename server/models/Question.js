import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Index for efficient querying by date
questionSchema.index({ date: -1 });

export default mongoose.model('Question', questionSchema);
