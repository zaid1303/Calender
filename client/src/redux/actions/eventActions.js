import axios from 'axios';
import { FETCH_EVENTS, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchEvents = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/events`);
    dispatch({
      type: FETCH_EVENTS,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching events:', err);
  }
};

export const addEvent = (eventData) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/events`, eventData);
    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    console.error('Error adding event:', err);
  }
};

export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/events/${id}`, eventData);
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    });
    return res.data;
  } catch (err) {
    console.error('Error updating event:', err);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/events/${id}`);
    dispatch({
      type: DELETE_EVENT,
      payload: id
    });
  } catch (err) {
    console.error('Error deleting event:', err);
  }
};
