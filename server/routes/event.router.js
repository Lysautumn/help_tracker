const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET for all event information
 */
router.get('/all', (req, res) => {
    pool.query(`SELECT events.id, date, title, person.name as instructor, cohort_name, assignment, topic, completed, students
	FROM "events"
	JOIN "person" on person.id = events.instructor_id
	JOIN "cohorts" on cohorts.id = events.cohort_id;`)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('Error in GET for events', error);
            res.sendStatus(500);
        })
});

/**
 * GET for specific event information
 */

router.get('/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    pool.query(`SELECT events.id, date, title, person.name as instructor, cohort_name, assignment, topic, completed, students
	FROM "events"
	JOIN "person" on person.id = events.instructor_id
    JOIN "cohorts" on cohorts.id = events.cohort_id
    WHERE events.id = $1`, [id])
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('Error in GET for event details', error);
            res.sendStatus(500);
        })
});

/**
 * POST route
 */
router.post('/', (req, res) => {
    const event = req.body;
    pool.query(`INSERT into "events" 
    ("date", "title", "instructor_id", "cohort_id", "students", "assignment", "topic") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`, [event.date, event.title, event.instructor, event.cohort, event.students, event.assignment, event.topics])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in POST for events', error);
            res.sendStatus(500);
        })
});

module.exports = router;