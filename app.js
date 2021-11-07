const express = require('express');
const mongoLoader = require('./mongo-loader');
const api = require('./api');


// make an express app
const app = express();
const port = 3000;

// always load mongo
mongoLoader.loadMongo().then(() => console.log("Done opening MongoDB"));

// get the API routing started
app.use('/api', api);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
