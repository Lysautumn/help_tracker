const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    pool.query(`SELECT events.id, date, title, notes, completed, person.name, cohort_name, topic_name, students.name FROM "events"
	JOIN "student_event" ON events.id = student_event.event_id
	JOIN "person" ON person.id = events.instructor_id
	JOIN "cohorts" ON cohorts.id = events.cohort_id
	JOIN "topics" ON topics.id = events.topic_id
	JOIN "students" ON students.id = student_event.student_id
	;`)
        .then(result => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch(error => {
            console.log('Error in GET for events', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;