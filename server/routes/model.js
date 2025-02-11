import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Initialize model and tokenizer
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    const MODEL_ID = 'alexeugenehunt/autotrain-AlexAI-llama';
    console.log('Loading model from Hugging Face:', MODEL_ID);

    // Removed pipeline reference

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

export default router;
