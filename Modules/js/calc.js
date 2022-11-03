//#region Operation Class
class Operation 
{
  constructor(firstOperator, secondOperator, firstNum, secondNum) 
  {
    this.firstOperator = firstOperator;
    this.secondOperator = secondOperator;
    this.firstNum = firstNum;
    this.secondNum = secondNum;
  }

  Calculate() 
  {
    let num1 = parseFloat(this.firstNum);
    let num2 = parseFloat(this.secondNum);

    if (this.firstOperator === "+") return this.Add(num1, num2);
    if (this.firstOperator === "−") return this.Subtract(num1, num2);
    if (this.firstOperator === "×") return this.Multiply(num1, num2);
    if (this.firstOperator === "÷") return this.Divide(num1, num2);
    if (this.firstOperator === "%") return this.Percentage(num1, num2);
    if (this.firstOperator === "𝑥²") return this.Square(num1);
    if (this.firstOperator === "²√𝑥") return this.SquareRoot(num1);

    //Limit answers decimal places
    //return Math.round(answer * 100) / 100;
  }

  Add(num1, num2) 
  {
    return num1 + num2;
  }

  Subtract(num1, num2) 
  {
    return num1 - num2;
  }

  Multiply(num1, num2) 
  {
    return num1 * num2;
  }

  Divide(num1, num2) 
  {
    if (num2 === 0) { endEquation = true; }

    return num1 / num2;
  }

  Percentage(num, percentage) 
  {
    return num * (percentage / 100);
  }

  Square(num)
  {
    return num * num;
  }

  SquareRoot(num) 
  {
    return Math.sqrt(num);
  }

  ClearAll()
  {
    this.firstOperator = "";
    this.secondOperator = "";
    this.firstNum = "0";
    this.secondNum = "";
  }
}
//#endregion

//#region Initialise variables
const equationText = document.querySelector(".equationText");
const currentNum = document.querySelector(".currentNum");
const numButtons = document.querySelectorAll(".numBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let currentEquation = new Operation();

numButtons.forEach((button) => button.addEventListener("click", () => NumberClicked(button.textContent)));
operatorBtn.forEach((button) => button.addEventListener("click", () => OperatorClicked(button.textContent)));
window.addEventListener("keydown", handleKeyboardInput);
document.body.onload = ClearAll();

//#endregion

function NumberClicked(character)
{
  if(currentEquation.firstOperator === "")
  {
    PopulateFirstNum(character)   
    return;
  }

    PopulateSecondNum(character);
}

function OperatorClicked(character)
{
  if (character === "AC") { ClearAll();  return; }
  if (character === "⌫") { BackSpace(); return; }
  if (character === "+/−") { PlusMinus(); return; }

  if(currentEquation.firstOperator === "") 
  { 
    currentEquation.firstOperator = character; 
    SetCurrentNum(currentEquation.secondNum); 
  } else { 
    currentEquation.secondOperator = character;  
  }  

  if (character === "𝑥²") { calcSquare(); return; }
  if (character === "²√𝑥") {calcSquareRoot(); return;}
  if (character === "=") SetCurrentNum(currentEquation.Calculate());

}


function SetCurrentNum(number)
{
  currentNum.textContent = number;
  SetEquationText();
}

function SetEquationText()
{
  
  equationText.textContent = currentEquation.firstNum + " " + currentEquation.firstOperator + " " + currentEquation.secondNum + " " + currentEquation.secondOperator;
}

function PopulateFirstNum(character)
{
  if (currentEquation.firstNum === "0") currentEquation.firstNum = "";
  currentEquation.firstNum += character;
  SetCurrentNum(currentEquation.firstNum);

  currentEquation.secondNum = "0";
}

function PopulateSecondNum(character) 
{
  if (currentEquation.secondNum === "0") currentEquation.secondNum = "";
  currentEquation.secondNum += character;
  SetCurrentNum(currentEquation.secondNum);
}

function ClearAll()
{
  currentEquation.ClearAll();
  SetCurrentNum(currentEquation.firstNum);
  SetEquationText();
}

function BackSpace()
{
  if(currentNum.textContent === "0") return;
  let operand;

  if(currentEquation.firstOperator === "") operand = currentEquation.firstNum;
  else operand = currentEquation.secondNum;

  operand = operand.slice(0, -1);
  SetCurrentNum(operand);
}

function PlusMinus()
{
  if(currentEquation.firstOperator === "") 
  {
    if(currentEquation.firstNum.charAt(0) === "−") 
      currentEquation.firstNum = currentEquation.firstNum.slice(1);
    else currentEquation.firstNum = "−" + currentEquation.firstNum;

    SetCurrentNum(currentEquation.firstNum);
  }else{
    if (currentEquation.secondNum.charAt(0) === "−")
      currentEquation.secondNum = currentEquation.secondNum.slice(1);
    else currentEquation.secondNum = "−" + currentEquation.secondNum;

    SetCurrentNum(currentEquation.secondNum);
  }
}

function calcSquare() {
  SetCurrentNum(currentEquation.Calculate());
  equationText.textContent = currentEquation.firstNum + "²";
}

function calcSquareRoot() {
  SetCurrentNum(currentEquation.Calculate());
  equationText.textContent = "√" + currentEquation.firstNum;
}

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