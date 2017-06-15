const Resource = require('./resource.js');
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../models/article.js');

// SEEMS TO HAVE SOME SORT OF ANTI-SCRAPING SCRIPT?
function parse($) {
  const results = [];
  $('ul#most-pop-list').children('li').each((i, elem) => {
    const link = $(elem).children('a').attr('href');
    const title = $(elem).find('h2').text();
    results.push({ link, title, source: 'wired' });
  });
  return results;
}

// Figure out how to call this function in the flow
function parseDetail(item) {
  return new Promise((resolve) => {
    request(
      {
        method: 'GET',
        uri: item.link,
        gzip: true,
      },
      (err, result, body) => {
        if (err) return console.log(err);
        const $ = cheerio.load(body);
        // IF List Article
        let detail = '';
        if ($('body').hasClass('listicle')) {
          detail = $('.listicle-intro').children('p').text();
          $('.listicle-captions').each(function concatDetail() {
            detail += $(this).text();
          });
        } else {
          $('article.content').children('p')
            .each(function concatDetail() {
              detail += $(this).text();
            });
        }
        return resolve(detail);
      },
    );
  });
}

function parseAllDetails(results) {
  // Create array of promises to hold parseWiredDetail results
  const detailPromises = results.map(item =>
    parseDetail(item).then(detail =>
       Object.assign({}, item, { detail })));

  // When all detail calls have returned, send data back to Resources.
  return Promise.all(detailPromises)
    .then(data => data)
    .catch(err => console.log('ERROR: ', err));
}

const parseWired = ($) => {
  const results = parse($);
  return parseAllDetails(results);
};

const requestQuery = {
  method: 'GET',
  uri: 'https://www.wired.com/most-popular',
  gzip: true,
};

const wiredObj = {
  requestQuery,
  name: 'wired',
  displayName: 'Wired.com',
  parseFn: parseWired,
  model: Article,
};
const wired = new Resource(wiredObj);

module.exports = wired;
