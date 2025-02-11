import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper function to wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make model request with retries
async function queryModel(messages) {
  const maxRetries = 5;
  const retryDelay = 3000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log('Making request to model...');
      console.log('Messages:', JSON.stringify(messages, null, 2));
      
      const response = await fetch('https://api-inference.huggingface.co/models/alexeugenehunt/autotrainAlexAI-openai-gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`
        },
        body: JSON.stringify({ inputs: messages })
      });

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      if (!responseText) {
        console.log('Empty response, retrying...');
        await sleep(retryDelay);
        continue;
      }

      const data = JSON.parse(responseText);

      if (data.error) {
        if (data.error.toLowerCase().includes('loading')) {
          console.log('Model is loading, waiting before retry...');
          await sleep(retryDelay);
          continue;
        }
        throw new Error(data.error);
      }

      if (!Array.isArray(data) || data.length === 0) {
        console.log('Unexpected response format, retrying...');
        await sleep(retryDelay);
        continue;
      }

      return data;
    } catch (error) {
      console.error('Error querying model:', error);
      if (attempt === maxRetries - 1) {
        throw error;
      }
      await sleep(retryDelay);
    }
  }

  throw new Error('Max retries reached');
}

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    console.log('Received question:', question);

    // Format messages for the model
    const messages = [
      { role: "user", content: question }
    ];

    // Query model
    const data = await queryModel(messages);

    // Extract the generated text
    const generatedText = data[0]?.generated_text?.trim() || '';
    if (!generatedText) {
      console.error('No generated text in response:', data[0]);
      return res.status(500).json({ error: 'No response generated from model' });
    }

    // Clean up the response text
    let finalResponse = generatedText;
    
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
