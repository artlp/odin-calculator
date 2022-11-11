const mainDisplay = document.querySelector('.main');
const addDisplay = document.querySelector('.additional');
const buttons = document.querySelectorAll('.calcbtn');
const debug = document.querySelector('.debug');
const btns = Array.from(buttons);

let num1 = null;
let num2 = null;
let num1fake = '';
let num2fake = '';
let operator = null;
let result = null;
let lastBtn = null;
let tempresult = null;
let operators = new RegExp(/[-+/*]/);
let started = false;
let finished = false;
let digits = new RegExp(/[0-9]/);
mainDisplay.innerText = '0';

/* function debugs() {
    debug.innerHTML = `started = ${started}, finished = ${finished}, num1 = ${num1}, num2 = ${num2}, num1fake = ${num1fake}, num2fake = ${num2fake}, operator = ${operator}, result = ${result}`;
} */

buttons.forEach((e) => {
    e.addEventListener('mousedown', calc);
});

document.addEventListener('keydown', calc);

function calc(event) {
    if (event.type === 'keydown') {
        lastBtn = event.key;
        highlightButtons2(event);
    } else {
        lastBtn = event.target.dataset.key;
        highlightButtons(event.target);
    }
    if (operators.test(lastBtn)) {
        if (!num1) {
            num1 = +num1fake;
            num1fake = '';
            operator = lastBtn;
            addDisplay.innerText = num1 + operator;
            started = true;
        } else if (num1 && !num2 && !num2fake) {
            operator = lastBtn;
            addDisplay.innerText = num1 + operator;
            if (num2fake) {
                num2 = +num2fake;
                num2fake = '';
                operate(num1, num2, operator);
                operator = lastBtn;
                mainDisplay.innerText = result;
                num1 = result;
                addDisplay.innerText = result + operator;
                num2 = null;
            }
        } else if (num1 && num2 && result) {
            num2 = +num2fake;
            operate(num1, num2, operator);
            mainDisplay.innerText = result;
            operator = lastBtn;
            addDisplay.innerText = result + operator;
            num2 = null;
            num2fake = '';
        } else if (num1 && !num2) {
            num2 = +num2fake;
            operate(num1, num2, operator);
            mainDisplay.innerText = result;
            num1 = result;
            operator = lastBtn;
            addDisplay.innerText = num1 + operator;
            num2 = null;
            num2fake = '';
            result = null;
        }
    } else if (digits.test(lastBtn)) {
        if (!num1) {
            num1fake += lastBtn;
            mainDisplay.innerText = num1fake;
        } else if (!num2) {
            num2fake += lastBtn;
            mainDisplay.innerText = num2fake;
        } else if (num1 && num2 && result) {
            num1 = result;
            num2fake += lastBtn;
            mainDisplay.innerText = num2fake;
        }
    } else if ((lastBtn === "=" || lastBtn === "Enter") && num1 && num2fake) {
        finished = true;
        num2 = +num2fake;
        addDisplay.innerText = num1 + operator + num2 + "=";
        operate(num1, num2, operator);
        mainDisplay.innerText = result;
        num1 = result;
        num2 = null;
        num2fake = '';
    } else if (lastBtn === "neg") {
        if (+mainDisplay.innerText === +num1fake) {
            num1fake = +num1fake * -1;
            mainDisplay.textContent = num1fake.toString();
        } else if (+mainDisplay.innerText === +num2fake) {
            num2fake = +num2fake * -1;
            mainDisplay.textContent = num2fake;
        }

    } else if (lastBtn === "clear" || lastBtn === "Delete") {
        finished = false;
        if (!num1) {
            mainDisplay.innerText = '0';
            num1fake = '';
        } else if (!num2) {
            mainDisplay.innerText = '0';
            num2fake = '';
        }
    } else if (lastBtn === "Escape") {
        num1 = null;
        num2 = null;
        num1fake = '';
        num2fake = '';
        operator = null;
        result = null;
        finished = false;
        mainDisplay.innerText = '0';
        addDisplay.innerText = '\xa0';
    } else if (lastBtn === "Backspace") {
        if (+mainDisplay.innerText === +result) {
            num1 = result;
            mainDisplay.innerText = 0;
            addDisplay.innerText = result + operator;
        }
        else if (!num1 && !finished) {
            num1fake = num1fake.slice(0, -1);
            mainDisplay.innerText = num1fake;
        } else if (!num2 && !finished) {
            num2fake = num2fake.slice(0, -1);
            mainDisplay.innerText = num2fake;
        }
    } else if (lastBtn === ".") {
        if (!num1 && num1fake.toString().indexOf('.') === -1) {
            num1fake += lastBtn;
            mainDisplay.innerText = num1fake;
        }
        else if (num1 && num2fake.toString().indexOf('.') === -1) {
            num2fake += lastBtn;
            mainDisplay.innerText = num2fake;
        }
    }
}

function operate(a, b, operation) {
    switch (operation) {
        case "-":
            return result = +(a - b).toFixed(3).toString();
            break;
        case "+":
            return result = +(a + b).toFixed(3).toString();
            break;
        case "*":
            return result = +(a * b).toFixed(3).toString();
            break;
        case "/":
            if (b === 0) {
                mainDisplay.innerText = "BROKEN";
                throw new Error("Invalid");
            }
            return result = +(a / b).toFixed(3).toString();
            break;
        default:
            break;
    }
}


function highlightButtons(e) {
    e.classList.add('selected');
    setTimeout(function () {
        e.classList.remove('selected');
        //....and whatever else you need to do
    }, 150);
}
function highlightButtons2(e) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/', '*', 'Backspace', 'Escape', '.'].includes(e.key)) {
        let pressed = btns.find(item => item.dataset.key === e.key);
        pressed.classList.add('selected');
        setTimeout(function () {
            pressed.classList.remove('selected');
        }, 150);
    }
}

document.querySelector('a').addEventListener('click', () => {
    mainDisplay.innerHTML = `<span class="smalltext">THANKS FOR VISITING MY GITHUB</span>`
})