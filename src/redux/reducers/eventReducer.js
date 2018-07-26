import { combineReducers } from 'redux';
import { EVENT_ACTIONS } from '../actions/eventActions';

const eventList = (state = null, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.SET_EVENT:
      let returnedEvent = {
        eventName: action.event
      }
      return returnedEvent || state;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.REQUEST_START:
      return true;
    case EVENT_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  eventList,
  isLoading,
});
