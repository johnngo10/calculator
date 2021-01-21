function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {}

// Display
const display = document.getElementById('display');
const clear = document;

let displayNum = '';
let firstNum = '';
let operator = '';
let entireCalc = '';

function displayFunc(e) {
  if (e === 'clear') {
    displayNum = '0';
  } else if (displayNum === '0') {
    displayNum = e;
  } else {
    displayNum += e;
  }
  display.textContent = displayNum;
}

// Buttons
const buttons = document.querySelectorAll('.buttons');

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', e => {
    let target = e.target.id;

    displayFunc(target);
  });
}

// Operators
const operButtons = document.querySelectorAll('.oper-buttons');

for (i = 0; i < operButtons.length; i++) {
  operButtons[i].addEventListener('click', e => {
    let target = e.target.id;
    displayNum.split('');
    if (displayNum.indexOf(target) < 0) {
      operator = target;
      displayNum = firstNum;
      //
    } else {
      operate(operator, firstNum, displayNum);
    }
    displayFunc(target);
  });
}

// Calculate
const equals = document.getElementById('equals');

equals.addEventListener('click', e => {});
