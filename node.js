const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const GEMINI_API_KEY = 'AIzaSyBjptcdGVz9N0Ijtudh9QnWVp0XzyWHUug'; 
const AI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY;

app.post('/generate-motivation', async (req, res) => {
  const { mood } = req.body;

  try {
    const response = await axios.post(AI_API_URL, {
      contents: [{ parts: [{ text: `Give me a motivational message for someone who is feeling ${mood}.` }] }]
    });

    const message = response.data.candidates[0].content.parts[0].text;
    res.json({ message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate message' });
  }
});

app.listen(3000, () => {
  console.log('Server running');
});
