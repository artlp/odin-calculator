const mainDisplay = document.querySelector('.main');
const addDisplay = document.querySelector('.additional');
const buttons = document.querySelectorAll('.calcbtn');
const debug = document.querySelector('.debug');

let num1 = null;
let num2 = null;
let num1fake = '';
let num2fake = '';
let operator = null;
let result = null;
let tempresult = null;
let operators = new RegExp(/[-*+/]/);
let started = false;
let finished = false;
let digits = new RegExp(/[0-9.]/);
mainDisplay.innerText = '0';

function debugs() {
    debug.innerHTML = `started = ${started}, finished = ${finished}, num1 = ${num1}, num2 = ${num2}, num1fake = ${num1fake}, num2fake = ${num2fake}, operator = ${operator}, result = ${result}`;
}

buttons.forEach((e) => {
    e.addEventListener('click', (target) => {
        let lastBtn = e.dataset.key;
        highlightButtons(e);
        debugs();

        if (operators.test(lastBtn)) {
            if (!num1) {
                console.log("ELSE IF !NUM1");
                num1 = +num1fake;
                num1fake = '';
                operator = lastBtn;
                addDisplay.innerText = num1 + operator;
                started = true;
            } else if (!num2) {
                    console.log("ELSE IF !NUM2 !num1fake"); //!ok
                    addDisplay.innerText = num1 + operator;
                if (num2fake) {
                    console.log("if num2fake");
                    num2 = +num2fake;
                    num2fake = '';
                    operate(num1, num2, operator);
                    mainDisplay.innerText = result;
                    num1 = result;
                    operator = lastBtn;
                    addDisplay.innerText = result + operator;
                    num2 = null;
                } else {
                    operator = lastBtn;
                    addDisplay.innerText = num1 + operator;
                    console.log("WTF");
                }
            } else if (num1 && num2 && result) {
                num2 = +num2fake;
                operate(num1, num2, operator);
                mainDisplay.innerText = result;
                operator = lastBtn;
                addDisplay.innerText = result + operator;
                num2=null;
                num2fake = '';
                console.log("EVERYTHING");
            }
            debugs();


        } else if (digits.test(lastBtn)) {
            if (!num1) {
                num1fake += lastBtn;
                console.log("inputting num1fake");
                mainDisplay.innerText = num1fake;
            } else if (!num2) {
                num2fake += lastBtn;
                console.log("inputting num2fake");
                mainDisplay.innerText = num2fake;
            } else if (num1 && num2 && result) {
                console.log("NEW INPUT AFTER MATHS");
                num1 = result;
                num2fake += lastBtn;
                mainDisplay.innerText = num2fake;

            }
            debugs();

        } else if (lastBtn === "=" && num1 && operator && !finished) {
            num2 = parseFloat(mainDisplay.innerText);
            console.log("=");
            addDisplay.innerText = num1 + operator + num2 + "=";
            operate(num1, num2, operator);
            mainDisplay.innerText = result;
            num2 = null;
        } else {
            console.log(lastBtn + " ELSE");
        }
    });
});


function operate(a, b, operation) {
    switch (operation) {
        case "-":
            return result = parseFloat(a - b).toFixed(3);
            break;
        case "+":
            return result = parseFloat(a + b).toFixed(3);
            break;
        case "*":
            return result = parseFloat(a * b).toFixed(3);
            break;
        case "/":
            if (b === 0) {
                mainDisplay.innerText = "BROKEN";
                throw new Error("Invalid");
            }
            return result = parseFloat(a / b).toFixed(3);
            break;
        default:
            break;
    }
}


function highlightButtons(e) {
    buttons.forEach((e) => {
        e.classList.remove('selected');
    });
    e.classList.add('selected');

}