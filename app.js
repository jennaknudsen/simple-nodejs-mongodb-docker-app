const fs = require('fs');
const express = require('express');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const dbName = "simple-nodejs-mongodb-docker-app";
const url = "mongodb://localhost:27017/" + dbName;
const csvName = "classes.csv"

class course {
    constructor(prefix, courseNumber, courseName, credits) {
        this.prefix = prefix;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.credits = credits;
    }
}

function loadCSV() {
    fs.readFile(__dirname + csvName, () => {

    });
}

/**
 * Function used to load information into the MongoDB.
 */
function loadMongo() {
    mongoClient.connect(url, (error, db) => {
        // if can't open database then throw an error
        if (error) throw error;

        var openDB = db.db(dbName);
        console.log("Created/opened database");

        openDB.collection("courses").insertMany()
    });
}
