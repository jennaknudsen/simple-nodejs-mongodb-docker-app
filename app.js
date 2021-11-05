const fs = require('fs');
const readline = require('readline');
const express = require('express');
const mongodb = require('mongodb');

const dbName = "simple-nodejs-mongodb-docker-app";
const url = "mongodb://localhost:27017/" + dbName;
const csvName = "classes.csv";

const mongoClient = new mongodb.MongoClient(url);

class course {
    constructor(entry, prefix, courseNumber, courseName, credits) {
        this.dbEntry = entry;
        this.prefix = prefix;
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.credits = credits;
    }
}

let allCourses = [];

/**
 * Adapted from https://nodejs.org/api/readline.html#example-read-file-stream-line-by-line
 */
async function loadCSV() {
    // create readstream on csv
    const fileStream = fs.createReadStream(csvName);

    // create interface to read lines from readstream
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    // use await and read in each line from the readstream
    let iteration = 0;
    for await (const line of rl) {
        console.log("Line read: " + line);

        const entries = line.split(",");

        // Don't add bad lines to database
        if (entries.length < 4) {
            console.log("Bad line: " + line);
            continue;
        }

        // don't add titles line of csv to database
        if (iteration > 0) {
            allCourses.push(new course(iteration, entries[0], entries[1], entries[2], entries[3]));
        } else {
            console.log("Detect title line: " + line);
        }

        iteration++;
    }

    console.log("Done reading CSV");
}

/**
 * Function used to load information into the MongoDB.
 */
async function loadMongo() {
    try {
        // use async-await
        await mongoClient.connect();
        console.log("Connected to MongoDB");

        // this is the database
        const database = mongoClient.db(dbName);
        console.log("Created/opened database " + dbName);

        // this is the courses collection
        const coursesCollection = database.collection("courses");

        // gets number of documents in database
        const documentCount = await coursesCollection.countDocuments();

        console.log("Number of documents counted: " + documentCount);

        // if database is empty, populate it with our csv
        if (documentCount === 0) {
            await loadCSV().then(() => coursesCollection.insertMany(allCourses));
            console.log("Populated MongoDB with entries");
        }
    } catch (e) {
        console.log(e);
    }
}

// always load mongo
loadMongo().then(() => console.log("Done opening Mongo"));
