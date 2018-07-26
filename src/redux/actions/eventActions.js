export const EVENT_ACTIONS = {
    GET_EVENTS: 'GET_EVENTS',
    REQUEST_START: 'REQUEST_START',
    REQUEST_END: 'REQUEST_END',
    SET_EVENT: 'SET_EVENT',
}

export const triggerGet = () => ({
    type: EVENT_ACTIONS.GET_EVENTS,
});