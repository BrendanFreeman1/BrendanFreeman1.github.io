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
const displayText = document.querySelector(".displayText");
const clearAllBtn = document.querySelector(".clearAllBtn");
const backSpaceBtn = document.querySelector(".backSpaceBtn");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const numButtons = document.querySelectorAll(".numBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let currentEquation = new operation();
let equationTextClear = true;


clearAllBtn.addEventListener("click", () => ClearDisplay());
backSpaceBtn.addEventListener("click", () => BackSpace(displayText.textContent));
plusMinusBtn.addEventListener("click", () => PlusMinus(displayText.textContent));
numButtons.forEach((button) => button.addEventListener("click", () => AppendDisplayText(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => OperatorClicked(button.textContent)));

//#endregion

function OperatorClicked(character) {
  if(equationTextClear)
  {
    //Populate first num and operator
    currentEquation.operator = character;
    currentEquation.num1 = displayText.textContent;
    equationText.textContent = displayText.textContent + " " + character;

    equationTextClear = false;
    ClearDisplay();

  }else{
    //Populate second num and display answer
    currentEquation.num2 = displayText.textContent;
    equationText.textContent = equationText.textContent + " " + currentEquation.num2;

    let answer = Operate(currentEquation);
    displayText.textContent = answer;

    if(character === "=")
    {
      ClearCurrentEquation(currentEquation);
    }else{
      currentEquation.num1 = answer;
      currentEquation.operator = character;
    }
  }
}

function AppendDisplayText(character) {
  displayText.textContent += character;
}

function BackSpace() {
  displayText.textContent = displayText.textContent.slice(0, -1);
}

function ClearDisplay() {
  displayText.textContent = "";
}

function PlusMinus() {
  if (displayText.textContent.toString().charAt(0) === "-") {
    displayText.textContent = displayText.textContent.slice(1);
  } else {
    displayText.textContent = "-" + displayText.textContent;
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
  let operator = currentEquation.operator;
  currentEquation.num1 = parseInt(currentEquation.num1);
  currentEquation.num2 = parseInt(currentEquation.num2);

  if ((operator = "+")) return Add(currentEquation.num1, currentEquation.num2);
  if ((operator = "-")) return Subtract(currentEquation.num1, currentEquation.num2);
  if ((operator = "*")) return Multiply(currentEquation.num1, currentEquation.num2);
  if ((operator = "/")) return Divide(currentEquation.num1, currentEquation.num2);
  if ((operator = "^")) return Power(currentEquation.num1, currentEquation.num2);
  if ((operator = "%")) return Percentage(currentEquation.num1, currentEquation.num2);
  if ((operator = "√")) return SquareRoot(currentEquation.num1);
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
