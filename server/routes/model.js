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
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    console.log('Received question:', question);

    // Format the prompt
    const prompt = `Q: ${question}\nA:`;
    console.log('Formatted prompt:', prompt);

    const requestBody = {
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
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    // Make a POST request to the Hugging Face Inference API
    const response = await fetch('https://api-inference.huggingface.co/models/alexeugenehunt/autotrain-AlexAI-llama', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response text:', responseText);

    // If response is empty, return an error
    if (!responseText) {
      console.error('Empty response from API');
      return res.status(500).json({ error: 'Empty response from model' });
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      return res.status(500).json({ error: 'Invalid response format from model' });
    }

    // Check if the response is an error message
    if (data.error) {
      console.error('API returned error:', data.error);
      return res.status(500).json({ error: data.error });
    }

    // Validate the response format
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Unexpected response format:', data);
      return res.status(500).json({ error: 'Invalid response format from model' });
    }

    // Extract and clean up the generated text
    const generatedText = data[0].generated_text?.trim() || '';
    if (!generatedText) {
      console.error('No generated text in response:', data[0]);
      return res.status(500).json({ error: 'No response generated from model' });
    }

    // Remove the prompt from the beginning if it's included
    const finalResponse = generatedText.startsWith(prompt)
      ? generatedText.slice(prompt.length).trim()
      : generatedText;

    console.log('Final response:', finalResponse);
    return res.json({ response: finalResponse });

  } catch (error) {
    console.error('Error in /ask endpoint:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

export default router;
