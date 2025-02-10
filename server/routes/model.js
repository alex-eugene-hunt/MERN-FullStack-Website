const express = require('express');
const router = express.Router();

// Load your fine-tuned model
const { pipeline } = require('transformers');
const model = pipeline('text-generation', './routes/fine_tuned_model');

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    // Use your model to generate a response
    const response = await model(question);
    res.json({ answer: response[0].generated_text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
