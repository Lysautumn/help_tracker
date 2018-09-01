import { combineReducers } from 'redux';
import { SELECT_ACTIONS } from '../actions/selectActions';

const selectList = (state = null, action) => {
  switch (action.type) {
    case SELECT_ACTIONS.SET_SELECTS:
      let returnedSelects = {
        selects: action.select
      }
      return returnedSelects || state;
    default:
      return state;
  }
};

const isLoading = (state = false, action) => {
  switch (action.type) {
    case SELECT_ACTIONS.REQUEST_START:
      return true;
    case SELECT_ACTIONS.REQUEST_END:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  selectList,
  isLoading,
});
