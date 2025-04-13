import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import goalReducer from './goalReducer';

export default combineReducers({
  events: eventReducer,
  goals: goalReducer
});