const express = require('express');
const router = express.Router();
const { pipeline } = require('transformers');
const path = require('path');

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
    
    if (!model) {
      return res.status(503).json({ error: 'Model is still loading. Please try again in a moment.' });
    }

    // Format the prompt
    const prompt = `Q: ${question}\nA:`;

    const response = await model(prompt, {
      max_new_tokens: 256,
      do_sample: true,
      temperature: 0.7,
      top_p: 0.95,
      top_k: 50,
      repetition_penalty: 1.1,
      return_full_text: false
    });

    res.json({ response: response[0].generated_text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
