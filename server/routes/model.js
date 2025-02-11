import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper function to wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make model request with retries
async function queryModel(messages) {
  const maxRetries = 10;
  const minRetryDelay = 3000;
  const maxLoadingTime = 30000;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1} of ${maxRetries}...`);
      
      // Format the request to match the chat template
      const requestBody = {
        inputs: messages,
        parameters: {
          return_tensors: 'pt',
          add_generation_prompt: true,
          max_new_tokens: 150,
          temperature: 0.7,
          do_sample: true
        }
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch('https://api-inference.huggingface.co/models/alexeugenehunt/autotrainAlexAI-openai-gpt', {
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
        console.log('Empty response, retrying...');
        await sleep(minRetryDelay);
        continue;
      }

      const data = JSON.parse(responseText);

      if (data.error) {
        if (data.error.toLowerCase().includes('loading')) {
          const estimatedTime = data.estimated_time || 20;
          const waitTime = Math.min(Math.ceil(estimatedTime * 1000), maxLoadingTime);
          console.log(`Model is loading, waiting ${waitTime}ms before retry...`);
          await sleep(waitTime);
          continue;
        }
        throw new Error(data.error);
      }

      // Handle both array and single object responses
      const result = Array.isArray(data) ? data[0] : data;
      if (!result || !result.generated_text) {
        console.log('Unexpected response format, retrying...');
        await sleep(minRetryDelay);
        continue;
      }

      return result;
    } catch (error) {
      console.error('Error querying model:', error);
      if (attempt === maxRetries - 1) {
        throw error;
      }
      await sleep(minRetryDelay);
    }
  }

  throw new Error('Max retries reached while waiting for model to load. Please try again in a minute.');
}

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }
    console.log('Received question:', question);

    // Format messages following the chat template
    const messages = [
      { role: "user", content: question }
    ];

    // Query model
    const result = await queryModel(messages);

    // Extract the generated text
    const generatedText = result.generated_text?.trim() || '';
    if (!generatedText) {
      console.error('No generated text in response:', result);
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
