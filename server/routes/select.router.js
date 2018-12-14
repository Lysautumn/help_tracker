const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "cohorts";`)
        .then(result => {
            let selectInfo = {
                cohortInfo: result.rows,
            }
            res.send(selectInfo);
        }).catch(error => {
            console.log('error in select GET', error);
            res.sendStatus(500);
        });
});

/**
 * POST route template
 */
router.post('/cohorts', (req, res) => {
    let newCohortName = req.body.newCohort;
    let queryText = `INSERT INTO "cohorts" (cohort_name) VALUES ($1)`;
    pool.query(queryText, [newCohortName])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(error);
            res.sendStatus(500);
        })

});

module.exports = router;