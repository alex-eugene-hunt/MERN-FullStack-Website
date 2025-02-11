import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

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
    console.log('Received question:', question);

    // Format the prompt
    const prompt = `Q: ${question}\nA:`;
    console.log('Formatted prompt:', prompt);

    // Log the request configuration
    console.log('Making request to Hugging Face API with token:', process.env.HF_ACCESS_TOKEN ? 'Token present' : 'Token missing');

    // Make a POST request to the Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/alexeugenehunt/autotrain-AlexAI-llama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 256,
          temperature: 0.7,
          top_p: 0.95,
          top_k: 50,
          repetition_penalty: 1.1,
          do_sample: true,
          return_full_text: false
        }
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      throw new Error('Invalid JSON response from the model');
    }

    if (!response.ok) {
      console.error('Error response from API:', data);
      throw new Error(data.error || 'Failed to get model response');
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response format from the model');
    }

    if (!data[0].generated_text) {
      console.error('No generated text in response:', data[0]);
      throw new Error('No generated text in model response');
    }

    // Clean up the response text
    let generatedText = data[0].generated_text.trim();
    console.log('Generated text before cleanup:', generatedText);

    // Remove the question from the response if it's included
    if (generatedText.startsWith(prompt)) {
      generatedText = generatedText.slice(prompt.length).trim();
    }

    console.log('Final response text:', generatedText);
    res.json({ response: generatedText });
  } catch (error) {
    console.error('Error in /ask endpoint:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

export default router;
