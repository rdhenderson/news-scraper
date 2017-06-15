/* eslint no-underscore-dangle: ["error", { "allow": ["_id" ] }]*/
/* global $ */
/* global document */
/* global Template */
/* global alert */
/* global event */

// FIXME: Global user state variables
let userSet = false;
let userId;

function getHeadlines() {
  const source = $('#js-source-select option:selected').val();
  $.get(`/articles/${source}`, (data) => {
    const articleRows = Template.title({ headline: data });
    $('#js-headlines').empty().append(articleRows);
  });
}

function getResourceNames() {
  $.get('/resources', (data) => {
    data.forEach((source) => {
      $('#js-source-select').append(
        `<option value="${source.name}">${source.displayName}</option>`,
      );
    });
  });
}
function updateFavorites(user) {
  const favoriteMenu = Template.favorites({ user });
  $('#js-user-info').empty().append(favoriteMenu);
}

function setUser() {
  event.preventDefault();
  $.ajax({
    method: 'POST',
    url: '/user',
    data: {
      name: $('#js-user-name').val(),
    },
  }).done((data) => {
    userSet = true;
    // Set userId for session and update favorite items
    userId = data._id;
    updateFavorites(data);
  });
}

// Add favorite if user has been set
function addFavorite() {
  if (!userSet) {
    // FIXME: Change to modal with login area
    /* eslint-disable no-alert */
    alert('Please login to add a favorite');
    /* eslint-enable no-alert */
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

function printDetail(article) {
  const detailRows = Template.detail({ article });
  $('#js-details').empty().append(detailRows);
}

function getDetail() {
  const id = $(this).attr('data-id');
  $.get(`/articles/id/${id}`).done(printDetail);
}

// Add a comment using id from button data tag
function submitComment() {
  event.preventDefault();
  const id = $(this).attr('data-id');
  $.ajax({
    method: 'POST',
    url: `/articles/${id}`,
    data: {
      title: $('#js-comment-title').val(),
      body: $('#js-comment-body').val(),
    },
  }).done((data) => {
    printDetail(data);
  });
}

// Initialize document and set click handling
$(document).ready(() => {
  // Initialize page
  getResourceNames();
  getHeadlines();

  // Set up click-handlers
  $('#js-source-select').on('change', getHeadlines);
  $('#js-headlines').on('click', '.js-headline', getDetail);
  $('#js-user-info').on('click', '.js-favorite-item', getDetail);
  $('#js-user-submit').on('click', setUser);
  $(document).on('click', '#js-add-favorite', addFavorite);
  $(document).on('click', '#js-comment-submit', submitComment);
});
