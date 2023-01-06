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
let alpha = '';
let op = '';
let beta = '';

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
    //handles divide by 0 errors
    if (b === 0) {
        return 'No!'
    }
    return Math.floor((a / b) * 10) / 10;
}

//this is the heavy-lifter function for the rest of the program
function operate(a, operator, b) {
    a = parseInt(a);
    b = parseInt(b);
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

//populates the display when buttons are pressed
//most convoluted thing in this program by far
function populate(input) {
    //checks for special cases
    if (input === 'C') {
        //resets all values to default
        alpha = '';
        op = '';
        beta = '';
        display.textContent = '';
        return;
    }
    else if (input === '=') {
        //performs operation
        const result = operate(alpha, op, beta);
        //checks for divide by 0 errors
        if (result === 'No!') {
            alpha = '';
            op = '';
            beta = '';
            display.textContent = result;
            return;
        }
        //then sets alpha to the result and restores other values to default
        alpha = result;
        op = 'hold';
        beta = '';
        //displays result and breaks
        display.textContent = result;
        return;
    }
    //otherwise performs normal operations
    else {
        //first handles operators
        if (input === '+' || input === '-' || input === '*' || input === '/') {
            //if another operation is incomplete, perform it first
             if (op === '+' || op === '-' || op === '*' || op === '/') {
                //below code directly from = case in previous code consult comments there
                const result = operate(alpha, op, beta);
                if (result === 'No!') {
                    alpha = '';
                    op = '';
                    beta = '';
                    display.textContent = result;
                    return;
                }
                alpha = result;
                op = input;
                beta = '';
                display.textContent = result;
                return;
             }
             //else save new operator
            op = input;
            display.textContent = op;
            return;
        }
        //then handles initial input of first operand
        else if (op === '') {
            alpha += input;
            display.textContent = alpha;
            return;
        }
        //checks for special case resetting first operand without clearing data
        else if (op === 'hold') {
            alpha = input;
            op = '';
            display.textContent = alpha;
            return;
        }
        //finally assigns content to second operand
        else {
            beta += input;
            display.textContent = beta;
            return;
        }
    }
}

//adding event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        populate(button.textContent);
    })
})