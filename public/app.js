// Create empty template object
let Template = {};

// Grab the articles as a json
$(document).ready(function(){
  $('#source-select').on('change', getArticles);
  $(document).on("click", ".headline", setDetail);
  $(document).on("click", "#comment-form-toggle", () => {
    console.log("Clicked comment form");
    $("#comment-form").toggle();
  });
  $(document).on("click", "#comment-history-toggle", () => {
      console.log("Clicked comment history", $("#comment-history").html());
      $("#comment-history").toggle();
    });
  Template.detail = Handlebars.compile($("#detail-template").html());
  Template.title = Handlebars.compile($("#headline-template").html());  
  getArticles();
});

function getArticles(){
  const source = $("#source-select option:selected").val();
  $.get(`/articles/${source}`, function(data) {
    console.log("data", headlines);
    const articleRows = Template.title( {'headline': data});
    $("#headlines").empty().append(articleRows);
  });
}

 function submitComment() {
    event.preventDefault();
    var thisId = $(this).attr("data-id");
    console.log("Submit:", thisId);
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#comment-title").val(),
        // Value taken from note textarea
        body: $("#comment-body").val()
      }
    })
    .done(function(data) {
      console.log("Returned info:", data);
      detailRows = Template.detail({article : data});
      $("#details").empty().append(detailRows);
    });
}
function setDetail() {
  // Empty the comments from the note section
  $("#details").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/id/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log("Data", data);
      detailRows = Template.detail({article : data});
      $("#details").empty().append(detailRows);
  });
}
