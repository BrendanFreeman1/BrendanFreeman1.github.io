//Constants
const ROCK = "🪨", PAPER = "📄", SCISSORS = "✂️";
const DRAW = "Draw", USER = "Player", AI = "Ai";

//Game Stats
let userScore = 0;
let aiScore = 0;
let roundWinner = "";
let userSelection = "";
let aiSelection = "";

//DOM Elements
const scoreText = document.querySelector(".scoreText");
const playerScoreText = document.querySelector(".playerScoreText");
const aiScoreText = document.querySelector(".AIScoreText");
const startText = document.querySelector(".startText");
const selectionText = document.querySelector(".selectionText");
const roundWinnerText = document.querySelector(".roundWinnerText");

//Buttons
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
rockBtn.addEventListener("click", () => {playRound(ROCK);});
paperBtn.addEventListener("click", () => {playRound(PAPER);});
scissorsBtn.addEventListener("click", () => {playRound(SCISSORS);});


function playRound(userSelection) 
{
  updateGameText();
  if(userScore >= 5 || aiScore >= 5) resetGame();
  
  aiSelection = calcAIResult();
  roundWinner = calcGameResult(aiSelection, userSelection);

  increaseTally(aiSelection, userSelection, roundWinner);  
}

function increaseTally(aiSelection, userSelection, roundWinner) {
  if (roundWinner === USER) userScore++;
  if (roundWinner === AI) aiScore++;

  updateGameText(userSelection, aiSelection);

  if (userScore >= 5) endGame(USER);
  if (aiScore >= 5) endGame(AI);
} 

function updateGameText(userSelection, aiSelection) 
{
  startText.style.display = "none";
  scoreText.textContent = "SCORE";
  playerScoreText.textContent = `Player: ${userScore}`;
  aiScoreText.textContent = `Ai: ${aiScore}`;

  selectionText.textContent = `${userSelection} VS ${aiSelection}`;

  if(roundWinner === DRAW) roundWinnerText.textContent = `It's a ${roundWinner}`;
  else roundWinnerText.textContent = `${roundWinner} wins this round`;
}

function endGame(winner) 
{
  selectionText.textContent = `The Winner is ${winner} `;
  roundWinnerText.textContent = "Make a selection to start again"
}

function resetGame() {
  userScore = 0;
  aiScore = 0;
  drawScore = 0;
  roundWinner = "";
  userSelection = "";
  updateGameText();
}

function calcAIResult() 
{
  let rndNumber = Math.random();  
  
  if (rndNumber <= 0.33) return ROCK;
  else if (rndNumber >= 0.66) return SCISSORS;
  else return PAPER;
}

function calcGameResult(aiSelection, userSelection) 
{
  if (aiSelection === ROCK) {
    if (userSelection === ROCK) return DRAW;
    if (userSelection === PAPER) return USER;
    if (userSelection === SCISSORS) return AI;
  }
  if (aiSelection === PAPER) {
    if (userSelection === ROCK) return AI;
    if (userSelection === PAPER) return DRAW;
    if (userSelection === SCISSORS) return USER;
  }
  if (aiSelection === SCISSORS) {
    if (userSelection === ROCK) return USER;
    if (userSelection === PAPER) return AI;
    if (userSelection === SCISSORS) return DRAW;
  }
}