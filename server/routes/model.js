const express = require('express');
const router = express.Router();
const { pipeline, AutoTokenizer, AutoModelForCausalLM } = require('@xenova/transformers');
const path = require('path');

// Initialize model and tokenizer
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    const MODEL_ID = 'alexeugenehunt/autotrain-AlexAI-llama';
    console.log('Loading model from Hugging Face:', MODEL_ID);

    // Load tokenizer and model from Hugging Face
    const tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID);
    const baseModel = await AutoModelForCausalLM.from_pretrained(MODEL_ID, {
      torch_dtype: 'float16'
    });

    // Create the pipeline with the loaded model and tokenizer
    model = await pipeline('text-generation', {
      model: baseModel,
      tokenizer: tokenizer
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
    
    // Check if model is loaded
    if (!model) {
      return res.status(503).json({ error: 'Model is still loading. Please try again in a moment.' });
    }

    // Format the prompt exactly like in the Python code
    const prompt = `Q: ${question} A:`;

    // Generate response using the model with matching parameters
    const response = await model(prompt, {
      max_length: 150,
      do_sample: true,
      temperature: 0.2,          // Lower temperature for more deterministic output
      top_p: 0.85,
      repetition_penalty: 1.2,   // Helps prevent loops
      truncation: true,
      return_full_text: false
    });

    // Strip whitespace from the response, matching Python's behavior
    const answer = response[0].generated_text.trim();
    res.json({ answer });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
