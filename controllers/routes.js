/* eslint no-underscore-dangle: ["error", { "allow": ["_id" ] }]*/
/* eslint no-console: ["error", { allow: ["error"] }] */
/* eslint no-shadow: ["error", { "allow": ["err"] }]*/

// Import mongoose models
const Article = require('../models/article.js');
const Comment = require('../models/comment.js');
const User = require('../models/user.js');

// Import array of resources
const resources = require('./news-controller.js');

module.exports = function routes(app) {
  app.get('/scrape', (req, res) => {
    const scrapePromises = resources.map(source =>
      source.scrape()
        .then(data => source.fixNullArticles(data))
        .then(data => source.updateDatabase(data))
        .catch(err => console.error('ERROR', err)));

    Promise.all(scrapePromises).then(() => res.send('<h1><a href="/"> Scrape Complete. Click to return to news</a></h1>'));
  });

  // Send list of resource names to front-end
  app.get('/resources', (req, res) => {
    res.send(resources.map(source => ({ name: source.name, displayName: source.displayName })));
  });

  app.get('/articles/:source', (req, res) => {
    Article.find({ source: req.params.source.trim() }, (error, doc) => {
      // Send any errors to the browser
      if (error) {
        res.send(error);
      } else {
        res.send(doc);
      }
    });
  });

  // This will grab an article by it's ObjectId
  app.get('/articles/id/:id', (req, res) => {
    Article.findOne({ _id: req.params.id })
    .populate('comments')
    .exec((err, article) => {
      if (err) {
        console.error('ERROR', err);
      } else {
        res.send(article);
      }
    });
  });

  app.post('/user', (req, res) => {
    const query = { name: req.body.name };
    User.findOrCreate(query, (err, user) => {
      // my new or existing model is loaded as result
      if (err) console.error('ERROR', err);

      // Send to favorites route to populate favorites for return
      res.redirect(`/favorites/${user._id}`);
    });
  });

  // List user favorites
  app.get('/favorites/:user', (req, res) => {
    User.findOne({ _id: req.params.user })
      .populate('favorites')
      .exec((err, user) => {
        if (err) return console.error('ERROR', err);
        return res.send(user);
      });
  });

  // Add user favorite
  app.post('/favorites', (req, res) => {
    const query = { _id: req.body.userId };
    User.findOneAndUpdate(query, { $push: { favorites: req.body.articleId } }, { new: true })
      .populate('favorites')
      .exec((err, user) => {
        if (err) return console.error('Error', err);
        return res.send(user);
      });
  });

  app.post('/articles/:id', (req, res) => {
    const options = { upsert: true, new: true, runValidators: true };
    Comment.create(req.body, (err, comment) => {
      if (err) {
        console.error(err);
      } else {
        Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comments: comment._id } },
          options,
        )
          .populate('comments')
          .exec((err, data) => {
            if (err) return console.error('ERROR', err);
            return res.send(data);
          });
      }
    });
  });
};
