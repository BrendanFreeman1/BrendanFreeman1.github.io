const rock = "rock",
  paper = "paper",
  scissors = "scissors";
const draw = "draw",
  user = "user",
  ai = "ai";
let userScore = 0;
let aiScore = 0;
let drawScore = 0;
let winner = "";
let stillPlaying = true;

while(stillPlaying)
{
  playRound();

  console.log( `The winner was: ${winner}`)
  console.log(`The Players Score is: ${userScore}`)
  console.log(`The Players Score is: ${aiScore}`);
}

function playRound() 
{
    let rndNumber = Math.random();
    let aiSelection = CalcAIResult(rndNumber);

    let userSelection = prompt("Please select either: Rock, Paper or Scissors").toLowerCase();

    winner = calcGameResult(aiSelection, userSelection);
    increaseTally(winner);
}

function increaseTally(winner) 
{
    if (winner === draw) drawScore++;
    if (winner === user) userScore++;
    if (winner === ai) aiScore++;

    if (userScore >= 3 || aiScore >= 3) stillPlaying = false;
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
