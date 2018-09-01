import axios from 'axios';

export function callGetEvents() {
    return axios.get('events/all')
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}

export function callGetEventInfo(eventId) {
    return axios.get(`events/${eventId}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}

export function callCreateNewEvent(event) {
    return axios.post('events', event)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}

export function callUpdateEvent(updatedEvent) {
    return axios.put(`events/${updatedEvent.id}`, updatedEvent)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}

export function callDeleteEvent(eventId) {
    return axios.delete(`events/${eventId}`)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}