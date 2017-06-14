const request = require('request');
const cheerio = require('cheerio');

function Resource (obj) {
  this.name = obj.name;
  this.displayName = obj.displayName;
  this.requestQuery = obj.requestQuery;
  this.parseFn = obj.parseFn;
  this.model = obj.model;
}

Resource.prototype.scrape =  function() {
  // console.log("Requesting ", this.reqeustQuery)
    return new Promise( (resolve, reject) => {
      request(this.requestQuery, (err, result, body) => {
        const $ = cheerio.load(body);
        if (err) return handleError(err);
        return resolve(this.parseFn($, result, body));
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
      resolve();
    });
  };

module.exports = Resource;

// PRIVATE FUNCTIONS
function handleError(err){
  if (err.code === 11000) return console.log("ignoring duplicate entry");
  console.log("ERROR", err);
}
