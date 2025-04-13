import { FETCH_GOALS, FETCH_TASKS, SET_SELECTED_GOAL } from '../types';

const initialState = {
  goals: [],
  tasks: [],
  selectedGoal: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_GOALS:
      return {
        ...state,
        goals: action.payload
      };
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case SET_SELECTED_GOAL:
      return {
        ...state,
        selectedGoal: action.payload
      };
    default:
      return state;
  }
}