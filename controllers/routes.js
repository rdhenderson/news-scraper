/* Mongoose's "Populated" Method (18.3.7)
 * =============================================== */

// STUDENTS:
// Scroll down to the bottom of this server file for your TODO assigment.
// It's located in the route "populateduser"

const Article = require("../models/article.js");
const Comment = require("../models/comment.js");
const User = require("../models/user.js");

const espn = require('../scrape-modules/espn.js');
const slashdot = require('../scrape-modules/slashdot.js');
const wired = require('../scrape-modules/wired.js');
const resources = [espn, slashdot, wired];

module.exports = function routes(app) {

  app.get("/scrape", function(req,res) {
    const scrapePromises = resources.map( (source) =>
      source.scrape()
        .then( (data) => source.updateDatabase(data))
      );
    Promise.all(scrapePromises).then( () => res.send("Scrape Complete") );
  });

  // Send list of resource names to front-end
  app.get("/resources", function(req, res) {
    res.send(resources.map( function (source) {
      return { name: source.name, displayName: source.displayName};
    }));
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

  app.get("/articles/:source", function(req, res) {
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
  app.post("/user", function (req,res) {
    const query = {name: req.body.name}
    console.log("User request received", req.body);
    User.findOrCreate(query, (err, user) => {
      // my new or existing model is loaded as result
      if (err) console.log("ERROR", err);

      // Send to favorites route to populate favorites for return
      res.redirect(`/favorites/${user._id}`);
    });
  });

  // List user favorites
  app.get("/favorites/:user", function (req, res) {
    User.findOne({_id: req.params.user})
      .populate("favorites")
      .exec( function (err, user) {
        if (err) return console.log("ERROR", err);
        res.send(user);
      });
  });

  // Add user favorite
  app.post("/favorites", function (req,res) {
    console.log("Request received", JSON.stringify(req.body, null, 2));
    const query = {_id: req.body.userId};

    // {new: true} sets query to return updated object rather than original
    User.findOneAndUpdate(query, {$push: {favorites: req.body.articleId}}, {new:true})
      .populate("favorites")
      .exec(function(err, user) {
        if (err) return console.log("Error", err);
        console.log("user", user);
        res.send(user);
    });
  });

  app.post("/articles/:id", function(req, res) {
    const options = {upsert: true, new: true, runValidators: true};
    Comment.create(req.body, function(err, comment){
      if (err) {
        console.log(err);
      } else {
        Article.findOneAndUpdate(
          {_id: req.params.id},
          {$push: {comments: comment._id}},
          options
        )
          .populate("comments")
          .exec(function(err, data) {
          if (err) return console.log("ERROR", err);
          console.log("comment return data", data);
          res.send(data);
        });
      }
    });
  });
};
