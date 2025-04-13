import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullCalendar from '@fullcalendar/react'; // ✅ fixed import
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchEvents, updateEvent } from '../../redux/actions/eventActions';
import EventModal from '../EventModal/EventModal';
import './Calendar.css';


const Calendar = ({ setCalendarRef }) => {
  const dispatch = useDispatch();
  const { events } = useSelector(state => state.events);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const calendarRef = useRef(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    if (calendarRef.current) {
      setCalendarRef(calendarRef.current.getApi());
    }
  }, [calendarRef, setCalendarRef]);

  const handleDateClick = (info) => {
    const startDate = info.date;
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);

    setCurrentEvent({
      title: '',
      category: 'work',
      start: startDate,
      end: endDate
    });
    setModalType('create');
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const { event } = info;
    setCurrentEvent({
      id: event.id,
      title: event.title,
      category: event.extendedProps.category || 'work',
      start: event.start,
      end: event.end,
      color: event.backgroundColor,
      taskId: event.extendedProps.taskId
    });
    setModalType('edit');
    setModalOpen(true);
  };

  const handleEventDrop = (info) => {
    const { event } = info;
    dispatch(updateEvent(event.id, {
      title: event.title,
      start: event.start,
      end: event.end,
      category: event.extendedProps.category,
      color: event.backgroundColor,
      taskId: event.extendedProps.taskId
    }));
  };

  const handleEventResize = (info) => {
    const { event } = info;
    dispatch(updateEvent(event.id, {
      title: event.title,
      start: event.start,
      end: event.end,
      category: event.extendedProps.category,
      color: event.backgroundColor,
      taskId: event.extendedProps.taskId
    }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentEvent(null);
  };

  const formatEvents = () => {
    return events.map(event => ({
      id: event._id,
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      backgroundColor: event.color,
      extendedProps: {
        category: event.category,
        taskId: event.taskId
      }
    }));
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={formatEvents()}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        height="auto"
        droppable={true}
      />
      
      {modalOpen && (
        <EventModal
          isOpen={modalOpen}
          onClose={closeModal}
          event={currentEvent}
          type={modalType}
        />
      )}
    </div>
  );
};

export default Calendar;