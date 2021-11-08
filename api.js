const express = require('express');
const mongoLoader = require('./mongo-loader');

const router = express.Router();

router.get('/', async (req, res) => {
    // change these depending on what the API is looking for
    const prefixKey = "prefix";
    const courseNumKey = "course-number";
    const courseNameKey = "course-name";
    const creditsKey = "credits";
    const sampleRateKey = "sample-rate";

    // get the values from the api call
    const prefixValue = req.query[prefixKey];
    const courseNumValue = req.query[courseNumKey];
    const courseNameValue = req.query[courseNameKey];
    const creditsValue = req.query[creditsKey];
    const sampleRateValue = req.query[sampleRateKey];

    // craft the query for the db.collection.find()
    let mongoQuery = {};
    if (prefixValue !== undefined && prefixValue !== "") {
        mongoQuery[prefixKey] = prefixValue;
    }
    if (courseNumValue !== undefined && courseNumValue !== "") {
        mongoQuery[courseNumKey] = courseNumValue;
    }
    if (courseNameValue !== undefined && courseNameValue !== "") {
        mongoQuery[courseNameKey] = courseNameValue;
    }
    if (creditsValue !== undefined && creditsValue !== "") {
        mongoQuery[creditsKey] = creditsValue;
    }
    if (sampleRateValue !== undefined && sampleRateValue !== "") {
        let modValue = parseInt(sampleRateValue);
        if (isNaN(modValue)) modValue = 1;      // don't do any mod-ing if we parse a bad int
        mongoQuery["db-entry"] = { $mod : [modValue, 0]}
    }

    console.log("Attempting to make query:");
    console.log(JSON.stringify(mongoQuery, null, '    '));
    // get the return value from the mongoLoader using the mongoQuery object we just created and send it
    const returnValue = await mongoLoader.queryDatabase(mongoQuery);

    // public API: allow calls from any IP
    res.set('Access-Control-Allow-Origin', '*');
    res.send(returnValue)
});

module.exports = router;