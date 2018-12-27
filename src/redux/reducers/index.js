import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import event from './eventReducer';
import select from './selectReducer';
import history from './historyReducer';

const store = combineReducers({
  user,
  login,
  event,
  select,
  history,
});

export default store;
