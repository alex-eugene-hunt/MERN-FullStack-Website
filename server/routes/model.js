const express = require('express');
const router = express.Router();
const { pipeline, AutoTokenizer, AutoModelForCausalLM } = require('@xenova/transformers');
const path = require('path');

// Initialize model and tokenizer
let model = null;

// Function to load and process the model
async function loadModel() {
  try {
    // Use the base LLaMA tokenizer since your model is LLaMA-based
    const tokenizer = await AutoTokenizer.from_pretrained('meta-llama/Llama-2-7b-chat-hf', {
      quantized: true,
      cache_dir: './model_cache'
    });

    // Load your fine-tuned model
    const baseModel = await AutoModelForCausalLM.from_pretrained('alexeugenehunt/autotrain-AlexAI-llama', {
      torch_dtype: 'float16',
      cache_dir: './model_cache'
    });

    // Create the pipeline
    model = await pipeline('text-generation', {
      model: baseModel,
      tokenizer: tokenizer,
      max_new_tokens: 150,
      temperature: 0.2,
      top_p: 0.85,
      repetition_penalty: 1.2
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
      max_new_tokens: 150,
      do_sample: true,
      temperature: 0.2,
      top_p: 0.85,
      repetition_penalty: 1.2,
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
