import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Helper function to make request to Hugging Face Space
async function querySpace(message) {
  try {
    console.log('Making request to Space API...');
    
    // Use the correct Gradio API endpoint
    const spaceUrl = process.env.HF_SPACE_URL || 'https://alexeugenehunt-alexai-host.hf.space';
    const response = await fetch(`${spaceUrl}/api/predict`, {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [message],
        event_data: null,
        fn_index: 0  
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Space API error details:', errorText);
      throw new Error(`Space API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Space API response:', data);

    // Handle Gradio response format
    if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error('Invalid response format from Space API');
    }

    return data.data[0];  
  } catch (error) {
    console.error('Error querying Space:', error);
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

    // Query Space API
    const response = await querySpace(question);

    // Clean up the response text if needed
    let finalResponse = response.trim();

    console.log('Final response:', finalResponse);
    return res.json({ response: finalResponse });

  } catch (error) {
    console.error('Error in /ask endpoint:', error);
    return res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

export default router;
