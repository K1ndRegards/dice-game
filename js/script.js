// Buttons
const newGameBtn = document.querySelector('button.new-game');
const rollDiceBtn = document.querySelector('button.roll-dice');
const holdBtn = document.querySelector('button.hold');

// UI Components
// Dice Image
const diceImg = document.querySelector('img.dice');

// Player 1
const player1Card = document.querySelector('div.player-1');

// Player 2
const player2Card = document.querySelector('div.player-2');

let diceValue;
let player1TotalScore = 0,
  player1CurrentScore = 0;
let player2TotalScore = 0,
  player2CurrentScore = 0;

let player1Turn = true;
let gameEnded = false;

function updatePlayer1CurrentScore() {
  document.querySelector('.p1-current-score').innerText = player1CurrentScore;
}

function updatePlayer2CurrentScore() {
  document.querySelector('.p2-current-score').innerText = player2CurrentScore;
}

function updatePlayer1TotalScore() {
  document.querySelector('.p1-total-score').innerText = player1TotalScore;
}

function updatePlayer2TotalScore() {
  document.querySelector('.p2-total-score').innerText = player2TotalScore;
}

function switchPlayer() {
  player1Turn = !player1Turn;

  if (player1Card.classList.contains('active')) {
    player1Card.classList.remove('active');
    player2Card.classList.add('active');
  } else {
    player2Card.classList.remove('active');
    player1Card.classList.add('active');
  }
}

function rollADice() {
  if (gameEnded) return;

  if (diceImg.classList.contains('hidden')) {
    diceImg.classList.remove('hidden');
  }
  // rolling a dice
  diceValue = Math.trunc(Math.random() * 6) + 1;

  // changing the image of the dice
  diceImg.src = `assets/dice-${diceValue}.png`;

  // if dice roll equals to 1
  if (diceValue === 1) {
    // removing all the score from current score and changing the player
    if (player1Turn) {
      player1CurrentScore = 0;
      updatePlayer1CurrentScore();
    } else {
      player2CurrentScore = 0;
      updatePlayer2CurrentScore();
    }

    switchPlayer();
    return;
  }

  // if it's player 1 turn
  if (player1Turn) {
    player1CurrentScore += diceValue;
    updatePlayer1CurrentScore();

    // else it is player 2 turn
  } else {
    player2CurrentScore += diceValue;
    updatePlayer2CurrentScore();
  }
}

rollDiceBtn.addEventListener('click', rollADice);

holdBtn.addEventListener('click', function () {
  if (gameEnded) return;

  if (player1Turn) {
    player1TotalScore += player1CurrentScore;
    player1CurrentScore = 0;
    updatePlayer1CurrentScore();
    updatePlayer1TotalScore();

    if (player1TotalScore >= 100) {
      gameEnded = true;
      player1Card.classList.add('win-bg');
      return;
    }

    switchPlayer();
  } else {
    player2TotalScore += player2CurrentScore;
    player2CurrentScore = 0;
    updatePlayer2CurrentScore();
    updatePlayer2TotalScore();

    if (player2TotalScore >= 100) {
      gameEnded = true;
      player2Card.classList.add('win-bg');
      return;
    }

    switchPlayer();
  }
});

newGameBtn.addEventListener('click', function () {
  gameEnded = false;

  // Hiding dice image if it is there
  if (!diceImg.classList.contains('hidden')) {
    diceImg.classList.add('hidden');
  }

  // Removing winner background if it is there
  if (player1Card.classList.contains('win-bg')) {
    player1Card.classList.remove('win-bg');
  } else if (player2Card.classList.contains('win-bg')) {
    player2Card.classList.remove('win-bg');
  }

  // Resetting players scores and updating UI
  (player1TotalScore = 0), (player1CurrentScore = 0);
  updatePlayer1CurrentScore();
  updatePlayer1TotalScore();
  (player2TotalScore = 0), (player2CurrentScore = 0);
  updatePlayer2CurrentScore();
  updatePlayer2TotalScore();

  // Game starts with player 1
  if (!player1Turn) {
    switchPlayer();
  }
});
