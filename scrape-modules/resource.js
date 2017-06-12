const request = require('request');
const cheerio = require('cheerio');

function Resource (name, model, url, parseFn) {
  this.url = url;
  this.parseFn = parseFn;
  this.model = model;
}

Resource.prototype.scrape =  function() {
    return new Promise( (resolve, reject) => {
      request(this.url, (err, result, body) => {
        const $ = cheerio.load(body);
        if (err) return handleError(err);
        return resolve(this.parseFn($));
      });
    });
  };

Resource.prototype.updateDatabase = function (data) {
    return new Promise( (resolve, reject) => {
      data.forEach((item) => {
        this.model.create(item, (err, article) => {
          if (err) {
            handleError(err);
            resolve(null); //
          }
        });
      });
      return resolve();
    });
  };

module.exports = Resource;

// PRIVATE FUNCTIONS
function handleError(err){
  if (err.code === 11000) return console.log("ignoring duplicate entry");
  console.log("ERROR", err);
}
