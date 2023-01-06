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
    return Math.floor((a + b) * 10) / 10;
}

function subtract(a, b) {
    return Math.floor((a - b) * 10) / 10;
}

function multiply(a, b) {
    return Math.floor((a * b) * 10) / 10;
}

function divide(a, b) {
    //handles divide by 0 errors
    if (b === 0) {
        return 'No!'
    }
    console.log(Math.floor((a / b) * 10) / 10);
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
        //confirms all inputs valid
        if (alpha === '' || beta === '' || op === '' || op === 'hold') {
            console.log(`Error: Insufficient data to perform operation, Input was: ${input} first operand: ${alpha} second operand: ${beta} operator ${op}.`)
            return;
        }
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
    else if (input === 'Backspace') {
        //undoes last character entered
        if (op === 'hold') {
            //checks if the last action was an operation
            console.log('Error: cannot backspace an equals operation');
            return;
        }
        else if (beta != '') {
            //checks if the backspace is for the second operand
            beta = beta.slice(0, -1);
            display.textContent = beta;
            return;
        }
        else if (op != '') {
            //checks if the backspace is for the operator
            //this functionality is redundant with how overwriting operators works but makes intuitive sense
            op = ''
            display.textContent = alpha;
            return;
        }
        else if (alpha != '') {
            //checks if the backspace is for the first operand
            alpha = alpha.slice(0, -1);
            display.textContent = alpha;
            return;
        }
        else {
            //returns if nothing can be identified to delete
            console.log('Error: Cannot find anything to delete');
            return;
        }
    }
    //otherwise performs normal operations
    else {
        //first handles operators
        if (input === '+' || input === '-' || input === '*' || input === '/') {
            //if another operation is incomplete, perform it first
             if (op === '+' || op === '-' || op === '*' || op === '/') {
                //below code directly from = case in previous code consult comments there
                if (alpha === '' || beta === '') {
                    //this time this case allows overwriting of the current operator instead of simply waiting for correct input as with case '='
                    console.log(`Error: Insufficient data to perform operation, Input was: ${input} first operand: ${alpha} second operand: ${beta} operator ${op}. Setting operator to input`)
                    op = input;
                    display.textContent = input;
                    return;
                }
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
            //catches illegal decimal points
            if (input === '.' && display.textContent.includes('.')) {
                return;
            }
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
            if (input === '.' && display.textContent.includes('.')) {
                return;
            }
            beta += input;
            display.textContent = beta;
            return;
        }
    }
}

//captures and parses keypresses, pipes result to populate()
function recognizeKey(key) {
    //targets button from key info targeting numpad
    let target = document.querySelector(`button[data-key="${key.keyCode}"]`);
    //catches illegal keys and checks for valid alt keys
    if (!target) {
        //checks for shift keys
        if (key.shiftKey) {
            target = document.querySelector(`button[data-modKey="${key.keyCode}"]`);
            if (!target) {
                console.log(`Error: keycode not recognized, and shift was recognized tried to target: ${key} found: ${target}`);
                return;
            }
            //if valid target pipes to populate()
            populate(target.textContent);
            return;
        }
        //checks for alternate keys after numpad and shift
        target = document.querySelector(`button[data-altKey="${key.keyCode}"]`);
        if (!target) {
            console.log(`Error: keycode not recognized, tried to target: ${key} found: ${target}`);
            return;
        }
    }
    //pipes successful targeting to populate()
    populate(target.textContent);
}

//adding event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        populate(button.textContent);
    })
})
//add event listeners for keycodes
window.addEventListener('keydown', recognizeKey);
