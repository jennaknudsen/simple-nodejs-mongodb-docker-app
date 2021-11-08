## Simple Node.js / Express.js / MongoDB Proof-of-concept

<img src="https://raw.githubusercontent.com/jonasknudsen/simple-nodejs-mongodb-docker-app/main/screenshot.png" width="600" />

This is a simple proof-of-concept app that demonstrates reading in a .csv file and 
storing information from the .csv file into a MongoDB database. An API is provided
that allows the user to query the database at `localhost:3000/api`. In addition,
a front-end webpage is provided to make API calls at `localhost:3000`. 

This project was built using the following tool versions:
* **Node.js** 
  * 17.0.1
* **Express.js** 
  * 4.17.1
* **MongoDB**
  * MongoDB Community Server 5.0.3
  * MongoDB Node.js driver package 4.1.4

### Build instructions

1. Download MongoDB Community Server [here](https://www.mongodb.com/try/download/community).
2. Clone this repository.
3. Run the command `npm install` in the root folder of this repository.

### Run instructions 

Start the Node.js app with `node app.js` in the root folder of this repository.
* To test the API commands in the front-end, navigate to http://localhost:3000/ in your web browser.
* To test the API commands in the back-end, direct all API commands to
  http://localhost:3000/api/ in a service such as Postman. 
* The following query parameters can be used to filter documents:
  * `prefix`
  * `course-number`
  * `course-name`
  * `credits`
  * `sample-rate` Given an integer *n*, only select one per *n* documents.
