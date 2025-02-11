import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper function to wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make model request with retries
async function queryModel(requestBody) {
  try {
    console.log('Making request to model...');
    
    // Use the pipeline API instead
    const response = await fetch('https://api-inference.huggingface.co/pipeline/text-generation/alexeugenehunt/autotrainAlexAI-openai-gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`
      },
      body: JSON.stringify(requestBody)
    });

    const responseText = await response.text();
    console.log('Raw response:', responseText);

    if (!responseText) {
      throw new Error('Empty response from API');
    }

    const data = JSON.parse(responseText);

    if (data.error) {
      throw new Error(data.error);
    }

    if (!Array.isArray(data) || data.length === 0 || !data[0].generated_text) {
      throw new Error('Invalid response format from model');
    }

    return data;
  } catch (error) {
    console.error('Error querying model:', error);
    throw error;
  }
}

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    console.log('Received question:', question);

    // Format the prompt for the fine-tuned model
    const prompt = `Human: ${question}\nAssistant:`;
    console.log('Formatted prompt:', prompt);

    const requestBody = {
      inputs: prompt,
      parameters: {
        max_new_tokens: 150,     // Increased for more complete responses
        temperature: 0.7,        // Controls randomness (0.7 is a good balance)
        top_p: 0.9,             // Nucleus sampling parameter
        do_sample: true,        // Enable sampling
        return_full_text: false  // Only return the generated text
      }
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    // Query model
    const data = await queryModel(requestBody);

    // Extract and clean up the generated text
    const generatedText = data[0].generated_text?.trim() || '';
    if (!generatedText) {
      console.error('No generated text in response:', data[0]);
      return res.status(500).json({ error: 'No response generated from model' });
    }

    // Clean up the response text
    let finalResponse = generatedText;
    
    // Remove the prompt if it's included in the response
    if (finalResponse.includes(prompt)) {
      finalResponse = finalResponse.split(prompt)[1].trim();
    }

    // Clean up any "Assistant:" prefix if present
    if (finalResponse.startsWith('Assistant:')) {
      finalResponse = finalResponse.slice('Assistant:'.length).trim();
    }

    // Remove any incomplete sentences at the end
    const sentences = finalResponse.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 0) {
      finalResponse = sentences.join(' ').trim();
    }

    console.log('Final response:', finalResponse);
    return res.json({ response: finalResponse });

  } catch (error) {
    console.error('Error in /ask endpoint:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

export default router;
