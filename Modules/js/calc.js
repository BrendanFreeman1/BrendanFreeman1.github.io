//#region Initialise variables
const equationText = document.querySelector(".equationText");
const outputText = document.querySelector(".outputText");
const clearAllBtn = document.querySelector(".clearAllBtn");
const backSpaceBtn = document.querySelector(".backSpaceBtn");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const numButtons = document.querySelectorAll(".numBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let displayText = "";

clearAllBtn.addEventListener("click", () => ClearDisplay());
backSpaceBtn.addEventListener("click", () => BackSpace(outputText.textContent));
plusMinusBtn.addEventListener("click", () => PlusMinus(outputText.textContent));
numButtons.forEach((button) => button.addEventListener("click", () => AppendOutput(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => AppendOutput(button.textContent)));


//#endregion

//once a number, operand and number are pressed the display text moves to the equation textContent and the 
//result of the equation is displayed in the display textContent where the user can continue to enter
//another operand and number for a new equation to be calculated. 



function AppendOutput(character)
{
    displayText += character;
    UpdateDisplayText(displayText);
}

function BackSpace(displayText) 
{
  displayText = displayText.slice(0, -1);

  UpdateDisplayText(displayText);
}

function ClearDisplay()
{
    displayText = "";
    UpdateDisplayText(displayText);
}

function PlusMinus(displayText) 
{
  if(displayText.toString().charAt(0) === "-") { displayText = displayText.slice(1); }
  else {displayText = "-"+displayText; }

  UpdateDisplayText(displayText);
}

function UpdateDisplayText(displayText)
{
    outputText.textContent = displayText;
}



//#region Operation Class

class operation 
{
  Constructor(num1, operator, num2) 
  {
    this.num1 = num1;
    this.operator = operator;
    this.num2 = num2;
  }  
}
//#endregion

//#region Operation functions

function Operate(operation) {
    operator = operation.operand;

    if ((operator = "+")) return add(operation.num1, operation.num2);
    if ((operator = "-")) return subtract(operation.num1, operation.num2);
    if ((operator = "*")) return multiply(operation.num1, operation.num2);
    if ((operator = "/")) return divide(operation.num1, operation.num2);
    if ((operator = "^")) return power(operation.num1, operation.num2);
    if ((operator = "%")) return percentage(operation.num1, operation.num2);
    if ((operator = "√")) return squareRoot(operation.num1);
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