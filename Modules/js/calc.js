//#region Operation Class
class Operation {
  constructor(operator, firstNum, secondNum) {
    this.operator = operator;
    this.firstNum = firstNum;
    this.secondNum = secondNum;
  }
}
//#endregion

//#region Initialise variables
const equationText = document.querySelector(".equationText");
const currentNum = document.querySelector(".currentNum");
const clearAllBtn = document.querySelector(".clearAllBtn");
const backSpaceBtn = document.querySelector(".backSpaceBtn");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const numButtons = document.querySelectorAll(".numBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let endEquation = false;
let currentEquation = new Operation("0","","");

clearAllBtn.addEventListener("click", () => { ClearAll(currentEquation); });
backSpaceBtn.addEventListener("click", () => BackSpace(currentNum.textContent));
plusMinusBtn.addEventListener("click", () => PlusMinus(currentNum.textContent));
numButtons.forEach((button) => button.addEventListener("click", () => UpdateCurrentNum(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => OperatorClicked(button.textContent)));
window.addEventListener("keydown", handleKeyboardInput);
document.body.onload = ClearCurrentNum();

//#endregion

function OperatorClicked(character)
{
  //If the user has finished an equation and is building a new one using the previous answer don't reset the currentNum.
  endEquation = false;

  //If the current equation has no operand so far.
  if (currentEquation.firstNum === "") StartEquation(character);

  //If the current equation has an operand and operator and needs the second operand.
  else FinishEquation(character);
}

function StartEquation(character)
{
  //If the user wants to evaluate the current equation.
  if (character === "=") return;

  // The user is still building the equation
  currentEquation.operator = character;
  currentEquation.firstNum = currentNum.textContent;
  UpdateEquationText(currentEquation);
  ClearCurrentNum();

  //If the user wants to square or square root the current number.
  if (character === "𝑥²" || character === "²√𝑥") EvaluateEquation(currentEquation);
}

function FinishEquation(character)
{
  currentEquation.secondNum = currentNum.textContent;

  if(character === "="){ EvaluateEquation(currentEquation); return; }

  currentEquation.firstNum = Calculate(currentEquation);
  currentEquation.operator = character;

  if (character === "𝑥²" || character === "²√𝑥") {
    EvaluateEquation(currentEquation);
  } else {
    UpdateEquationText(currentEquation);
    ClearCurrentNum();
  }
}

function EvaluateEquation(currentEquation)
{
  //If the user wants to start a new equation after this, this bool with clear the currentNum when a new number is pressed.
  endEquation = true;

  currentNum.textContent = Calculate(currentEquation);;

  ClearEquationText();
  ClearCurrentEquation(currentEquation);
}




//#region Edit Calculator Screen
function UpdateCurrentNum(character) {
  //If the user has finished with the current equation, reset the screen
  if (endEquation) {
    ClearAll(currentEquation);
    endEquation = false;
  }

  //Remove the leading 0
  if (currentNum.textContent === "0") currentNum.textContent = "";
  //If an equation is already started, add this character
  if (equationText.textContent !== "") equationText.textContent += character;

  currentNum.textContent += character;
}

function UpdateEquationText(currentEquation)
{
  equationText.textContent = currentEquation.firstNum + " " + currentEquation.operator + " ";
}

function ClearAll(currentEquation) 
{
  ClearEquationText();
  ClearCurrentNum();
  ClearCurrentEquation(currentEquation);
}

function ClearCurrentEquation(currentEquation) {
  currentEquation.operator = "";
  currentEquation.firstNum = "";
  currentEquation.secondNum = "";
}

function ClearCurrentNum() 
{
  if(currentNum.textContent !== null) { currentNum.textContent = "0"; }
}

function ClearEquationText()
{
  equationText.textContent = "";
}

function PlusMinus() 
{
  if(currentNum.textContent === "0") return;

  if (currentNum.textContent.toString().charAt(0) === "−") {
    currentNum.textContent = currentNum.textContent.slice(1);
  } else {
    currentNum.textContent = "−" + currentNum.textContent;
  }
}

function BackSpace() 
{
  if (currentNum.textContent === "") ClearCurrentNum();
  if (currentNum.textContent === "0") return;

  currentNum.textContent = currentNum.textContent.slice(0, -1)
  equationText.textContent = equationText.textContent.slice(0, -1);

  if (currentNum.textContent === "") ClearCurrentNum();
}
//#endregion

//#region Operation functions

function Calculate(currentEquation) 
{
  let num1 = parseFloat(currentEquation.firstNum, 10);
  let num2 = parseFloat(currentEquation.secondNum, 10);

  if (currentEquation.operator === "+") return Add(num1, num2);
  if (currentEquation.operator === "−") return Subtract(num1, num2);
  if (currentEquation.operator === "×") return Multiply(num1, num2);
  if (currentEquation.operator === "÷") return Divide(num1, num2);
  if (currentEquation.operator === "%") return Percentage(num1, num2);
  if (currentEquation.operator === "𝑥²") return Square(num1);
  if (currentEquation.operator === "²√𝑥") return SquareRoot(num1);

  //Limit decimal place, look at example
}

function Add(num1, num2) 
{
  return num1 + num2;
}

function Subtract(num1, num2) 
{
  return num1 - num2;
}

function Multiply(num1, num2) 
{
  return num1 * num2;
}

function Divide(num1, num2) 
{
  if (num2 === 0) { endEquation = true; return "No dividing by zero"; }

  return num1 / num2;
}

function Percentage(num, percentage) 
{
  return num * (percentage / 100);
}

function Square(num)
{
  return num * num;
}

function SquareRoot(num) 
{
  return Math.sqrt(num);
}

//#endregion

function handleKeyboardInput(e)
{
  if (e.key >= 0 && e.key <= 9) UpdateCurrentNum(e.key);
  if (e.key === ".") UpdateCurrentNum(e.key);
  if (e.key === "Backspace") BackSpace(currentNum.textContent);
  if (e.key === "Escape") ClearAll(currentEquation);
  if (e.key === "=" || e.key === "Enter") OperatorClicked("=");
  if (e.key === "+") OperatorClicked("+");
  if (e.key === "-") OperatorClicked("−");
  if (e.key === "*") OperatorClicked("×");
  if (e.key === "/") OperatorClicked("÷");
}