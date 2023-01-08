const numbersBtn = document.querySelectorAll('[data-number]');
const operatorsBtn = document.querySelectorAll('[data-operation]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevValue = document.querySelector('[data-prev-value]');
const currentValue = document.querySelector('[data-current-value]');

class Calculator {
  constructor(prevValue, currentValue) {
    this.currentValue = currentValue;
    this.prevValue = prevValue;
    this.clearAll();
  }
  //delete last number
  deleteLastNumber() {
    if (this.currentOperand === '') return;
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  clearAll() {
    //second value
    this.prevOperand = '';
    //first value
    this.currentOperand = '';
    //clear operation
    this.operation = undefined;
  }

  appendNumber(number) {
    //check if we already have a period
    if (number === '.' && this.currentOperand.includes('.')) return;
    //concatenation string values
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  operations(operation) {
    //check if operation is existing or null/undefined
    if (this.currentOperand === '') return;
    if (this.prevOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.prevOperand = '';
  }

  updateDisplay() {
    this.currentValue.textContent = this.currentOperand;
    if (this.operation != null) {
      this.prevValue.textContent = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevValue.textContent = '';
    }
  }
}

const calculator = new Calculator(prevValue, currentValue);

numbersBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operatorsBtn.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.operations(button.textContent);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearBtn.addEventListener('click', () => {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
  calculator.deleteLastNumber();
  calculator.updateDisplay();
});
