//

const request = require('request');
const cheerio = require('cheerio');

function Resource(obj) {
  this.name = obj.name;
  this.displayName = obj.displayName;
  this.requestQuery = obj.requestQuery;
  this.parseFn = obj.parseFn;
  this.model = obj.model;
}

// PRIVATE FUNCTIONS
/* eslint-disable no-console */
function handleError(err) {
  if (err.code !== 11000) {
    console.log('ERROR', err);
  }
  return err;
}
/* eslint-enable no-console */

Resource.prototype.scrape = function scrape() {
  return new Promise((resolve) => {
    request(this.requestQuery, (err, result, body) => {
      const $ = cheerio.load(body);
      if (err) return handleError(err);
      return resolve(this.parseFn($, result, body));
    });
  });
};

Resource.prototype.updateDatabase = function updateDatabase(data) {
  return new Promise((resolve, reject) => {
    data.forEach((item) => {
      this.model.create(item, (err, article) => {
        if (err) {
          reject(new Error('ERROR', err));
          resolve(article); //
        }
      });
    });
    resolve();
  });
};

module.exports = Resource;
