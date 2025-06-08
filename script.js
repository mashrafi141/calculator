const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');

let currentInput = '0';
let operator = '';
let firstOperand = null;
let resetNext = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function handleNumber(num) {
  if (currentInput === '0' || resetNext) {
    currentInput = num;
    resetNext = false;
  } else {
    currentInput += num;
  }
}

function handleOperator(op) {
  if (firstOperand === null) {
    firstOperand = parseFloat(currentInput);
  } else if (!resetNext) {
    firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
  }
  operator = op;
  expressionDisplay.textContent = firstOperand + ' ' + operator;
  resetNext = true;
}

function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b !== 0 ? a / b : 'Error';
    default: return b;
  }
}

function handleEquals() {
  if (operator !== '') {
    const secondOperand = parseFloat(currentInput);
    const result = calculate(firstOperand, secondOperand, operator);
    expressionDisplay.textContent = `${firstOperand} ${operator} ${secondOperand} =`;
    currentInput = result.toString();
    firstOperand = null;
    operator = '';
    resetNext = true;
  }
}

function clearDisplay() {
  currentInput = '0';
  firstOperand = null;
  operator = '';
  resetNext = false;
  expressionDisplay.textContent = '';
}

function backspace() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = '0';
  }
}

function toggleSign() {
  if (currentInput !== '0') {
    if (currentInput.startsWith('-')) {
      currentInput = currentInput.slice(1);
    } else {
      currentInput = '-' + currentInput;
    }
  }
}

function handleFunctionButton(func) {
  let num = parseFloat(currentInput);
  switch (func) {
    case '%':
      currentInput = (num / 100).toString();
      break;
    case 'x²':
      currentInput = (num * num).toString();
      break;
    case '√x':
      currentInput = num >= 0 ? Math.sqrt(num).toString() : 'Error';
      break;
    case '1/x':
      currentInput = num !== 0 ? (1 / num).toString() : 'Error';
      break;
  }
  resetNext = true;
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;

    if (!isNaN(val) || val === '.') {
      handleNumber(val);
    } else if (['+', '-', '*', '/'].includes(val)) {
      handleOperator(val);
    } else if (val === '=') {
      handleEquals();
    } else if (val === 'C' || val === 'CE') {
      clearDisplay();
    } else if (val === '⌫') {
      backspace();
    } else if (val === '+/-') {
      toggleSign();
    } else if (['%', 'x²', '√x', '1/x'].includes(val)) {
      handleFunctionButton(val);
    }

    updateDisplay();
  });
});

updateDisplay();
