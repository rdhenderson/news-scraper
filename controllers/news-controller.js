
// Require news resources
const espn = require('./espn.js');
const slashdot = require('./slashdot.js');

const newsManager = {
  resources : {
    "espn" : espn,
    "slashdot" : slashdot
  },
  getArticles : getArticles,
  scrapeAll : scrapeAll
};

function getArticles(sourceName) {
  newsManager.resource
}
