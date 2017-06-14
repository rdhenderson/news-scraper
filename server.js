
// Dependencies
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const logger = require("morgan");
const bodyParser = require('body-parser');

// Mongo Models
const Article = require('./models/article.js');
const Comment = require('./models/comment.js')

// Set up environment variables
const PORT = process.env.PORT || 8080;
const database = {
  'development' : 'mongodb://localhost/news-scraper',
  'production' : "mongodb://heroku_4dn336kv:lmha730iil25i9heh19sk6i689@ds125262.mlab.com:25262/heroku_4dn336kv",
};

const env = process.env.NODE_ENV || 'development';

// Initialize express
const app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));



// Database configuration
// Set mongoose promise model
mongoose.Promise = Promise;

mongoose.connect(database[env]);
const db = mongoose.connection; //Save mongoose default connection


// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const routes = require('./controllers/routes.js')(app);

// Connect to database and set the app to listen on port 3000
db.once('open', function() {
  console.log("Connected to database");
  app.listen(PORT, function() {
    console.log("App running on port", PORT);
  });
});
