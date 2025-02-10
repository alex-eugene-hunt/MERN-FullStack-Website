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

    // Load the model's specific tokenizer configuration
    const tokenizer = await AutoTokenizer.from_pretrained(MODEL_ID, {
      local: false,
      revision: 'main',
      cache_dir: './model_cache',
      config: {
        use_fast: true
      }
    });

    // Load the model with adapter configuration
    const baseModel = await AutoModelForCausalLM.from_pretrained(MODEL_ID, {
      local: false,
      revision: 'main',
      cache_dir: './model_cache',
      load_in_8bit: true, // Use 8-bit quantization for memory efficiency
      torch_dtype: 'float16',
      device_map: 'auto'
    });

    // Create the pipeline with specific configurations from training_params.json
    model = await pipeline('text-generation', {
      model: baseModel,
      tokenizer: tokenizer,
      max_new_tokens: 256,
      temperature: 0.7,
      top_p: 0.95,
      top_k: 50,
      repetition_penalty: 1.1,
      num_return_sequences: 1,
      pad_token_id: tokenizer.pad_token_id,
      eos_token_id: tokenizer.eos_token_id
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
