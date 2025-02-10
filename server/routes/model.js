const express = require('express');
const router = express.Router();
const { pipeline, AutoTokenizer, AutoModelForCausalLM } = require('@xenova/transformers');
const path = require('path');

// Initialize the model
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    const modelPath = path.resolve(__dirname, 'fine_tuned_model');
    console.log('Loading model from:', modelPath);
    
    // Load the model using the local path
    // Note: @xenova/transformers handles device mapping automatically
    model = await pipeline('text-generation', modelPath, {
      quantized: false,
      local: true,
      model: {
        torch_dtype: 'float16'  // Match Python's torch.float16
      }
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
      temperature: 0.2,          // Matching Python's temperature
      top_p: 0.85,              // Matching Python's top_p
      repetition_penalty: 1.2,   // Matching Python's repetition_penalty
      return_full_text: false    // Matching Python's return_full_text
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
