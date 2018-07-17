import axios from 'axios';

export function callGetEvents() {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios.get('events/all', config)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}