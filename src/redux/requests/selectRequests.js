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

export function callCreateNewCohort(cohort) {
    return axios.post('select/cohorts', cohort)
        .then(response => response.data)
        .catch(error => {
            throw error.response || error;
        })
}