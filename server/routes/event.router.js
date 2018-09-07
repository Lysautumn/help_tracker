const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET for all event information
 */
router.get('/all', (req, res) => {
    const queryText = `SELECT events.id, date, title, person.name as instructor, cohort_name, assignment, topic, completed, students
	FROM "events"
	JOIN "person" on person.id = events.instructor_id
    JOIN "cohorts" on cohorts.id = events.cohort_id
    ORDER BY date`;
    pool.query(queryText)
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
    const id = req.params.id;
    const queryText = `SELECT events.id, date, title, person.name as instructor, cohort_name, assignment, topic, completed, students, notes
	FROM "events"
	JOIN "person" on person.id = events.instructor_id
    JOIN "cohorts" on cohorts.id = events.cohort_id
    WHERE events.id = $1`;
    pool.query(queryText, [id])
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
    const queryText = `INSERT into "events" 
    ("date", "title", "instructor_id", "cohort_id", "students", "assignment", "topic") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    pool.query(queryText, [event.date, event.title, event.instructor, event.cohort, event.students, event.assignment, event.topics])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in POST for events', error);
            res.sendStatus(500);
        })
});

/**
 * PUT route
 */
router.put('/:id', (req, res) => {
    console.log(req.body.event);
    const event = req.body.event;
    const eventId = req.params.id;
    const queryText = `UPDATE "events" 
    SET "title" = $1, "students" = $2, "assignment" = $3, "topic" = $4, "notes" = $5, "completed" = $6
    WHERE id = $7;`
    pool.query(queryText, [event.title, event.students, event.assignment, event.topics, event.notes, event.completed, eventId])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in event PUT', error);
            res.sendStatus(500);
        })
});

/**
 * DELETE route
 */
router.delete('/:id', (req, res) => {
    const eventId = req.params.id;
    const queryText = `DELETE FROM "events" WHERE id = $1`;
    pool.query(queryText, [eventId])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log('error in event DELETE', error);
            res.sendStatus(500);
        })
});

module.exports = router;