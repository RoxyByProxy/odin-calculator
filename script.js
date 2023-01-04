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
