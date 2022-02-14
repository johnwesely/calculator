let isA = 0;
let isOperator = 0;
let isOpWhitespace = 0;
let isB = 0;
let isDecimal = 0;
let inputLength = 0;
let isErrorState = 0;


let numberButtons;
let numberButtonListeners = []; 
let operatorButtons;
let operatorButtonListeners = [];

initNumberButtons();

const equalsButton = document.querySelector("#equals").addEventListener("click", () => {
    evalInput(document.querySelector("#screen-text").textContent);
});

const clearButton = document.querySelector("#clear").addEventListener("click", () => {
    clearScreen();
});

const addButton = document.querySelector("#add").addEventListener("click", () => {
    typeOperator(" + ");
});

const subtractButton = document.querySelector("#subtract").addEventListener("click", () => {
    typeOperator(" - ");
});

const mutiplyButton = document.querySelector("#multiply").addEventListener("click", () => {
    typeOperator(" * ");
});

const divideButton = document.querySelector("#divide").addEventListener("click", () => {
    typeOperator(" / ");
});

const decimalButton = document.querySelector("#decimal").addEventListener("click", () => {
    if (isDecimal) return;

    ++isDecimal 
    typeToScreen(".");
});

const backspaceButton = document.querySelector("#backspace").addEventListener("click", () => {

});

function initNumberButtons() {
    numberButtons = document.querySelectorAll(".number-button");
    console.log(numberButtons);

    let i = 0;
    numberButtons.forEach((selectedButton) => {
        numberButtonListeners[i++] = selectedButton.addEventListener("click", () => {
            typeNumber(`${selectedButton.id}`);
            console.log("numberButton click");
        });
    });
}

function typeToScreen(input) {
    if (isErrorState) return;

    if (isOpWhitespace) {
        document.querySelector("#screen-text").innerText =
            document.querySelector("#screen-text").innerText + " " + input;
            --isOpWhitespace;
    } else {
        document.querySelector("#screen-text").innerText =
            document.querySelector("#screen-text").innerText + input;
    }
}

function typeOperator(input) {
    if (isOperator) return;

    typeToScreen(input);
    ++isOperator;
    ++isOpWhitespace;
    --isDecimal;
}

function typeNumber(input) {
    if ((isA && !isOperator) || inputLength > 16) return;

    ++inputLength; 
    typeToScreen(input);
}

function evalInput(input) {
    tokens = input.split(" ");
    if (tokens.length !== 3) return;
    if (tokens[1] === "/" && tokens[2] === "0") {
        document.querySelector("#screen-text").textContent = "ERROR"
        ++isErrorState; 
        return;
    }

    let a, b, operator;

    if (!isNaN(tokens[0])) {
        a = parseFloat(tokens[0]); 
    } else {
        console.log("invalid input for a");
        return;
    }
    
    const validOperators = ["*", "+", "-", "/"];

    if (validOperators.includes(tokens[1])) {
        operator = tokens[1];
    } else {
        console.log("invalid input for operator");
        return;
    }

    if (!isNaN(tokens[2])) {
        b = parseFloat(tokens[2]);
    } else {
        console.log("invalid input for b");
        return;
    } 

    const operators = [multiply, add, subtract, divide];

    const output = operators[validOperators.indexOf(operator)](a, b);
    if (output.toFixed(3).length > 1666666) {
        document.querySelector("#screen-text").textContent = "ERROR";
        ++isErrorState;
    } else {

        document.querySelector("#screen-text").textContent = roundOff(output, 3);
        ++isA;
        isB = 0;
        isOperator = 0;
        inputLength = roundOff(output, 3).toString().length;
    }
}

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
    return a / b;
}

function clearScreen() {
    document.querySelector("#screen-text").textContent = "";
    isA = 0; 
    isB = 0;
    isOperator = 0;
    isDecimal = 0;
    inputLength = 0;
    isErrorState = 0;
}

function roundOff(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

