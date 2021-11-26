let neg = 1;
//calculator object
const calculator = {
  displayValue: '0', //input of the user or the result of an operation
  firstOperand: null, //first operand for any expression
  waitingForSecondOperand: false,// check if both the first operand and the operator have been inputted
  operator: null, //operator for an expression
};

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    // If the waitingForSecondOperand property is set to true, the displayValue property is overwritten with the digit that was clicked.
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
     // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  //If waitingForSecondOperand is set to true and a decimal point is entered, displayValue becomes 0. and waitingForSecondOperand is set to false so that any additional digits are appended as part of the second operand
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = "0."
    calculator.waitingForSecondOperand = false;
    return
  }
 // If the `displayValue` property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);
 // checks if an operator already exists and if waitingForSecondOperand is set to true 
  //the value of the operator property is replaced with the new operator 
 /*  if (operator && calculator.waitingForSecondOperand)  { 
    calculator.operator = nextOperator;
return;
  }
*/
if (operator && calculator.waitingForSecondOperand)  { 
    if (nextOperator  === '-'){
  calculator.operator = operator; 
     neg=-1;
    return;
    } else {
    calculator.operator = nextOperator;
      neg=1;
 }
 return;
  }
 

// verify that `firstOperand` is null and that the `inputValue` is not a `NaN` 
  if (firstOperand == null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    //checks if the operator property has been assigned an operator
    //If so, the calculate function is invoked and the result is saved in the result variable
       const result = calculate(firstOperand, (inputValue*neg), operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  neg = '1';
}

function updateDisplay() {
  // select the element with class of `calculator-screen`
  const display = document.querySelector('.calculator-screen');
 // update the value of the element with the contents of `displayValue`
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  // Check if the clicked element is a button.
  // If not, exit from the function
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    handleOperator(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.value);
		updateDisplay();
    return;
  }

  if (target.classList.contains('btn-clear')) {
    resetCalculator();
		updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});