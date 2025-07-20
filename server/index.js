import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Dummy data for tasks, events, and members
const tasks = [
  { id: 1, title: 'Finish homework', due: '2025-07-18', status: 'Pending', type: 'School' },
  { id: 2, title: 'Team meeting at 4PM', due: '2025-07-17', status: 'Completed', type: 'Work' },
  { id: 3, title: 'Buy groceries', due: '2025-07-18', status: 'Pending', type: 'Personal' },
  { id: 4, title: 'Prepare presentation', due: '2025-07-19', status: 'Pending', type: 'Work' },
  { id: 5, title: 'Call John', due: '2025-07-20', status: 'Pending', type: 'Social' }
];
const events = [
  { id: 1, title: 'Project Demo', type: 'Work', date: '2025-07-16' },
  { id: 2, title: 'Yoga Class', type: 'Personal', date: '2025-07-17' },
  { id: 3, title: 'Birthday Party', type: 'Social', date: '2025-07-18' }
];
const members = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' },
  { id: 5, name: 'Ethan' }
];

app.get('/api/tasks', (req, res) => res.json(tasks));
app.get('/api/events', (req, res) => res.json(events));
app.get('/api/members', (req, res) => res.json(members));

// Endpoint to interact with OpenAI (e.g., text completion)
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));
app.post('/api/openai', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'No prompt provided' });
  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 50
    });
    res.json({ result: completion.data.choices[0].text });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
