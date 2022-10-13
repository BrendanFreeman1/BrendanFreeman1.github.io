const rock = "rock", paper = "paper", scissors = "scissors";
const draw = "draw", user = "user", ai = "ai";
let userScore = 0;
let aiScore = 0;
let drawScore = 0;
let winner = "";
let stillPlaying = true;
let userSelection = "";
const gameText = document.querySelector(".gameText");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
rockBtn.addEventListener("click", () => {playRound(rock);});
paperBtn.addEventListener("click", () => {playRound(paper);});
scissorsBtn.addEventListener("click", () => {playRound(scissors);});

updateGameText();

function playRound(userSelection) 
{
  let rndNumber = Math.random();
  let aiSelection = CalcAIResult(rndNumber);

  winner = calcGameResult(aiSelection, userSelection);
  increaseTally(winner);

  updateGameText();
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

  if (userScore >= 1 || aiScore >= 1) endGame();
}

function endGame() {}

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
