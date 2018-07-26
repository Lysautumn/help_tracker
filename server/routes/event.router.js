const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET for all event information
 */
router.get('/all', (req, res) => {
    pool.query(`SELECT date, title, notes, completed, person.name as instructor, cohort_name, string_agg(topic_name, ', ') as topic, string_agg(students.name, ', ') as student FROM "events"
	JOIN "student_event" ON events.id = student_event.event_id
	JOIN "person" ON person.id = events.instructor_id
	JOIN "cohorts" ON cohorts.id = events.cohort_id
	JOIN "topics" ON topics.id = events.topic_id
	JOIN "students" ON students.id = student_event.student_id
	GROUP BY "date", "title", "notes", "completed", "instructor", "cohort_name"
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
 * POST route
 */
router.post('/', (req, res) => {

});

module.exports = router;