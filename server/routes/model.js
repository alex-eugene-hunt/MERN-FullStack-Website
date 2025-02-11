const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Initialize model and tokenizer
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    const MODEL_ID = 'alexeugenehunt/autotrain-AlexAI-llama';
    console.log('Loading model from Hugging Face:', MODEL_ID);

    // Use the Hugging Face transformers library to load the model and tokenizer
    model = await pipeline('text-generation', MODEL_ID, {
      device: 0, // Use GPU if available
      torch_dtype: 'auto',
      use_auth_token: process.env.HUGGINGFACE_TOKEN // Ensure you have a token set in your environment variables
    });

    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
    throw error;
  }
}

// Load the model when the server starts
loadModel().catch(console.error);

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;

    // Format the prompt
    const prompt = `Q: ${question}\nA:`;

    // Make a POST request to the Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/alexeugenehunt/autotrain-AlexAI-llama', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: prompt })
    });

    // Parse the response
    const data = await response.json();

    if (response.ok) {
      res.json({ response: data[0].generated_text });
    } else {
      res.status(500).json({ error: data.error || 'Failed to generate response' });
    }
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
