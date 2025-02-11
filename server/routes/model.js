import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

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

    // Make a POST request to your fine-tuned model
    const response = await fetch('https://api-inference.huggingface.co/models/alexeugenehunt/autotrainAlexAI-openai-gpt', {
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
