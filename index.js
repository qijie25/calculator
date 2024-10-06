const resultDisplay = document.getElementById('result');
const calculationDisplay = document.getElementById('calculation');
let currentInput = ''; 
let operator = ''; 
let firstNumber = ''; 
let secondNumber = '';
let resultDisplayed = false;
let lastOperator = '';
let lastSecondNumber = '';
let storedAnswer = '';

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

// Add event listeners to other buttons
document.getElementById('percentage').addEventListener('click', () => calculatePercentage());
document.getElementById('factorial').addEventListener('click', () => calculateFactorial());
document.getElementById('power').addEventListener('click', () => setOperator('**'));
document.getElementById('change').addEventListener('click', () => changeSign());
document.getElementById('square').addEventListener('click', () => calculateSquareRoot());
document.getElementById('pi').addEventListener('click', () => appendNumber(Math.PI));
document.getElementById('decimal').addEventListener('click', () => appendNumber('.'));

// Add event listener to equal button to perform calculation
document.getElementById('equal').addEventListener('click', calculateResult);

// Add event listener to clear and backspace button
document.getElementById('clear').addEventListener('click', clearResult);
document.getElementById('backspace').addEventListener('click', backspace);

// Add event listener to answer button to store the result for later use
document.getElementById('answer').addEventListener('click', storeAnswer);

// Function to calculate percentage of the current input
function calculatePercentage() {
    if (currentInput === '') return;

    let originalInput = currentInput;

    // Convert the current input to a percentage
    let percentageValue = parseFloat(currentInput) / 100;
    resultDisplay.value = percentageValue; // Display the percentage value

    // Store the percentage value in the current input for further calculations
    currentInput = percentageValue.toString();

    if (operator) {
        calculationDisplay.value = firstNumber + ' ' + operator + ' ' + originalInput + '%';
    } else {
        calculationDisplay.value = originalInput + '%';
    }
}

function calculateFactorial() {
    if (currentInput === '') return;

    let originalInput = currentInput;

    // Calculate the factorial of the current input
    let factorialValue = 1;
    for (let i = 1; i <= parseFloat(currentInput); i++) {
        factorialValue *= i;
    }
    resultDisplay.value = factorialValue;

    // Store the factorial value in the current input for further calculations
    currentInput = factorialValue.toString();

    if (operator) {
        calculationDisplay.value = firstNumber + ' ' + operator + ' ' + originalInput + '!';
    } else {
        calculationDisplay.value = originalInput + '!';
    }
}

function changeSign() {
    if (currentInput === '') return;

    // Change the sign of the current input
    currentInput = parseFloat(currentInput) * -1;
    resultDisplay.value = currentInput;

    if (operator) {
        calculationDisplay.value = firstNumber + ' ' + operator + ' ' + currentInput;
    } else {
        calculationDisplay.value = currentInput;
    }

    // Store the changed sign in the current input for further calculations
    currentInput = currentInput.toString();
}

function calculateSquareRoot() {
    if (currentInput === '') return;

    let originalInput = currentInput;

    // Calculate the square root of the current input
    let squareRootValue = Math.sqrt(parseFloat(currentInput));
    resultDisplay.value = squareRootValue;

    // Store the square root value in the current input for further calculations
    currentInput = squareRootValue.toString();
    calculationDisplay.value = '√' + '(' + originalInput + ')';
}

function backspace() {
    if (resultDisplayed) {
        resultDisplay.value = '';
        resultDisplayed = false;
    } else if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
        calculationDisplay.value = firstNumber + ' ' + operator + ' ' + currentInput;
    }
}

function storeAnswer() {
    if (storedAnswer === '') return;

    currentInput = storedAnswer.toString(); // Set the stored answer as the current input
    resultDisplay.value = currentInput; // Update the display

    if (operator) {
        calculationDisplay.value = firstNumber + ' ' + operator + ' ' + currentInput; // Show the answer as part of the operation
    } else {
        calculationDisplay.value = currentInput; // Otherwise, display the answer
    }
}

// Function to append a number to the current input
function appendNumber(number) {
    // Prevent multiple decimal points
    if (number === '.' && currentInput.includes('.')) {
        return;
    }

    if (resultDisplayed) {
        currentInput = ''; // Start new input after result is displayed
        resultDisplayed = false;
    }

    currentInput += number;
    if (operator) {
        // If an operator is selected, display first number + operator + second number
        calculationDisplay.value = firstNumber + ' ' + operator + ' ' + currentInput;
    } else {
        calculationDisplay.value = currentInput; // Otherwise, just display the current number
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
    calculationDisplay.value = firstNumber + ' ' + operator;
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
        case '**':
            result = parseFloat(firstNumber) ** parseFloat(secondNumber);
            break;
        default:
            return;
    }

    resultDisplay.value = result; // Show the result in the input field
    calculationDisplay.value = firstNumber + ' ' + operator + ' ' + secondNumber; // Show the full calculation
    firstNumber = result; // Store the result as the first number for further operations
    storedAnswer = result;
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
    calculationDisplay.value = '';
}
