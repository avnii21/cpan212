import express from 'express';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/summarize', async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Missing description' });
  }

  try {
    const prompt = `
You are a helpful assistant that summarizes event descriptions and creates a timeline of steps leading up to the event. 

Description:
${description}

Respond with JSON containing:
- summary: a short summary sentence
- timeline: an array of 3-5 step-by-step actionable tasks counting down to the event date

Example response format:
{
  "summary": "...",
  "timeline": ["Step 1...", "Step 2...", "..."]
}

Now provide the JSON response:
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content.trim();

    // Extract JSON part from the AI's text response
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);

    const responseData = JSON.parse(jsonString);

    res.json(responseData);
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'AI processing failed' });
  }
});

export default router;
