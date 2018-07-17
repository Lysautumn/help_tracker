import { takeLatest } from 'redux-saga/effects';
import { EVENT_ACTIONS } from '../actions/eventActions';
import { callGetEvents } from '../requests/eventRequests';

function* getEvents() {
    try{
        yield callGetEvents();
    } catch (error) {
        console.log('error in event Saga', error);
    }
}

function* eventSaga() {
    yield takeLatest(EVENT_ACTIONS.GET_EVENTS, getEvents);
}

export default eventSaga;