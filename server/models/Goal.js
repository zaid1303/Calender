const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Goal', GoalSchema);