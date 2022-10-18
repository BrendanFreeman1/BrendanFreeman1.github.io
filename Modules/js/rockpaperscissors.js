const ROCK = "Rock 🪨", PAPER = "Paper 📄", SCISSORS = "Scissors ✂️";
const DRAW = "Draw", USER = "Player", AI = "AI";
let userScore = 0;
let aiScore = 0;
let roundWinner = "";
let userSelection = "";
const selectionText = document.querySelector(".selectionText");
const roundWinnerText = document.querySelector(".roundWinner");
const startText = document.querySelector(".startText")
const scoreText = document.querySelector(".score");
const playerScoreText = document.querySelector(".playerScore");
const aiScoreText = document.querySelector(".AIScore");
const gameWinner = document.querySelector(".gameWinner");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const resetBtn = document.querySelector(".reset");

resetBtn.style.display = "none";
rockBtn.addEventListener("click", () => {playRound(ROCK);});
paperBtn.addEventListener("click", () => {playRound(PAPER);});
scissorsBtn.addEventListener("click", () => {playRound(SCISSORS);});
resetBtn.addEventListener("click", () => resetGame());


function playRound(userSelection) 
{
  updateGameText();

  let rndNumber = Math.random();
  let aiSelection = CalcAIResult(rndNumber);

  roundWinner = calcGameResult(aiSelection, userSelection);
  increaseTally(roundWinner);
  updateGameText(userSelection, aiSelection, roundWinner);
}

function updateGameText(userSelection, aiSelection, roundWinner) 
{
  selectionText.textContent = `${userSelection} VS ${aiSelection}`;
  if(roundWinner === DRAW) roundWinnerText.textContent = `It's a ${roundWinner}`;
  else roundWinnerText.textContent = `${roundWinner} wins this round`;
  
  startText.textContent = "";
  scoreText.textContent = "SCORE";
  playerScoreText.textContent = `Player: ${userScore}`;
  aiScoreText.textContent = `AI: ${aiScore}`;
}

function increaseTally(roundWinner) {
  if (roundWinner === USER) userScore++;
  if (roundWinner === AI) aiScore++;  

  if(userScore >= 5) endGame(USER);
  if(aiScore >= 5) endGame(AI);
} 

function endGame(winner) 
{
  gameWinner.textContent = `The Winner is ${winner} `;
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  resetBtn.style.display = "block";
}

function resetGame() {
  userScore = 0;
  aiScore = 0;
  drawScore = 0;
  roundWinner = "";
  userSelection = "";
  
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
  updateGameText();
  resetBtn.style.display = "none";

  startText.textContent = "Make Your Choice!";
  playerSelectionText.textContent = ``;
  AISelectionText.textContent = ``;
  roundWinnerText.textContent = ``;
}

function CalcAIResult(rndNumber) 
{
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