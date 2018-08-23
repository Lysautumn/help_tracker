import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import eventSaga from './eventSaga';
import selectSaga from './selectSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    eventSaga(),
    selectSaga(),
    // watchIncrementAsync()
  ]);
}
