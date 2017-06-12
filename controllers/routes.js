/* Mongoose's "Populated" Method (18.3.7)
 * =============================================== */

// STUDENTS:
// Scroll down to the bottom of this server file for your TODO assigment.
// It's located in the route "populateduser"

const Article = require("../models/article.js");
const Comment = require("../models/comment.js");

const espn = require('../scrape-modules/espn.js');
const slashdot = require('../scrape-modules/slashdot.js');

module.exports = function routes(app) {

  app.get("/scrape", function(req,res) {
    espn.scrape().then( (data) => espn.updateDatabase(data));
    slashdot.scrape().then( (data) => slashdot.updateDatabase(data));
  });

  // Route to see comments we have added
  app.get("/comments", function(req, res) {
    // Find all notes in the note collection with our Note model
    Comment.find({}, function(error, data) {
      // Send any errors to the browser
      if (error) { res.send(error); }
      else { res.send(data); }
    });
  });

  // Route to see what user looks like without populating
  app.get("/articles/all", function(req, res) {
    Article.find({}, function(error, doc) {
      // Send any errors to the browser
      if (error) { res.send(error); }
      else { res.send(doc); }
    });
  });

  app.get("/articles/:source", function(req, res) {
    console.log("Source", req.params.source);
    Article.find({'source' : req.params.source.trim()}, function(error, doc) {
      // Send any errors to the browser
      if (error) { res.send(error); }
      else { res.send(doc); }
    });
  });

  // This will grab an article by it's ObjectId
  app.get("/articles/id/:id", function(req, res) {
    Article.findOne({_id : req.params.id})
    .populate("comments")
    .exec(function(err, article) {
      if (err) {
        console.log("ERROR", err);
      } else {
        res.send(article);
      }
    });
  });

  app.post("/articles/:id", function(req, res) {
    console.log("Posting a new comment to article", req.params.id);
    console.log("Body", req.body);
    Comment.create(req.body, function(err, comment){
      if (err) {
        console.log(err);
      } else {
        Article.findOneAndUpdate(
          {_id: req.params.id},
          {$push: {comments: comment._id}}
        )
          .populate("comments")
          .exec(function(err, data) {
          if (err) return console.log("ERROR", err);
          console.log("Wow?");
          res.send(data);
        });
      }
    });

  });

  // Route to see what user looks like WITH populating
  app.get("/populateduser", function(req, res) {
    User.find({})
      .populate("notes")
      .exec( function(error, doc) {
        if (error) {
          res.send(error);
        } else {
          res.send(doc);
        }
      });
    });
};
