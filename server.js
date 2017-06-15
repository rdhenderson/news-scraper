// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up environment variables and database
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news-scraper';

// Setup Mongoose and add promise model
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
const db = mongoose.connection; // Save mongoose default connection
// This makes sure that any errors are logged if mongodb runs into an issue
db.on('error', (error) => {
  console.error('Database Error:', error);
});

// Initialize express
const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

// Import routes from routes.js
require('./controllers/routes.js')(app);

// Connect to database and set the app to listen on port 3000
db.once('open', () => {
  console.log('Connected to database');
  app.listen(PORT, () => {
    console.log('App running on port', PORT);
  });
});
