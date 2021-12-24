## Simple Node.js / Express.js / MongoDB / Docker Proof-of-concept

<img src="https://raw.githubusercontent.com/jennaknudsen/simple-nodejs-mongodb-docker-app/main/screenshot.png" width="600" />

This is a simple proof-of-concept app that demonstrates reading in a .csv file and 
storing information from the .csv file into a MongoDB database. An API is provided
that allows the user to query the database at `localhost:3000/api`. In addition,
a front-end webpage is provided to make API calls at `localhost:3000`. 

This app can be ran either directly on your machine or with Docker.

This project was built using the following tool versions:
* **Node.js** 
  * 17.0.1
* **Express.js** 
  * 4.17.1
* **MongoDB**
  * MongoDB Community Server 5.0.3
  * MongoDB Node.js driver package 4.1.4
* **Docker**
  * Docker 20.10.8
  * Docker Compose 1.29.2

### Build instructions

If you are running this app directly on your machine:

1. Download MongoDB Community Server [here](https://www.mongodb.com/try/download/community).
2. Clone this repository.
3. Run the command `npm install` in the root folder of this repository.

### Docker instructions

If you are running this app uisng Docker:
<!-- 
1. Download Docker [here](https://www.docker.com/get-started).
  If you are using Linux, use your distro-specific package manager to install both Docker and Docker Compose.
3. Clone this repository.
4. Run `docker compose up -d` to create and start two containers `node-container` and `mongo-container`. -->

<ol>
 <li> Download Docker <a href="https://www.docker.com/get-started">here</a>.</li>
 <ul>
  <li> If you are using Linux, use your distro-specific package manager to install both Docker and Docker Compose. </li>
 </ul>
 <li> Clone this repository. </li>
 <li> Run <code>docker compose up -d</code> to create and start two containers: <code>node-container</code> and <code>mongo-container</code>. </li>
</ol>

### Run instructions 

Start the Node.js app with `npm start` in the root folder of this repository.
* To test the API commands in the front-end, navigate to http://localhost:3000/ in your web browser.
* To test the API commands in the back-end, direct all API commands to
  http://localhost:3000/api/ in a service such as Postman. 
* The following query parameters can be used to filter documents:
  * `prefix`
  * `course-number`
  * `course-name`
  * `credits`
  * `sample-rate` Given an integer *n*, only select one per *n* documents.

### Troubleshooting

* This simple server does not use HTTPS. Use `http://localhost:3000` instead of 
  `https://localhost:3000`.
* If you get a MongoDB error running the code, your MongoDB service may not be running.
  * [Starting the MongoDB service on Windows](https://stackoverflow.com/a/56354829)
  * On macOS and Linux, use your system's service manager to start the MongoDB service. For
    example, on Ubuntu, run `sudo service mongod start`, or on macOS with Homebrew, run
    `brew services start mongodb-community`.
