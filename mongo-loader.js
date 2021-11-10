const fs = require('fs');
const readline = require('readline');
const mongodb = require('mongodb');

// use this for environment variables
require('dotenv').config();

const mongoHostName = process.env.DB_HOSTNAME;
const dbName = "simple-nodejs-mongodb-docker-app";
const url = "mongodb://" + mongoHostName + ":27017/" + dbName;
const csvName = "classes.csv";

const mongoClient = new mongodb.MongoClient(url);

// output the hostname of whatever is running mongo
console.log("MongoDB host: " + mongoHostName);

/**
 * This class holds course information.
 */
class course {
    constructor(entry, prefix, courseNumber, courseName, credits) {
        // Entry ticks up from 0 for each entry in the database; this lets us
        // do stuff like "select all entries divisible by n
        this["db-entry"] = entry;
        this["prefix"] = prefix;
        this["course-number"] = courseNumber;
        this["course-name"] = courseName;
        this["credits"] = credits;
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
    let iteration = -1;     // set iteration to -1 so that first entry in database is item 0
    for await (const line of rl) {
        const entries = line.split(",");

        // Don't add bad lines to database
        if (entries.length < 4) {
            continue;
        }

        // don't add titles line of csv to database
        if (iteration >= 0) {
            allCourses.push(new course(iteration, entries[0], entries[1], entries[2], entries[3]));
        } else {
            console.log("Detect title line: " + line);
        }

        iteration++;
    }

    console.log(`Done reading ${iteration} entries into CSV`);
}

/**
 * Function used to load information into the MongoDB.
 */
async function loadMongo() {
    try {
        // wait for MongoDB connection to disconnect
        await mongoClient.connect();
        console.log("Connected to MongoDB");

        // this is the database
        const database = mongoClient.db(dbName);
        console.log("Created/opened database " + dbName);

        // this is the courses collection
        const coursesCollection = database.collection("courses");

        // gets number of documents in database
        const documentCount = await coursesCollection.countDocuments();
        console.log("Number of documents counted in MongoDB: " + documentCount);

        // if database is empty, populate it with our csv
        if (documentCount === 0) {
            await loadCSV().then(() => coursesCollection.insertMany(allCourses));
            console.log("Populated MongoDB with entries from CSV");
        } else {
            console.log("MongoDB database already had entries, skipping reading CSV")
        }
    } catch (e) {
        console.log(e);
    } finally {
        // always close connection to mongo client afterwards
        await mongoClient.close();
        console.log("Disconnected from MongoDB")
    }
}

/**
 * Function used by the API to query MongoDB
 *
 * @param query The object used to query MongoDB
 * @returns {Promise<Document[]>} The object that holds all of the return values
 */
async function queryDatabase(query) {
    try {
        // wait for MongoDB connection to disconnect
        await mongoClient.connect();
        console.log("Connected to MongoDB");

        const database = mongoClient.db(dbName);
        const coursesCollection = database.collection("courses");

        return await coursesCollection.find(query).toArray();
    } catch (e) {
        console.log(e);
    } finally {
        // always close connection to mongo client afterwards
        await mongoClient.close();
        console.log("Disconnected from MongoDB")
    }
}

exports.queryDatabase = queryDatabase;
exports.loadMongo = loadMongo;
