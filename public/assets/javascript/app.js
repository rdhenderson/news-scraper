/* global $ */
/* global document */
/* global Template */
/* global alert */
/* global event */

let userSet = false;
let userId;

function getResourceNames() {
  $.get('/resources', (data) => {
    data.forEach((source) => {
      $('#source-select').append(
        `<option value="${source.name}">${source.displayName}</option>`,
      );
    });
  });
}

function updateFavorites(user) {
  const favoriteMenu = Template.favorites({ user });
  $('#user-info').empty().append(favoriteMenu);
}

// Add favorite if user has been set
function addFavorite() {
  if (!userSet) {
    alert('Please login to add a favorite');
    return false;
  }
  const articleId = $(this).attr('data-id');
  return $.ajax({
    method: 'POST',
    url: '/favorites',
    data: {
      articleId,
      userId,
    },
  }).done(data => updateFavorites(data));
}

function setUser() {
  event.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/user',
    data: {
      name: $('#user-name').val(),
    },
  }).done((data) => {
    userSet = true;
    // Set userId for session and update favorite items
    userId = data._id;
    updateFavorites(data);
  });
}

function getHeadlines() {
  const source = $('#source-select option:selected').val();
  $.get(`/articles/${source}`, (data) => {
    const articleRows = Template.title({ headline: data });
    $('#headlines').empty().append(articleRows);
  });
}

function printDetail(article) {
  const detailRows = Template.detail({ article });
  $('#details').empty().append(detailRows);
}

function setDetail() {
  const id = $(this).attr('data-id');
  $.get(`/articles/id/${id}`).done(printDetail);
}

function submitComment() {
  event.preventDefault();
  const id = $(this).attr('data-id');
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: 'POST',
    url: `/articles/${id}`,
    data: {
      title: $('#comment-title').val(),
      body: $('#comment-body').val(),
    },
  }).done((data) => {
    printDetail(data);
  });
}

// Initialize document and set click handling
$(document).ready(() => {
  // Get list of resources to populate source-select
  getResourceNames();
  getHeadlines();

  // Set up click-handlers
  $('#source-select').on('change', getHeadlines);
  $(document).on('click', '.headline', setDetail);
  $('#user-info').on('click', '.favorite-item', setDetail);
  $('#user-submit').on('click', setUser);
  $(document).on('click', '#add-favorite', addFavorite);
  $(document).on('click', '#comment-submit', submitComment);
});
