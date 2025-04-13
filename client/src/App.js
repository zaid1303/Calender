// client/src/App.js
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { FullCalendarComponent } from '@fullcalendar/react';
import store from './redux/store';
import Calendar from './components/Calendar/Calendar';
import Sidebar from './components/Sidebar/Sidebar';
import EventModal from './components/EventModal/EventModal';
import './App.css';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [calendarApi, setCalendarApi] = useState(null);

  const handleTaskDrag = (task) => {
    if (!calendarApi) return;

    // Open the modal with the task data pre-populated
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    const goal = store.getState().goals.goals.find(g => g._id === task.goalId);

    setEventData({
      title: task.name,
      category: 'work', // Default category
      start: startDate,
      end: endDate,
      color: goal ? goal.color : '#3788d8',
      taskId: task._id
    });
    
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEventData(null);
  };

  const setCalendarReference = (api) => {
    setCalendarApi(api);
  };

  return (
    <Provider store={store}>
      <div className="app">
        <Sidebar onTaskDrag={handleTaskDrag} />
        <Calendar setCalendarRef={setCalendarReference} />
        
        {modalOpen && (
          <EventModal
            isOpen={modalOpen}
            onClose={closeModal}
            event={eventData}
            type="create"
          />
        )}
      </div>
    </Provider>
  );
};

export default App;