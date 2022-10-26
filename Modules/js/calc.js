

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