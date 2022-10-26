//#region Initialise variables
const equationText = document.querySelector(".equationText");
const outputText = document.querySelector(".outputText");
const plusMinusBtn = document.querySelector(".plusMinusBtn")
const squareRootBtn = document.querySelector(".squareRootBtn");
const percentBtn = document.querySelector(".percentBtn");
const clearBtn = document.querySelector(".clearBtn");
const divideBtn = document.querySelector(".divideBtn");
const sevenBtn = document.querySelector(".sevenBtn");
const eightBtn = document.querySelector(".eightBtn");
const nineBtn = document.querySelector(".nineBtn");
const multiplyBtn = document.querySelector(".multiplyBtn");
const fourBtn = document.querySelector(".fourBtn");
const fiveBtn = document.querySelector(".fiveBtn");
const sixBtn = document.querySelector(".sixBtn");
const subtractBtn = document.querySelector(".subtractBtn");
const oneBtn = document.querySelector(".oneBtn");
const twoBtn = document.querySelector(".twoBtn");
const threeBtn = document.querySelector(".threeBtn");
const addBtn = document.querySelector(".addBtn");
const zeroBtn = document.querySelector(".zeroBtn");
const decimalBtn = document.querySelector(".decimalBtn");
const backSpaceBtn = document.querySelector(".backSpaceBtn");
const equalsBtn = document.querySelector(".equalsBtn");
//#endregion

//Variable for display text
//As buttons are pressed, they are added to the display text variable and textContent is updated
//once a number, operand and number are pressed the display text moves to the equation textContent and the 
//result of the equation is displayed in the display textContent where the user can continue to enter
//another operand and number for a new equation to be calculated. 



function operate(operator, num1, num2)
{
    if(operator = "+") return add(num1,num2);
    if(operator = "-") return subtract(num1,num2);
    if(operator = "*") return multiply(num1,num2);
    if(operator = "/") return divide(num1,num2);
    if(operator = "^") return power(num1,num2);
    if(operator = "%") return percentage(num1,num2);
    if(operator = "√") return squareRoot(num1,num2);
}

//#region Math Functions

function add(num1, num2)
{
    return num1 + num2; 
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2) 
{
    return num1 * num2;
}

function divide(num1, num2)
{
    if(num2 === 0) return null;

    return num1 / num2;
}

function power(num, power)
{
    return Math.pow(num, power);
}

function percentage(num, percentage)
{
    return num * (percentage / 100);
}

function squareRoot(num)
{
    return Math.sqrt(num);
}

//#endregion