const express = require('express');
const router = express.Router();
const { pipeline } = require('@xenova/transformers');
const path = require('path');

// Override the default model loading behavior to use local files
process.env.TRANSFORMERS_CACHE = path.resolve(__dirname, 'fine_tuned_model');
process.env.HF_LOCAL_MODE = '1';

// Initialize the model
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    const modelPath = path.resolve(__dirname, 'fine_tuned_model');
    console.log('Loading model from:', modelPath);
    
    // Set up model loading configuration
    const config = {
      local: true,
      cache_dir: modelPath,
      model: {
        torch_dtype: 'float16'
      },
      load_in_8bit: false,
      revision: 'local'
    };

    // Load the model using local files
    model = await pipeline('text-generation', modelPath, config);
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
      temperature: 0.2,
      top_p: 0.85,
      repetition_penalty: 1.2,
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
