const Resource = require('./resource.js');
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../models/article.js');

function parse($) {
  const results = [];
  $('.grid-item-content').find('.text-content').find('h2').each((i, elem) => {
    const rawLink = $(elem).children('a').attr('href');
    const link = (rawLink[0] !== '/') ? rawLink : `http://www.espnfc.us/${rawLink}`;
    const title = $(elem).children('a').text();
    results.push({ link, title, source: 'espn' });
  });
  return results;
}

function parseDetail(item) {
  return new Promise((resolve) => {
    request(item.link, (err, result, body) => {
      if (err) return console.log(err);
      const $ = cheerio.load(body);
      const title = $('h1').html();
      let detail = '';
      $('.above-fold').find('h2, p')
        .each((index, element) => detail += $(element));
      return resolve(detail);
    });
  });
}

function parseAllDetails(results) {
  const detailPromises = results.map(item =>
    parseDetail(item)
      .then(detail => Object.assign({}, item, { detail })));

  return Promise.all(detailPromises)
    .then(data => data)
    .catch(err => console.log('ERROR: ', err));
}

const parseESPN = ($) => {
  const results = parse($);
  return parseAllDetails(results);
};

const espnObj = {
  requestQuery: 'https://www.espnfc.us',
  name: 'espn',
  displayName: 'ESPN FC',
  parseFn: parseESPN,
  model: Article,
};
const espn = new Resource(espnObj);

module.exports = espn;
