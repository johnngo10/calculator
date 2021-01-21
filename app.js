function add(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  let round = num1 + num2;
  result = round.toFixed(8);
  return result;
}

function subtract(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  result = num1 - num2;
}

function multiply(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  result = num1 * num2;
}

function divide(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  result = num1 / num2;
}

function operate(operator, num1, num2) {
  if (operator === '+') {
    add(num1, num2);
  } else if (operator === '-') {
    subtract(num1, num2);
  } else if (operator === 'x') {
    multiply(num1, num2);
  } else if (operator === '/') {
    divide(num1, num2);
  }
}

// Display
const display = document.getElementById('display');

let displayNum = '';
let firstNum = '';
let operator = '';
let result;
let calculated = false;

function displayFunc(e) {
  if (displayNum === '0') {
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

    if (firstNum === '') {
      operator = target;
      firstNum = displayNum;
    } else if (firstNum !== '' && calculated === false) {
      operate(operator, firstNum, displayNum);
      display.textContent = result;
      firstNum = result;
      operator = target;
    } else if (calculated === true) {
      operator = target;

      calculated = false;
    } else {
      console.log('error');
    }

    displayNum = '0';
  });
}

// Decimal
const decimal = document.getElementById('.');

decimal.addEventListener('click', e => {
  const target = e.target.id;

  if (displayNum === '0') {
    displayNum += target;
    display.textContent = displayNum;
  } else if (displayNum.indexOf(target) < 0) {
    displayFunc(target);
  }
});

// Calculate
const equals = document.getElementById('equals');

equals.addEventListener('click', e => {
  if (calculated === false) {
    operate(operator, firstNum, displayNum);
    display.textContent = result;
    firstNum = result;
    calculated = true;
  }
});

// clear
const clear = document.getElementById('clear');
clear.addEventListener('click', e => {
  displayNum = '0';
  firstNum = '';
  operator = '';
  result = '';
  calculated = false;
  displayFunc(displayNum);
});
