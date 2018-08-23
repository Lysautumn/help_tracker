import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import event from './eventReducer';
import select from './selectReducer';

const store = combineReducers({
  user,
  login,
  event,
  select,
});

export default store;
