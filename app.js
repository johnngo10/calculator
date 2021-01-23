const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons');
const operButtons = document.querySelectorAll('.oper-buttons');
const decimal = document.getElementById('.');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
let displayNum = '';
let firstNum = '';
let operator = '';
let result;
let calculated = false;

function round(num) {
  if (num.toString().length > 13 && num.toString().indexOf('.')) {
    const numArr = num.toString().split('');
    const shortenArr = [];
    for (i = 0; i < 13; i++) {
      shortenArr.push(numArr[i]);
    }
    // const decimal = shorten.indexOf('.');
    const shorten = shortenArr.join('');
    const roundedNum = Number.parseFloat(shorten).toExponential(5);

    return roundedNum;
  } else {
    return num;
  }
}

function add(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  let answer = num1 + num2;
  round(answer);

  result = answer;
}

function subtract(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  result = num1 - num2;
}

function multiply(a, b) {
  let num1 = Number(a);
  let num2 = Number(b);
  let answer = num1 * num2;
  result = round(answer);
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

function displayFunc(e) {
  if (displayNum === '0' && calculated === true) {
    calculated = false;
    firstNum = '';
    displayNum = e;
  } else if (displayNum === '0' && calculated === false) {
    displayNum = e;
  } else {
    displayNum += e;
  }
  display.textContent = displayNum;
}

// Buttons

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', e => {
    let target = e.target.id;

    if (displayNum.length < 13) {
      displayFunc(target);
    }
  });
}

// Operators

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

equals.addEventListener('click', e => {
  if (calculated === false && operator !== '') {
    operate(operator, firstNum, displayNum);
    display.textContent = result;
    firstNum = result;
    displayNum = '0';
    calculated = true;
  }
});

// Clear

clear.addEventListener('click', e => {
  displayNum = '0';
  firstNum = '';
  operator = '';
  result = '';
  calculated = false;
  displayFunc(displayNum);
});

// Keyboard Support

window.onkeyup = function (e) {
  let key = e.key;
  let regDigit = /Digit/;
  if (e.code.match(regDigit)) {
    displayFunc(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    if (firstNum === '') {
      operator = key;
      firstNum = displayNum;
    } else if (firstNum !== '' && calculated === false) {
      operate(operator, firstNum, displayNum);
      display.textContent = result;
      firstNum = result;
      operator = key;
    } else if (calculated === true) {
      operator = key;

      calculated = false;
    } else {
      console.log('error');
    }

    displayNum = '0';
  } else if (key === 'Enter') {
    if (calculated === false && operator !== '') {
      operate(operator, firstNum, displayNum);
      display.textContent = result;
      firstNum = result;
      displayNum = '0';
      calculated = true;
    }
  } else if (key === 'Backspace') {
    displayNum = '0';
    firstNum = '';
    operator = '';
    result = '';
    calculated = false;
    displayFunc(displayNum);
  }
};
