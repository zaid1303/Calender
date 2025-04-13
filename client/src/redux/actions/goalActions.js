import axios from 'axios';
import { FETCH_GOALS, FETCH_TASKS, SET_SELECTED_GOAL } from '../types';

const API_URL = 'http://localhost:5000/api';

export const fetchGoals = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/goals`);
    dispatch({
      type: FETCH_GOALS,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching goals:', err);
  }
};

export const fetchTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/tasks`);
    dispatch({
      type: FETCH_TASKS,
      payload: res.data
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
};

export const fetchTasksByGoal = (goalId) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/tasks/goal/${goalId}`);
    dispatch({
      type: FETCH_TASKS,
      payload: res.data
    });
    dispatch({
      type: SET_SELECTED_GOAL,
      payload: goalId
    });
  } catch (err) {
    console.error('Error fetching tasks by goal:', err);
  }
};
