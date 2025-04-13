import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent, updateEvent, deleteEvent } from '../../redux/actions/eventActions';
import './EventModal.css';

const categories = [
  { value: 'exercise', label: 'Exercise', color: '#3cb371' },
  { value: 'eating', label: 'Eating', color: '#ff7f50' },
  { value: 'work', label: 'Work', color: '#3788d8' },
  { value: 'relax', label: 'Relax', color: '#9370db' },
  { value: 'family', label: 'Family', color: '#ff69b4' },
  { value: 'social', label: 'Social', color: '#ffa500' }
];

const EventModal = ({ isOpen, onClose, event, type }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    category: 'work',
    start: new Date(),
    end: new Date(),
    color: '#3788d8'
  });

  useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        color: event.color || getCategoryColor(event.category)
      });
    }
  }, [event]);

  const getCategoryColor = (categoryValue) => {
    const category = categories.find(cat => cat.value === categoryValue);
    return category ? category.color : '#3788d8';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setFormData({
        ...formData,
        [name]: value,
        color: getCategoryColor(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const date = new Date(formData[name]);
    const [hours, minutes] = value.split(':');
    
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const handleDateInputChange = (e) => {
    const { name, value } = e.target;
    const newDate = new Date(value);
    const oldDate = new Date(formData[name]);
    
    newDate.setHours(oldDate.getHours());
    newDate.setMinutes(oldDate.getMinutes());
    
    setFormData({
      ...formData,
      [name]: newDate
    });
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatTimeForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (type === 'create') {
      dispatch(addEvent(formData));
    } else {
      dispatch(updateEvent(formData.id, formData));
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (type === 'edit' && formData.id) {
      dispatch(deleteEvent(formData.id));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{type === 'create' ? 'Create Event' : 'Edit Event'}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-date">Date</label>
              <input
                type="date"
                id="start-date"
                name="start"
                value={formatDateForInput(formData.start)}
                onChange={handleDateInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-time">Start Time</label>
              <input
                type="time"
                id="start-time"
                name="start"
                value={formatTimeForInput(formData.start)}
                onChange={handleDateChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="end-time">End Time</label>
              <input
                type="time"
                id="end-time"
                name="end"
                value={formatTimeForInput(formData.end)}
                onChange={handleDateChange}
                required
              />
            </div>
          </div>
          
          <div className="modal-actions">
            {type === 'edit' && (
              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button type="submit" className="save-button">
              {type === 'create' ? 'Create' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
