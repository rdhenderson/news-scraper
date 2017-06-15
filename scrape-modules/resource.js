/* eslint no-console: ["error", { allow: ["error"] }] */

const request = require('request');
const cheerio = require('cheerio');

function Resource(obj) {
  this.name = obj.name;
  this.displayName = obj.displayName;
  this.requestQuery = obj.requestQuery;
  this.parse = obj.parseFn;
  this.model = obj.model;
}

// PRIVATE FUNCTIONS
function handleError(err) {
  if (err.code !== 11000) {
    console.error('ERROR', err);
  }
  return err;
}

Resource.prototype.scrape = function scrape() {
  return new Promise((resolve) => {
    request(this.requestQuery, (err, result, body) => {
      const $ = cheerio.load(body);
      if (err) return handleError(err);
      return resolve(this.parse($, result, body));
    });
  });
};

Resource.prototype.fixNullArticles = function fixNullArticles(data) {
  return new Promise((resolve) => {
    const results = data.map((item) => {
      const copy = Object.assign({}, item);
      // Use iframe if detail is null
      if (typeof copy !== 'undefined'
        && (copy.detail === null || copy.detail === '')) {
        copy.detail = `<iframe src='${copy.link}' class="news-iframe"></iframe>`;
      }
      return copy;
    });
    resolve(results);
  });
};

Resource.prototype.updateDatabase = function updateDatabase(data) {
  return new Promise((resolve, reject) => {
    data.forEach((item) => {
      this.model.findOrCreate({ link: item.link }, item, (err, article) => {
        if (err) reject(new Error('ERROR', err));
        resolve(article); //
      });
    });
  });
};

module.exports = Resource;
