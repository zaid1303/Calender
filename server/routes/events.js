const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    category: req.body.category,
    start: req.body.start,
    end: req.body.end,
    color: req.body.color || '#3788d8',
    taskId: req.body.taskId || null
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (req.body.title) event.title = req.body.title;
    if (req.body.category) event.category = req.body.category;
    if (req.body.start) event.start = req.body.start;
    if (req.body.end) event.end = req.body.end;
    if (req.body.color) event.color = req.body.color;
    if (req.body.taskId) event.taskId = req.body.taskId;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    await event.remove();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;