let players = [
  {
    playerName: "Player1",
    playerGuesses: [0, 7, 14, 18]
  },
  {
    playerName: "Player2",
    playerGuesses: [9, 8, 14, 18]
  },
  {
    playerName: "Player3",
    playerGuesses: [9, 68, 17, 47]
  },
];

let newNum = {
  number: '',
};
// let min = 1;
// let max = 25;
function randomNumberGenerator(min, max) {
  newNum.number = Math.floor(Math.random() * (1 + max - min) + 0);
  
  return newNum.number;
};
randomNumberGenerator(1, 25);

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here
// send player guess array to client-side
app.get('/guess', (req, res) => {
  console.log('GET /guess');
  res.send(players);
});

// send random Number to client
app.get('/random', (req, res) => {
  console.log('GET /random', newNum);
  res.send(newNum);
});

// generate new random number upon request
app.get('/generate', (req, res) => {
  console.log('GET /generate');
  randomNumberGenerator(1, 25);
  res.send(201);
})


// POST req to receive new guesses for storing in player array, compare new guesses to random number
app.post('/guess', (req, res) => {
  console.log('POST in /guess');
  // retrieve data out of the req
  const guesses = req.body;
  // push numbers to players array
  players[0].playerGuesses.push(guesses.newGuessOne);
  players[1].playerGuesses.push(guesses.newGuessTwo);
  players[2].playerGuesses.push(guesses.newGuessThree);
  
  // compare those numbers to the random number

  res.sendStatus(201);
})

// function higherLower (guess) {
//   if (guess > num) {
//     let one = guess + 'lower'
//     return one;
//   } 
//   else if (guess < num) {
//     let one = guess + 'higher'
//     return one;
//   } else {
//     alert('hello')
//   }
// }




app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})