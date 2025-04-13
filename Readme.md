# Calendar App with React, Redux, and MongoDB

A Google Calendar-like application that allows users to create, edit, move, and delete events. It also features a sidebar with goals and tasks that can be dragged onto the calendar.

## Features

- Interactive calendar interface with day, week, and month views
- Create, edit, move, resize, and delete events
- Event categorization with color coding (exercise, eating, work, relax, family, social)
- Sidebar with goals and tasks
- Drag tasks from the sidebar to create calendar events
- Events can be resized and moved across the calendar
- Redux for state management
- MongoDB for data persistence

## Prerequisites

- Node.js and npm
- MongoDB (local installation or MongoDB Atlas account)

## Setup

1. Clone the repository
```
git clone https://github.com/zaid1303/Calender.git
cd Calendar
```

2. Install dependencies
```
npm run install-all
```

3. Configure environment variables
```
# Create a .env file in the server directory
cd server
touch .env
```

Add the following to the .env file:
```
MONGO_URI
PORT
```

4. Seed the database with sample data
```
node seed.js
```

5. Start the application
```
cd ..
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `/client` - React frontend application
  - `/src/components` - React components
  - `/src/redux` - Redux state management
  - `/src/services` - API service calls
- `/server` - Express backend application
  - `/controllers` - API controllers
  - `/models` - MongoDB models
  - `/routes` - API routes

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Goals
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create a new goal

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/goal/:goalId` - Get tasks by goal ID
- `POST /api/tasks` - Create a new task

## Technical Implementation

- React for the frontend user interface
- Redux for state management
- React Beautiful DnD for drag and drop functionality
- FullCalendar for the calendar component
- Express.js for the backend API
- MongoDB for data storage

## Future Enhancements

- User authentication
- Recurring events
- Event notifications
- Calendar sharing
- More detailed analytics and reporting