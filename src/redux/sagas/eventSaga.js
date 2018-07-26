import { put, takeLatest } from 'redux-saga/effects';
import { EVENT_ACTIONS } from '../actions/eventActions';
import { callGetEvents } from '../requests/eventRequests';

function* getEvents() {
    try{
        yield put ({
            type: EVENT_ACTIONS.REQUEST_START
        });
        const event = yield callGetEvents();
        yield put ({
            type: EVENT_ACTIONS.SET_EVENT,
            event,
        })
        yield put ({
            type: EVENT_ACTIONS.REQUEST_END
        });
    } catch (error) {
        yield put ({
            type: EVENT_ACTIONS.REQUEST_END
        });

        console.log('error in event Saga', error);
    }
}

function* eventSaga() {
    yield takeLatest(EVENT_ACTIONS.GET_EVENTS, getEvents);
}

export default eventSaga;