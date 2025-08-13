/* jshint esversion: 6 */

console.log("JavaScript is running");

document.addEventListener("click", function (event) {
  console.log("Something was clicked");

  if (event.target.tagName === "BUTTON") {
    console.log("Button clicked:", event.target.innerText);
  }
});

/* Score and tries tracking */
let playerScore = 0;
let computerScore = 0;
let triesLeft = 5;

/* Game Choices */
const choices = ["rock", "paper", "scissors", "lizard", "spock"];

/* Function to return a random choice for the computer */
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

/* Function to determine winner */
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "It's a tie!";
  }

  const winConditions = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["paper", "spock"],
    spock: ["rock", "scissors"]
  };

  if (winConditions[playerChoice].includes(computerChoice)) {
    playerScore++;
    return `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    return `You lose! ${computerChoice} beats ${playerChoice}.`;
  }
}

/* Game function */
function playGame(playerChoice) {
  if (!playerChoice) {
    console.warn("No player choice provided — skipping round.");
    return;
  }


  if (triesLeft === 0) {
    document.getElementById("result").textContent = "Game over! Click Restart to play again.";
    return;
  }

  const computerChoice = getComputerChoice();
  const resultMessage = determineWinner(playerChoice, computerChoice);

  triesLeft--;

  document.getElementById("player-choice").textContent = playerChoice;
  document.getElementById("computer-choice").textContent = computerChoice;

  document.getElementById("player-score").textContent = playerScore;
  document.getElementById("computer-score").textContent = computerScore;
  document.getElementById("tries-left").textContent = triesLeft;
  document.getElementById("result").textContent = resultMessage;

  if (triesLeft === 0) {
    document.getElementById("restart").style.display = "block";
  }
}

playGame("rock");

/* Restart function */
function restartGame() {
  playerScore = 0;
  computerScore = 0;
  triesLeft = 5;

  document.getElementById("player-score").textContent = playerScore;
  document.getElementById("computer-score").textContent = computerScore;
  document.getElementById("tries-left").textContent = triesLeft;
  document.getElementById("result").textContent = "";
  document.getElementById("restart").style.display = "none";
}

window.onload = function () {
  document.getElementById("restart").addEventListener("click", restartGame);
};



