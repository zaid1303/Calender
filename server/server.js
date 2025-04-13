// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});