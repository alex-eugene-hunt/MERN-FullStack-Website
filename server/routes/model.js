const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Initialize the model
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    const modelPath = path.join(__dirname, 'fine_tuned_model');
    
    // Check if model directory exists
    try {
      await fs.access(modelPath);
    } catch (error) {
      throw new Error(`Model directory not found at ${modelPath}`);
    }

    // Custom logic to load your model
    // This will depend on what format your model is in
    // For example, if it's a JSON file:
    try {
      const modelData = await fs.readFile(path.join(modelPath, 'model.json'), 'utf8');
      model = JSON.parse(modelData);
      console.log('Model loaded successfully');
    } catch (error) {
      throw new Error(`Error reading model file: ${error.message}`);
    }
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

    // Process the question using your model
    // This will depend on your model's interface
    // For now, returning a placeholder response
    const response = {
      generated_text: "This is a placeholder response. Replace with actual model inference."
    };

    res.json({ answer: response.generated_text });
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
