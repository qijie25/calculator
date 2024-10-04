const resultDisplay = document.getElementById('result');
let currentInput = ''; 
let operator = ''; 
let firstNumber = ''; 
let secondNumber = '';
let resultDisplayed = false;
let lastOperator = '';
let lastSecondNumber = '';

// Add event listeners to number buttons
document.getElementById('one').addEventListener('click', () => appendNumber(1));
document.getElementById('two').addEventListener('click', () => appendNumber(2));
document.getElementById('three').addEventListener('click', () => appendNumber(3));
document.getElementById('four').addEventListener('click', () => appendNumber(4));
document.getElementById('five').addEventListener('click', () => appendNumber(5));
document.getElementById('six').addEventListener('click', () => appendNumber(6));
document.getElementById('seven').addEventListener('click', () => appendNumber(7));
document.getElementById('eight').addEventListener('click', () => appendNumber(8));
document.getElementById('nine').addEventListener('click', () => appendNumber(9));
document.getElementById('zero').addEventListener('click', () => appendNumber(0));

// Add event listeners to operator buttons
document.getElementById('addition').addEventListener('click', () => setOperator('+'));
document.getElementById('subtraction').addEventListener('click', () => setOperator('-'));
document.getElementById('multiply').addEventListener('click', () => setOperator('*'));
document.getElementById('divide').addEventListener('click', () => setOperator('/'));

// Add event listener to equal button to perform calculation
document.getElementById('equal').addEventListener('click', calculateResult);

// Add event listener to clear button
document.getElementById('clear').addEventListener('click', clearResult);

// Function to append a number to the current input
function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = ''; // Start new input after result is displayed
        resultDisplayed = false;
    }

    currentInput += number;
    if (operator) {
        // If an operator is selected, display first number + operator + second number
        resultDisplay.value = firstNumber + ' ' + operator + ' ' + currentInput;
    } else {
        resultDisplay.value = currentInput; // Otherwise, just display the current number
    }
}

// Function to set the operator and update the display
function setOperator(op) {
    if (currentInput === '') return;

    if (firstNumber === '') {
        firstNumber = currentInput; 
    } else if (!resultDisplayed) {
        // If an operator is clicked again without pressing '=', calculate intermediate result
        calculateResult();
        firstNumber = resultDisplay.value; // Set the result as the first number for the next operation
    }

    operator = op;
    lastOperator = operator; // Store last operator for repeated calculations
    currentInput = ''; // Reset input for the second number
    resultDisplay.value = firstNumber + ' ' + operator;
}

// Function to perform the calculation and display the result
function calculateResult() {
    if (operator === '' && lastOperator === '') return;

    // If no new second number is entered, use the last second number for repeated operations
    if (currentInput === '' && lastSecondNumber !== '') {
        secondNumber = lastSecondNumber;
    } else {
        secondNumber = currentInput;
        lastSecondNumber = secondNumber; // Save the second number for repeated operations
    }

    let result;

    switch (operator || lastOperator) {
        case '+':
            result = parseFloat(firstNumber) + parseFloat(secondNumber);
            break;
        case '-':
            result = parseFloat(firstNumber) - parseFloat(secondNumber);
            break;
        case '*':
            result = parseFloat(firstNumber) * parseFloat(secondNumber);
            break;
        case '/':
            if (parseFloat(secondNumber) === 0) {
                showMathError(); // Handle division by zero
                return;
            }
            result = parseFloat(firstNumber) / parseFloat(secondNumber);
            break;
        default:
            return;
    }

    resultDisplay.value = result; // Show the result in the input field
    firstNumber = result; // Store the result as the first number for further operations
    currentInput = ''; // Reset input for further numbers
    resultDisplayed = true; // Result has been displayed
    operator = ''; // Reset operator to continue operations
}

function showMathError() {
    resultDisplay.value = 'Math Error';

    setTimeout(() => {
        clearResult();
    }, 3000);
}

// Function to clear the result and reset everything
function clearResult() {
    currentInput = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    lastSecondNumber = '';
    lastOperator = '';
    resultDisplayed = false;
    resultDisplay.value = '';
}
