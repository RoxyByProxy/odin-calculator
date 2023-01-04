//1 create basic functions
    //1.a add
    //1.b subtract
    //1.c multiply
    //1.d divide
//2 create operate function
//4 populate display when numbers are pressed
//5 hook operate() into calculator buttons and display
    //5.a this is the hardest part
//ec.1 create decimal button and handling
//ec.3 create backspace button
//ec.4 add keyboard support

//hook into html elements for later
const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

//initalize variables I'll need later
let current = null;
let alpha = null;
let op = null;
let beta = null;

//start of mathematical functions
//a and b will be used for first and second args throughout for consistancy
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
    return Math.floor((a / b) * 10) / 10;
}

//this is the heavy-lifter function for the rest of the program
function operate(a, operator, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log(`ERROR: operate was called without a valid operator, value a: ${a} b: ${b} operator: ${operator}`);
            return false;
    }
}

//populates the display when numbers are pressed
function populate(input) {
    //checks for special cases
    if (input === 'C') {
        //resets all values to default
        alpha = null;
        op = null;
        beta = null;
        return;
    }
    else if (input === '=') {
        //performs operation
        const result = operate(alpha, op, beta);
        //then sets alpha to the result and restores other values to default
        alpha = result;
        op = null;
        beta = null;
        //displays result and breaks
        display.textContent = result;
        return;
    }
    //otherwise performs normal operations
    else {
        if (op === null) {
            alpha += input;
            display.textContent = alpha;
            return;
        }
        else if (input === '+' || input === '-' || input === '*' || input === '/') {
            op = input;
            display.textContent = op;
            return;
        }
        else {
            beta += input;
            display.textContent = beta;
            return;
        }
    }
}

//adding event listeners to buttons
for(let button in buttons) {
    button.addEventListener('click', () => {
        populate(button.textContent);
    })
}