
// Dependencies
const express = require("express");
const mongoose = require('mongoose');
const path = require('path');
const logger = require("morgan");
const bodyParser = require('body-parser');

// Initialize Express
var app = express();
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

const Article = require('./models/article.js');
const Comment = require('./models/comment.js')


// Database configuration
// Set mongoose promise model
mongoose.Promise = Promise;
const devConnection = 'mongodb://localhost/news-scraper';
const prodConnection = "mongodb://heroku_4dn336kv:lmha730iil25i9heh19sk6i689@ds125262.mlab.com:25262/heroku_4dn336kv";
mongoose.connect(process.env.MONGODB_URI || devConnection);
const db = mongoose.connection; //Save mongoose default connection


// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/news", function(req, res) {
  res.sendFile(__dirname + "/public/news.html");
});
const routes = require('./controllers/routes.js')(app);
// // 2. At the "/all" path, display every entry in the animals collection
// app.get("/all", function(req, res) {
//   // Query: In our database, go to the animals collection, then "find" everything
//   db.animals.find({}, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });
//
// // 3. At the "/name" path, display every entry in the animals collection, sorted by name
// app.get("/name", function(req, res) {
//   // Query: In our database, go to the animals collection, then "find" everything,
//   // but this time, sort it by name (1 means ascending order)
//   db.animals.find().sort({ name: 1 }, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });
//
// // 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
// app.get("/weight", function(req, res) {
//   // Query: In our database, go to the animals collection, then "find" everything,
//   // but this time, sort it by weight (-1 means descending order)
//   db.animals.find().sort({ weight: -1 }, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });
//
// // 2: Name: Sort results by name in ascending order, in a json
// app.get("/sort/asc/:key", (req, res) => {
//   let sortObj = {};
//   sortObj[req.params.key] = 1; //
//   db.animals
//     .find()
//     .sort(sortObj,
//       (err, data) => {
//         if (err) console.log("ERROR", err);
//         res.json(data);
//       });
// });
// // 3: Weight: Sort results by weight in descending order, in a json
//
// app.get("/sort/des/:key", (req, res) => {
//   let sortObj = {};
//   sortObj[req.params.key] = -1;
//   db.animals
//     .find({})
//     .sort(sortObj,
//       (err, data) => {
//         if (err) console.log("ERROR", err);
//         res.json(data);
//       });
// });

// Connect to database and set the app to listen on port 3000
db.once('open', function() {
  console.log("Connected to database: ", database);
  app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
});
