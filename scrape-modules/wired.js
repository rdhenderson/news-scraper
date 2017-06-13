const Resource = require('./resource.js');
const request = require('request');
const cheerio = require('cheerio');
const Article = require('../models/article.js');

// SEEMS TO HAVE SOME SORT OF ANTI-SCRAPING SCRIPT?
function parseWired ($) {
  let results = [];
  $("ul#most-pop-list").children("li").each((i, elem) => {
    const link = $(elem).children("a").attr("href");
    const title = $(elem).find("h2").text();
    results.push({link, title, source: "wired"});
  });

    //Create array of promises to hold parseWiredDetail results
  let detailPromises = results.map( (item) => {
    return parseWiredDetail(item)
    .then( (detail) => {
      item.detail = detail;
      return item;
    });
  });
  // When all detail calls have returned, send data back to Resources.
  return Promise.all(detailPromises).then( (data) => {
      // console.log(data);
      console.log("Returning promises", data.length);
      return data;
    }).catch( (err) => console.log("ERROR: ", err));
}

//Figure out how to call this function in the flow
function parseWiredDetail(item) {
  return new Promise( (resolve, reject) => {
    request({ method: 'GET',
     uri: item.link,
     gzip: true,
   }, (err, result, body) => {
       if (err) return console.log(err);
       const $ = cheerio.load(body);
       //IF List Article
       let detail = "";
       if ( $("body").hasClass("listicle") ) {
         console.log("Parsing a list");
         detail = $(".listicle-intro").children('p').text();
         $(".listicle-captions")
          .each( function () {
             detail += $(this).text();
           });
        } else {
          $("article.content").children('p')
            .each( function () {
              detail += $(this).text();
            });
        }
     resolve(detail);
   });
 });
}
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
  model : Article,
}
const wired = new Resource(wiredObj);

module.exports = wired;
