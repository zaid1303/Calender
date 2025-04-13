// server/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Goal = require('./models/Goal');
const Task = require('./models/Task');

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  });

// Sample data for goals
const goals = [
  {
    name: 'Learn',
    color: '#3498db' // Blue
  },
  {
    name: 'Health',
    color: '#2ecc71' // Green
  },
  {
    name: 'Work',
    color: '#e74c3c' // Red
  },
  {
    name: 'Personal',
    color: '#9b59b6' // Purple
  }
];

// Sample data for tasks
const tasksDataTemplate = [
  // Learn tasks
  { name: 'AI based agents', goalIndex: 0 },
  { name: 'MLE', goalIndex: 0 },
  { name: 'DE related', goalIndex: 0 },
  { name: 'Basics', goalIndex: 0 },
  
  // Health tasks
  { name: 'Morning run', goalIndex: 1 },
  { name: 'Gym workout', goalIndex: 1 },
  { name: 'Meditation', goalIndex: 1 },
  
  // Work tasks
  { name: 'Team meeting', goalIndex: 2 },
  { name: 'Project planning', goalIndex: 2 },
  { name: 'Client call', goalIndex: 2 },
  
  // Personal tasks
  { name: 'Read book', goalIndex: 3 },
  { name: 'Family dinner', goalIndex: 3 },
  { name: 'Movie night', goalIndex: 3 }
];

// Seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await Goal.deleteMany({});
    await Task.deleteMany({});
    
    // Insert goals
    const insertedGoals = await Goal.insertMany(goals);
    console.log('Goals seeded successfully');
    
    // Map task template to actual data with goal IDs
    const tasksData = tasksDataTemplate.map(task => ({
      name: task.name,
      goalId: insertedGoals[task.goalIndex]._id
    }));
    
    // Insert tasks
    await Task.insertMany(tasksData);
    console.log('Tasks seeded successfully');
    
    // Disconnect from the database
    await mongoose.disconnect();
    console.log('Seed completed');
    process.exit(0);
    
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();