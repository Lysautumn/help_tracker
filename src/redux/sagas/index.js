import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import eventSaga from './eventSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    eventSaga(),
    // watchIncrementAsync()
  ]);
}
