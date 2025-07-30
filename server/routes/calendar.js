const express = require('express');
const router = express.Router();

// In-memory events object: { '2025-07-24': ['Event 1', 'Event 2'], ... }
const events = {};

router.get('/', (req, res) => {
  res.json(events);
});

router.post('/', (req, res) => {
  const { date, event } = req.body;

  if (!date || !event) {
    return res.status(400).json({ error: 'Date and event required' });
  }

  if (!events[date]) {
    events[date] = [];
  }

  events[date].push(event);
  res.status(200).json(events);
});

module.exports = router;
