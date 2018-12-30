// Global Variables
let buttonList = ['cat', 'dog', 'rabbit', 'hamster', 'skunk'];
let gifArr = [];

//Title case function
function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, function(match) {
    return match.toUpperCase();
  });
}

// Display buttons on screen
function initializeButtons() {
  // empty buttons div so it does not over append
  $('#button-div').empty();

  for (i in buttonList) {
    let btn = $('<button>');
    $('#button-div').append(btn.text(toTitleCase(buttonList[i])));
    btn.addClass('btn btn-info m-1 gifSearch');
  }
}

function addButton() {
  if ($('#animalInput').val() !== '') {
    // push the text into the array
    buttonList.push($('#animalInput').val());
    // re-initialize the buttons
    initializeButtons();

    // empty input after adding btn
    $('#animalInput').val('');
  } else {
    // do nothing if input is empty
    return;
  }
}

// get gif from API
function searchGiphy() {
  console.log($(this).text());
  let theURL =
    'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=12&q=';

  $.ajax({
    url: theURL + $(this).text(),
    method: 'GET',
  }).then(function(response) {
    gifArr = response.data;
    displayGIF(gifArr);
  });
}

// show gif on screen
function displayGIF(arr) {
  // empty gif-div to reset gif
  $('#gif-div').empty();

  for (i in arr) {
    let img = $('<img>');
    let rating = $('<p>');
    let container = $('<div>');

    // image on thumnbnail view
    img.attr('src', arr[i].images.fixed_height_still.url);
    img.addClass('img rounded gif-thumbnail');
    // save gif for hover later
    img.attr('data-move', arr[i].images.fixed_height.url);
    img.attr('data-still', arr[i].images.fixed_height_still.url);

    // show rating of each gif
    rating.text('Rating: ' + arr[i].rating);
    rating.addClass('font-weight-bold');

    // append the image/rating to the container
    container.addClass('m-2 float-left');
    container.append(rating);
    container.append(img);
    // append container to the gif-div
    $('#gif-div').append(container);
  }
}

// make gif move on hover
function makeItMove() {
  let urlGif = $(this).attr('data-move');

  $(this).attr('src', urlGif);
}

// make gif still again
function makeItStill() {
  let urlGif = $(this).attr('data-still');

  $(this).attr('src', urlGif);
}

// make enter key press the add button
function enterKeyAdd(event) {
  event.preventDefault();

  if (event.keyCode === 13) {
    $('#addAnimalBTN').click();
  }
}

// start program
initializeButtons();
$('#addAnimalBTN').on('click', addButton);
$(document).on('click', '.gifSearch', searchGiphy);
$(document).on('mouseenter', '.gif-thumbnail', makeItMove);
$(document).on('mouseleave', '.gif-thumbnail', makeItStill);
$('#animalInput').on('keyup', enterKeyAdd);
