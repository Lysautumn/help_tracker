const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    let cohortPromise = pool.query(`SELECT * FROM "cohorts";`);
    let assignmentPromise = pool.query(`SELECT * FROM "assignments";`);
    let topicPromise = pool.query(`SELECT * FROM "topics";`);

    Promise.all([cohortPromise, assignmentPromise, topicPromise])
        .then(result => {
            let selectInfo = {
                cohortInfo: result[0].rows,
                assignmentInfo: result[1].rows,
                topicInfo: result[2].rows
            }
            console.log(selectInfo);
            res.send(selectInfo);
        }).catch(error => {
            console.log('error in select GET', error);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;