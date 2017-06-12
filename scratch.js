const request = require("request");
const cheerio = require("cheerio");

request("http://www.espnfc.us/blog/marcotti-musings/62/post/3140494/real-madrid-dynasty-could-be-toppled-by-bayern-man-united-chelsea-or-juventus", (err, result, body) => {
  if( err) return console.log('ERROR', err);
  const $ = cheerio.load(body);
  // let author = $(".author").children("a").text();
  let title = $("h1").html();
  let detail = "<h1>" + title + "</h1>";
  $(".above-fold").find("h2, p").each( function() {
    const tag = this.name;
    detail += $(this);
    // detail += `<${tag}>`+ $(this).text() + `</${tag}>`;
  });

  //    console.log("P Elem:", $(elem).text());
  console.log("Author: ", author);
  console.log("Title: ", title);
  console.log("Detail: ", detail);
  // });
});
