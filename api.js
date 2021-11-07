const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    // TODO actually write out this
    res.send(req.query);
});

module.exports = router;