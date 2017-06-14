let userSet = false;
// Grab the articles as a json
$(document).ready(function(){
  // Get list of resources to populate source-select
  getResourceNames();
  getArticles();

  // Set up click-handlers
  $('#source-select').on('change', getArticles);
  $(document).on("click", ".headline", setDetail);
  $("#user-submit").on("click", setUser);
  $(document).on("click", "#add-favorite", addFavorite);
  $("#user-info").on("click", ".favorite-item", setDetail)
  $(document).on("click", "#comment-submit", submitComment);

});

//Add favorite if user has been set
function addFavorite() {
  if (!userSet) {
    alert("Please login to add a favorite");
    return false;
  }
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
    console.log("Added Favorite data", data);
    updateFavorites(data);
  });
}

function setUser() {
  event.preventDefault();
  $.ajax({
    method: "POST",
    url: '/user',
    data: {
      name: $("#user-name").val(),
    },
  })
  .done( (data) => {
    console.log("setUser data", data);
    userSet = true;
    // Set userId for session and update favorite items
    userId = data._id;
    updateFavorites(data);
  });
}

function updateFavorites(user){
  console.log("Updating favorites", user.name);
  const favoriteMenu = Template.favorites({user});
  console.log("Favorite Menu", favoriteMenu);
  $("#user-info").empty().append(favoriteMenu);
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
