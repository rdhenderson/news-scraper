
const Resource = require('./resource.js');
// const cheerio = require('cheerio');
const Article = require('../models/article.js');

function parseSlashdot($) {
  const results = [];
  $('article[id*="firehose-"]').each((i, elem) => {
    const link = $(elem).find('.story-title')
      .children('a')
      .eq(0)
      .attr('href');
    const title = $(elem).find('.story-title')
      .children('a')
      .eq(0)
      .html()
      .replace(/&apos;/g, "'");
    const detail = $(elem).find('div.p')
      .text()
      .replace('&apos;', '\'');
    results.push({ title, detail, link: `https:${link}`, source: 'slashdot' });
  });
  return results;
}
const slashdotObj = {
  requestQuery: 'https://www.slashdot.org',
  name: 'slashdot',
  displayName: 'SlashDot.org',
  parseFn: parseSlashdot,
  model: Article,
};
const slashdot = new Resource(slashdotObj);

module.exports = slashdot;
