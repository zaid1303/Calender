const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const goal = new Goal({
    name: req.body.name,
    color: req.body.color
  });

  try {
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
