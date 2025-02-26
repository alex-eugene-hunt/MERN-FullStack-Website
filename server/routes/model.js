import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { Question, Score } from '../models/schema.js';

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

    // Format the prompt for GPT2
    const prompt = `Human: ${question}\nAssistant:`;
    console.log('Formatted prompt:', prompt);

    const requestBody = {
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,     // Reduced for faster responses
        temperature: 0.7,        // Controls randomness (0.7 is a good balance)
        top_p: 0.9,             // Nucleus sampling parameter
        do_sample: true,        // Enable sampling
        return_full_text: false  // Only return the generated text
      }
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    // Make a POST request to the GPT2 model
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
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
      
      // Check for authentication errors
      if (data.error.includes('Please log in') || data.error.includes('access token')) {
        return res.status(401).json({ 
          error: 'Server configuration error: Missing or invalid Hugging Face API token. Please check server configuration.'
        });
      }
      
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

    // Remove any incomplete sentences at the end
    const sentences = finalResponse.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length > 0) {
      finalResponse = sentences.join(' ').trim();
    }

    // Save the question and answer to the database
    const questionRecord = new Question({
      question: question,
      answer: finalResponse
    });
    await questionRecord.save();

    console.log('Final response:', finalResponse);
    return res.json({ response: finalResponse });

  } catch (error) {
    console.error('Error in /ask endpoint:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

// Route to get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find().sort({ date: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to save game score
router.post('/score', async (req, res) => {
  try {
    const { name, score } = req.body;
    if (!name || score === undefined) {
      return res.status(400).json({ error: 'Name and score are required' });
    }

    const scoreRecord = new Score({
      name,
      score
    });
    await scoreRecord.save();
    res.json(scoreRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all scores
router.get('/scores', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
