
const Resource = require('./resource.js');
const cheerio = require('cheerio');
const Article = require('../models/article.js');

function parseSlashDot ($) {
  let results = [];
  $('article[id*="firehose-"]').each((i, elem) => {
    const link = 'https:' + $(elem).find(".story-title").children('a').eq(0).attr("href");
    let title = $(elem).find(".story-title").children('a').eq(0).html().replace(/&apos;/g, "'");
    console.log("escaped title", title);
    const detail = $(elem).find("div.p").text().replace('&apos;', "'");
    results.push({link: link, title: title, detail: detail, source: 'slashdot'});
  });
  return results;
}

const slashdot = new Resource('slashdot', Article, 'https://www.slashdot.org', parseSlashDot);

module.exports = slashdot;
