import { FETCH_EVENTS, ADD_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../types';

const initialState = {
  events: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload
      };
    case ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload]
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map(event => 
          event._id === action.payload._id ? action.payload : event
        )
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter(event => event._id !== action.payload)
      };
    default:
      return state;
  }
}