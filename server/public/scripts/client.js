$(document).ready(onReady);
let round = 0;
function onReady() {
  playerGuesses();
  $('#submit-button').on('click', createGuesses);
  $('#submit-button').click( 
      function() {
          round++;
          $('#round').text(round);
      }
  );
  console.log("jquery is loaded!");

  //Create new random number
  $('#generate-new-number').on('click', generateNewNumber)
}

// function that generates new number
function generateNewNumber() {  
  $.ajax({
    method: 'GET',
    url: '/generate',m
  }).then(function(response) {
    window.alert(`New Number Picked!?`);
  }
)}

// function that makes GET req for player guesses and appends to the DOM
function playerGuesses() {
    $('#one-array').empty();
    $('#two-array').empty();
    $('#three-array').empty();
  $.ajax({
      method: 'GET',
      url: '/guess',
  }).then(function (response) {
    $('#one-array').append(`
    <li>${response[0].playerGuesses}</li>
    `);
    $('#two-array').append(`
    <li>${response[1].playerGuesses}</li>
    `);
    $('#three-array').append(`
    <li>${response[2].playerGuesses}</li>
    `);

  })
}

// latest guesses
let newGuessOne;
let newGuessTwo;
let newGuessThree;

// function to check latest guesses against random number
function compareGuessToNum() {
  $.ajax({
    method: 'GET',
    url: '/random',
  }).then(function(response) {
    //1 IF statement for each guess to compare against random Number sent from server
    console.log(response.number);
    if (newGuessOne == response.number) {
      window.alert('You Win I Guess', newGuessOne);
    }
      else if (newGuessOne > response.number) {
        answerOne ='lower' + newGuessOne;
        return answerOne;
      }
      else if ( newGuessOne < response.number) {
        answerOne ='higher' + newGuessOne;
        return answerOne;
      }
      else {
        window.alert('Try Again');
      }
  // -------------------------------------------
      if (newGuessTwo == response.number) {
        window.alert('You Win I Guess', newGuessTwo);
      }
        else if (newGuessTwo > response.number) {
          answerTwo ='lower' + newGuessTwo;
          return answerTwo;
        }
        else if ( newGuessTwo < response.number) {
          answerTwo ='higher' + newGuessTwo;
          return answerTwo;
        }
        else {
          window.alert('Try Again');
        }
  // -------------------------------------------
        if (newGuessThree == response.number) {
          window.alert('You Win I Guess', newGuessThree);
        }
          else if (newGuessThree > response.number) {
            answerThree ='lower' + newGuessThree;
            return answerThree;
          }
          else if ( newGuessThree < response.number) {
            answerThree ='higher' + newGuessThree;
            return answerThree;
          }
          else {
            window.alert('Try Again');
          }
  })
}

// function to retrieve input from guess submission form and POST to server?
function createGuesses (event) {
event.preventDefault();
console.log('this is here');
  newGuessOne = $('#playerOne-input').val();
  newGuessTwo = $('#playerTwo-input').val();
  newGuessThree = $('#playerThree-input').val();

  // check if values are empty, if not then clear and run function vvvv
  if(!!newGuessOne && !!newGuessTwo && !!newGuessThree){
    // CALL COMPARISON FUNCTION
    compareGuessToNum();
    
    $('#playerOne-input').val('');
    $('#playerTwo-input').val('');
    $('#playerThree-input').val('');

    // package guesses into object for POSTing to server
    let guesses = {newGuessOne, newGuessTwo, newGuessThree}
    console.log(guesses);
    $.ajax({
      method: 'POST',
      url: '/guess',
      data: guesses

    }).then(function(response)  {
      playerGuesses();
    })
  }
}
