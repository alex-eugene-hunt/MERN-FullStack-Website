import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Question from '../models/Question.js';

dotenv.config();

const router = express.Router();

// Route to handle requests to the model
router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not found');
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({ 
        model: "ft:gpt-3.5-turbo-0125:personal:alex-ai:B3uSVuN6",
        messages: [
          {
            role: "system",
            content: "You are AlexAI, a digital assistant representing Alex Hunt, a Software Engineer and Data Scientist based in San Francisco. Answer questions about Alex's background, skills, and experiences."
          },
          {
            role: "user",
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    // Save the question and answer to the database
    const questionRecord = new Question({
      question: question,
      answer: answer
    });
    await questionRecord.save();

    res.json({ response: answer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred while processing your request.' });
  }
});

// Handle chat completion
router.post('/chat', async (req, res) => {
    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    inputs: req.body.message,
                    parameters: {
                        max_new_tokens: 250,
                        return_full_text: false,
                        do_sample: true,
                        temperature: 0.7,
                        top_k: 50,
                        top_p: 0.95
                    }
                })
            }
        );

        const result = await response.json();
        const answer = result[0].generated_text;

        // Save the question and answer
        const question = new Question({
            question: req.body.message,
            answer: answer
        });
        await question.save();

        res.json({ response: answer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

export default router;
