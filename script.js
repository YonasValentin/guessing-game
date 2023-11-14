'use strict';

const checkBtn = document.querySelector('.btn.check');

const guessInput = document.querySelector('.guess');
guessInput.focus();
guessInput.value = '';

let randomNumber = Math.floor(Math.random() * 20) + 1;

const correctNumberDisplay = document.querySelector('.number');
let score = document.querySelector('.score');
const message = document.querySelector('.message');

const againBtn = document.querySelector('.btn.again');
againBtn.disabled = true;

let highscore = localStorage.getItem('highscore') || 0;
const highscoreDisplay = document.querySelector('.highscore');
highscoreDisplay.textContent = highscore;

const checkGuess = () => {
  const userGuess = Number(guessInput.value);

  if (userGuess === randomNumber) {
    correctNumberDisplay.textContent = randomNumber.toString();
    message.textContent = "You're correct!";
    checkBtn.textContent = 'You Won!';
    document.body.style.backgroundColor = '#60b347';

    updateHighscore();
    endGame();
  } else if (userGuess < randomNumber) {
    message.textContent = 'Too low! Guess higher.';
    guessInput.focus();
    updateScore();
  } else if (userGuess > randomNumber) {
    message.textContent = 'Too high! Guess lower.';
    guessInput.focus();
    updateScore();
  }
};

guessInput.addEventListener('keydown', event => {
  let currentGuess = Number(guessInput.value);

  if (event.key === 'Enter') {
    checkGuess();
  } else if (event.key === 'ArrowUp') {
    currentGuess++;
    guessInput.value = currentGuess;
    event.preventDefault();
  } else if (event.key === 'ArrowDown') {
    currentGuess = currentGuess > 1 ? currentGuess - 1 : 1;
    guessInput.value = currentGuess;
    event.preventDefault();
  }
});

checkBtn.addEventListener('click', checkGuess);

const updateScore = () => {
  let currentScore = Number(score.textContent);
  currentScore--;
  score.textContent = currentScore.toString();

  if (currentScore === 0) {
    message.textContent = 'Game over! Try again.';
    endGame();
  }
};

const updateHighscore = () => {
  const currentScore = Number(score.textContent);

  if (currentScore > highscore) {
    highscore = currentScore;
    highscoreDisplay.textContent = highscore.toString();
    localStorage.setItem('highscore', highscore);
  }
};

const endGame = () => {
  guessInput.disabled = true;
  checkBtn.disabled = true;
  againBtn.disabled = false;
  guessInput.focus();
};

againBtn.addEventListener('click', () => {
  randomNumber = Math.floor(Math.random() * 20) + 1;
  score.textContent = '20';
  correctNumberDisplay.textContent = '?';
  message.textContent = 'Start guessing...';
  guessInput.value = '';
  guessInput.disabled = false;
  checkBtn.disabled = false;
  againBtn.disabled = true;
  document.body.style.backgroundColor = '#222';
  checkBtn.textContent = 'Check!';
  guessInput.focus();
});
