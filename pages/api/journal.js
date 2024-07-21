import axios from 'axios';
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { prompt, entry, wordsPerMinute } = req.body;

     console.log(req.body)

    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO journals (prompt, entry, words_per_minute) VALUES ($1, $2, $3) RETURNING *',
        [prompt, entry, wordsPerMinute]
      );
      client.release();

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Error inserting data' });
    }
  } else if (req.method === 'GET') {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=AIzaSyDXLHv3rOBCtwMD7V3Ft4lv-z8rAIt3bs4`,
        {
          prompt: { text: "I want to write a journal like Marcus Aurelius or Viktor Frankl. Give me a prompt for life, wealth creation, or something else. I just need one question at a time to journal from." },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedPrompt = response.data.candidates[0].output;
      res.status(200).json({ prompt: generatedPrompt });
    } catch (error) {
      console.error('Error generating prompt:', error);
      res.status(500).json({ error: 'Error generating prompt' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
