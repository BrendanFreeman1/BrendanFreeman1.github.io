const rock = "rock", paper = "paper", scissors = "scissors";
const draw = "draw", user = "user", ai = "ai";
let userScore = 0;
let aiScore = 0;
let drawScore = 0;
let winner = "";
let userSelection = "";
const gameText = document.querySelector(".gameText");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const resetBtn = document.querySelector(".reset");
resetBtn.style.display = "none";
rockBtn.addEventListener("click", () => {playRound(rock);});
paperBtn.addEventListener("click", () => {playRound(paper);});
scissorsBtn.addEventListener("click", () => {playRound(scissors);});
resetBtn.addEventListener("click", () => resetGameStats());

//add the players and AI selection for each round and who won that round
//after gameover display totals and the winner for the game
//remove reset button after press


function playRound(userSelection) 
{
  updateGameText();
  let rndNumber = Math.random();
  let aiSelection = CalcAIResult(rndNumber);

  winner = calcGameResult(aiSelection, userSelection);
  increaseTally(winner);
  updateGameText();
  if (userScore >= 5 || aiScore >= 5) endGame();
}

function updateGameText() 
{
  gameText.textContent = `Player Score: ${userScore} AI Score: ${aiScore} Draws: ${drawScore}`;
}

function increaseTally(winner) 
{
  if (winner === draw) drawScore++;
  if (winner === user) userScore++;
  if (winner === ai) aiScore++;  
}

function endGame() 
{
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  resetBtn.style.display = "block";
}

function resetGameStats() {
  userScore = 0;
  aiScore = 0;
  drawScore = 0;
  winner = "";
  userSelection = "";

  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
  updateGameText();
  resetBtn.style.display = "none";
}

function CalcAIResult(rndNumber) 
{
  if (rndNumber <= 0.33) return rock;
  else if (rndNumber >= 0.66) return scissors;
  else return paper;
}

function calcGameResult(aiSelection, userSelection) 
{
  if (aiSelection === rock) {
    if (userSelection === rock) return draw;
    if (userSelection === paper) return user;
    if (userSelection === scissors) return ai;
  }
  if (aiSelection === paper) {
    if (userSelection === rock) return ai;
    if (userSelection === paper) return draw;
    if (userSelection === scissors) return user;
  }
  if (aiSelection === scissors) {
    if (userSelection === rock) return user;
    if (userSelection === paper) return ai;
    if (userSelection === scissors) return draw;
  }
}