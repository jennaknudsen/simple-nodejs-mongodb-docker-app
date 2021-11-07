const express = require('express');
const mongoLoader = require('./mongo-loader');
const api = require('./api');

const dbName = "simple-nodejs-mongodb-docker-app";
const url = "mongodb://localhost:27017/" + dbName;

// always load mongo
mongoLoader.loadMongo().then(() => console.log("Done opening MongoDB"));
