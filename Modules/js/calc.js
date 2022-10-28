//#region Operation Class
class operation {
  Constructor(operator, num1, num2) {
    this.operator = operator;
    this.num1 = num1;
    this.num2 = num2;
  }
}
//#endregion

//#region Initialise variables
const equationText = document.querySelector(".equationText");
const answerText = document.querySelector(".answerText");
const clearAllBtn = document.querySelector(".clearAllBtn");
const backSpaceBtn = document.querySelector(".backSpaceBtn");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const numButtons = document.querySelectorAll(".numBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let equationStart = true;

clearAllBtn.addEventListener("click", () => {  ClearAnswer(); ClearEquation(); });
backSpaceBtn.addEventListener("click", () => BackSpace(answerText.textContent));
plusMinusBtn.addEventListener("click", () => PlusMinus(answerText.textContent));
numButtons.forEach((button) => button.addEventListener("click", () => AppendEquationText(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => OperatorClicked(button.textContent)));

//#endregion

function OperatorClicked(character)
{
  if (equationStart) StartEquation(character);
  else finishEquation(character);
}

function StartEquation(character) {

  let currentEquation = new operation(character, equationText.textContent, "")

  AppendEquationText(" " + character + " ");
  
  //I dont know whats going on
}

function finishEquation(character)
{

}

function AppendEquationText(character) 
{
  equationText.textContent += character;
}

function BackSpace() 
{
  equationText.textContent = equationText.textContent.slice(0, -1);
}

function ClearAnswer() 
{
  if(answerText.textContent !== null) { answerText.textContent = ""; }
}

function ClearEquation()
{
  equationText.textContent = "";
}

function PlusMinus() 
{
  if (equationText.textContent.toString().charAt(0) === "-") {
    equationText.textContent = equationText.textContent.slice(1);
  } else {
    equationText.textContent = "-" + equationText.textContent;
  }
}

function ClearCurrentEquation(currentEquation)
{
  currentEquation.operator = "";
  currentEquation.num1 = "";
  currentEquation.num2 = "";
}

//#region Operation functions

function Operate(currentEquation) {
  let num1 = parseInt(currentEquation.num1);
  let num2 = parseInt(currentEquation.num2);

  if ((currentEquation.operator = "+")) return Add(num1, num2);
  if ((currentEquation.operator = "-")) return Subtract(num1, num2);
  if ((currentEquation.operator = "*")) return Multiply(num1, num2);
  if ((currentEquation.operator = "/")) return Divide(num1, num2);
  if ((currentEquation.operator = "^")) return Power(num1, num2);
  if ((currentEquation.operator = "%")) return Percentage(num1, num2);
  if ((currentEquation.operator = "√")) return SquareRoot(num1);
}

function Add(num1, num2) {
  return num1 + num2;
}

function Subtract(num1, num2) {
  return num1 - num2;
}

function Multiply(num1, num2) {
  return num1 * num2;
}

function Divide(num1, num2) {
  if (num2 === 0) return null;

  return num1 / num2;
}

function Power(num, power) {
  return Math.pow(num, power);
}

function Percentage(num, percentage) {
  return num * (percentage / 100);
}

function SquareRoot(num) {
  return Math.sqrt(num);
}

//#endregion



//function OperatorClicked(character) 
// {
//   if(equationTextClear)
//   {
//     //Populate first num and operator
//     currentEquation.operator = character;
//     currentEquation.num1 = equationText.textContent;
//     equationText.textContent = currentEquation.num1 + " " + currentEquation.operator;

//     equationTextClear = false;

//   if(!equationTextClear)
//     console.log("here")
//     //Populate second num and display answer
//     currentEquation.num2 = character;
//     equationText.textContent = equationText.textContent + " " + currentEquation.num2;

//     //Get answer
//     let answer = Operate(currentEquation);    
//     answerText.textContent = answer;

//     if(character === "=")
//     {
//       ClearCurrentEquation(currentEquation);
//     }else{
//       currentEquation.num1 = answer;
//       currentEquation.operator = character;
//     }
//   }
// }