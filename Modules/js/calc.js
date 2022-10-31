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
numButtons.forEach((button) => button.addEventListener("click", () => AppendCurrentNum(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => OperatorClicked(button.textContent)));
document.body.onload = ClearCurrentNum();
//#endregion

function OperatorClicked(character)
{
  if (currentEquation.firstNum === "") StartEquation(character);
  else finishEquation(character);
}

function StartEquation(character) 
{
  currentEquation.operator = character;
  currentEquation.firstNum = currentNum.textContent;

  if (currentEquation.operator === "𝑥²" || currentEquation.operator === "²√𝑥") 
  {
    EvaluateEquation(currentEquation);
  } 
  else if(currentEquation.operator === "=")
  {
    currentNum.textContent = currentEquation.firstNum;
  } 
  else 
  {
    equationText.textContent = currentEquation.firstNum + " " + currentEquation.operator + " ";
    ClearCurrentNum();
  }
}

function finishEquation(character)
{
  currentEquation.secondNum = currentNum.textContent;

  if(character === "=")
  {
    EvaluateEquation(currentEquation);
  }
  else
  {
    currentEquation.firstNum = Operate(currentEquation);
    currentEquation.operator = character;
    equationText.textContent = currentEquation.firstNum + " " + currentEquation.operator + " ";
    ClearCurrentNum();
  }
}

function EvaluateEquation(currentEquation)
{
  let answer = Operate(currentEquation);

  endEquation = true;
  currentNum.textContent = answer;

  ClearEquationText();
  ClearCurrentEquation(currentEquation);
}

function AppendCurrentNum(character) 
{
  if(endEquation) 
  {
    ClearAll(currentEquation);
    endEquation = false;
  }

  if(currentNum.textContent === "0") BackSpace();

  currentNum.textContent += character;
}

function BackSpace() 
{
  currentNum.textContent = currentNum.textContent.slice(0, -1);
}

function ClearAll(currentEquation) 
{
  ClearEquationText();
  ClearCurrentNum();
  ClearCurrentEquation(currentEquation);
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
  if (currentNum.textContent.toString().charAt(0) === "-") {
    currentNum.textContent = currentNum.textContent.slice(1);
  } else {
    currentNum.textContent = "-" + currentNum.textContent;
  }
}

function ClearCurrentEquation(currentEquation)
{
  currentEquation.operator = "";
  currentEquation.firstNum = "";
  currentEquation.secondNum = "";
}

//#region Operation functions

function Operate(currentEquation) 
{
  let num1 = parseInt(currentEquation.firstNum);
  let num2 = parseInt(currentEquation.secondNum);

  if ((currentEquation.operator === "+")) return Add(num1, num2);
  if (currentEquation.operator === "−") return Subtract(num1, num2);
  if ((currentEquation.operator === "x")) return Multiply(num1, num2);
  if (currentEquation.operator === "÷") return Divide(num1, num2);
  if ((currentEquation.operator === "^")) return Power(num1, num2);
  if ((currentEquation.operator === "%")) return Percentage(num1, num2);
  if (currentEquation.operator === "𝑥²") return Square(num1);
  if (currentEquation.operator === "²√𝑥") return SquareRoot(num1);
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
  if (num2 === 0) return null;

  return num1 / num2;
}

function Power(num, power) 
{
  return Math.pow(num, power);
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