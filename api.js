const express = require('express');
const mongoLoader = require('./mongo-loader');

const router = express.Router();

router.get('/', async (req, res) => {
    // res.send(req.query);

    // change these depending on what the API is looking for
    const prefixKey = "prefix";
    const courseNumKey = "course-number";
    const courseNameKey = "course-name";
    const creditsKey = "credits";
    const sampleRateKey = "sample-rate";

    const prefixValue = req.query[prefixKey];
    const courseNumValue = req.query[courseNameKey];
    const courseNameValue = req.query[courseNameKey];
    const creditsValue = req.query[creditsKey];
    const sampleRateValue = req.query[sampleRateKey];

    let mongoQuery = {};
    if (prefixValue !== undefined && prefixValue !== "") {
        mongoQuery[prefixKey] = prefixValue;
    }
    if (courseNumValue !== undefined && courseNumValue !== "") {
        mongoQuery[courseNumKey] = courseNumValue
    }
    if (courseNameValue !== undefined && courseNameValue !== "") {
        mongoQuery[courseNameKey] = courseNameValue
    }
    if (creditsValue !== undefined && creditsValue !== "") {
        mongoQuery[creditsKey] = creditsValue
    }
    if (sampleRateValue !== undefined && sampleRateValue !== "") {
        let modValue = parseInt(sampleRateValue);
        if (isNaN(modValue)) modValue = 1;      // don't do any mod-ing if we parse a bad int
        mongoQuery["db-entry"] = { $mod : [modValue, 0]}
    }

    const returnValue = await mongoLoader.queryDatabase(mongoQuery);
    res.send(returnValue)
});

module.exports = router;