import axios from 'axios';

export function callGetSelects() {
    const config = {
        headers: { 'Content-Type': 'application/json' },
    };

    return axios.get('select', config)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        });
}