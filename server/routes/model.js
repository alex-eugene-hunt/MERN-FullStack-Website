const express = require('express');
const router = express.Router();
const { pipeline } = require('@xenova/transformers');

// Initialize the model
let model = null;

// Load the model asynchronously
async function loadModel() {
  try {
    model = await pipeline('text-generation', './routes/fine_tuned_model');
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

// Load the model when the server starts
loadModel();

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    
    // Check if model is loaded
    if (!model) {
      return res.status(503).json({ error: 'Model is still loading. Please try again in a moment.' });
    }

    // Use the model to generate a response
    const response = await model(question, {
      max_length: 100,
      temperature: 0.7,
    });

    res.json({ answer: response[0].generated_text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
