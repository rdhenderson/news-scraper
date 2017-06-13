let userId;
// Grab the articles as a json
$(document).ready(function(){
  // Get list of resources to populate source-select
  getResourceNames();
  getArticles();

  // Set up click-handlers
  $('#source-select').on('change', getArticles);
  $(document).on("click", ".headline", setDetail);
  $("#user-submit").on("click", setUser);
  $(document).on("click", "#comment-form-toggle", () =>
    $("#comment-form").toggle()
  );
  $(document).on("click", "#add-favorite", addFavorite);
  $(document).on("click", "#comment-history-toggle", () =>
      $("#comment-history").toggle()
  );
  $(document).on("click", "#comment-submit", submitComment);
  // $(document).on('keypress', '#comment-body', function(e){
  //   console.log("Hit a button", e.which);
  //      if(e.which == 13){//Enter key pressed
  //          $('#comment-submit').click();//Trigger search button click event
  //      }
  //  });

});

function addFavorite() {
  const articleId = $(this).attr("data-id");
  console.log("Current User", userId);
  $.ajax({
    method: "POST",
    url: `/favorites`,
    data: {
      articleId,
      userId
    },
  })
  .done( (data) => {
    console.log("Received data", data);
  });
}
function setUser() {
  event.preventDefault();
  console.log("USER NAME:", $("#user-name").val());
  $.ajax({
    method: "POST",
    url: `/users`,
    data: {
      name: $("#user-name").val(),
    },
  })
  .done( (data) => {
    console.log("Received data", data);
    $("#user-name").val("");
    userId = data._id;
    console.log("USER id", userId);
  });
}

function getResourceNames() {
  $.get('/resources', function(data) {
    data.forEach( (source) => {
      console.log("Source", source.displayName);
      $("#source-select")
        .append(`<option value="${source.name}">${source.displayName}</option>`);
    });
  });
}

function getArticles(){
  const source = $("#source-select option:selected").val();
  $.get(`/articles/${source}`, function(data) {
    const articleRows = Template.title( {'headline': data});
    $("#headlines").empty().append(articleRows);
  });
}

 function submitComment() {
   console.log("submitting comment");
    event.preventDefault();
    const id = $(this).attr("data-id");
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: `/articles/${id}`,
      data: {
        title: $("#comment-title").val(),
        body: $("#comment-body").val()
      },
    })
    .done( (data) => {
      console.log("Received data", data);
      printDetail(data);
    });
}

function setDetail() {
  const id = $(this).attr("data-id");
  // Now make an ajax call for the Article
  $.get(`/articles/id/${id}`)
    .done(printDetail);
}

function printDetail(article) {
  const detailRows = Template.detail({article : article});
  $("#details").empty().append(detailRows);
}
