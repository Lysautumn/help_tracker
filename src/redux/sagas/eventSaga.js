import { put, takeLatest } from 'redux-saga/effects';
import { EVENT_ACTIONS } from '../actions/eventActions';
import { callGetEvents, callGetEventInfo, callCreateNewEvent, callUpdateEvent, callDeleteEvent } from '../requests/eventRequests';

function* getEvents() {
    try{
        yield put ({
            type: EVENT_ACTIONS.REQUEST_START
        });
        const event = yield callGetEvents();
        yield put ({
            type: EVENT_ACTIONS.SET_EVENTS,
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


function* getEventInfo(eventId) {
    try{
        yield put({
            type: EVENT_ACTIONS.REQUEST_START
        });
        const eventInfo = yield callGetEventInfo(eventId.payload);
        yield put({
            type: EVENT_ACTIONS.SET_EVENT_INFO,
            eventInfo,
        });
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
    } catch(error) {
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
        console.log('error in get event info saga', error);
    }
}

function* createEvent(event) {
    try{
        yield put({
            type: EVENT_ACTIONS.REQUEST_START
        });
        yield callCreateNewEvent(event.payload);
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
    } catch (error) {
        yield put ({
            type: EVENT_ACTIONS.REQUEST_END
        });
        console.log('error in create event saga', error);
    }
}

function* updateEvent(updatedEvent) {
    try{
        yield put({
            type: EVENT_ACTIONS.REQUEST_START
        });
        yield callUpdateEvent(updatedEvent.payload);
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
    } catch(error) {
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
        console.log('error in update event saga', error);
    }
}

function* deleteEvent(eventId) {
    try{
        yield put({
            type: EVENT_ACTIONS.REQUEST_START
        });
        yield callDeleteEvent(eventId.payload);
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
    } catch(error) {
        yield put({
            type: EVENT_ACTIONS.REQUEST_END
        });
        console.log('error in delete event saga', error);
    }
}

function* eventSaga() {
    yield takeLatest(EVENT_ACTIONS.FETCH_EVENTS, getEvents);
    yield takeLatest(EVENT_ACTIONS.FETCH_EVENT_INFO, getEventInfo);
    yield takeLatest(EVENT_ACTIONS.CREATE_EVENT, createEvent);
    yield takeLatest(EVENT_ACTIONS.UPDATE_EVENT, updateEvent);
    yield takeLatest(EVENT_ACTIONS.DELETE_EVENT, deleteEvent);
}

export default eventSaga;