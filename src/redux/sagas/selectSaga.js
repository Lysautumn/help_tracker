import { put, takeLatest } from 'redux-saga/effects';
import { SELECT_ACTIONS } from '../actions/selectActions';
import { callGetSelects, callCreateNewCohort } from '../requests/selectRequests';

function* getSelects() {
    try{
        yield put ({
            type: SELECT_ACTIONS.REQUEST_START
        });
        const select = yield callGetSelects();
        yield put ({
            type: SELECT_ACTIONS.SET_SELECTS,
            select,
        })
        yield put ({
            type: SELECT_ACTIONS.REQUEST_END
        });
    } catch (error) {
        yield put ({
            type: SELECT_ACTIONS.REQUEST_END
        });

        console.log('error in select Saga', error);
    }
}

function* createCohort(cohort) {
    try{
        yield put({
            type: SELECT_ACTIONS.REQUEST_START
        });
        yield callCreateNewCohort(cohort.payload);
        yield put({
            type: SELECT_ACTIONS.FETCH_SELECTS
        });
        yield put({
            type: SELECT_ACTIONS.REQUEST_END
        });
    } catch (error) {
        yield put({
            type: SELECT_ACTIONS.REQUEST_END
        });
        console.log('error in create cohort saga', error);
    }
}

function* selectSaga() {
    yield takeLatest(SELECT_ACTIONS.FETCH_SELECTS, getSelects);
    yield takeLatest(SELECT_ACTIONS.CREATE_COHORT, createCohort);
}

export default selectSaga;