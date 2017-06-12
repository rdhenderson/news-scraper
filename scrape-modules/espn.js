const Resource = require('./resource.js');
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../models/article.js');

function parseESPN ($) {
  let results = [];
  $(".grid-item-content").find(".text-content").find("h2").each((i, elem) => {
    const link = $(elem).children("a").attr("href");
    const title = $(elem).children("a").text();
    results.push({link: link, title: title, source: "espn"});
  });

  let detailPromises = results.map( (item) => {
    return parseESPNDetail(item)
    .then( (detail) => {
      item.detail = detail;
      return item;
    });
  });

  return Promise.all(detailPromises).then( (data) => {
      // console.log(data);
      return data;
    }).catch( (err) => console.log("ERROR: ", err));
}

//Figure out how to call this function in the flow
function parseESPNDetail(item) {
  return new Promise( (resolve, reject) => {
    if (!item.link.includes("http")) item.link = "http://www.espnfc.us" + item.link;
    request(item.link, (err, result, body) => {
     if (err) return console.log(err);
     const $ = cheerio.load(body);
     let title = $("h1").html();
     let detail = "<h1>" + title + "</h1>";
     $(".above-fold").find("h2, p").each( function() {
      //  const tag = this.name;
       detail += $(this);
       // detail += `<${tag}>`+ $(this).text() + `</${tag}>`;
     });
     resolve(detail);
   });
 });
}

const espn = new Resource('espn', Article, 'https://www.espnfc.us', parseESPN);

module.exports = espn;
