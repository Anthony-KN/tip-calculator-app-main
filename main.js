//Input
const inputBill = document.querySelector('.container__section__left-input-bill');
let parseBill = parseFloat(inputBill.value);
const inputPeople = document.querySelector(
    '.container__section__left-input-numberofpeople'
);
let parsePeople = parseInt(inputPeople.value);

//Select tip
let btnPercent = document.querySelectorAll('.container__section__left-btn');
//btnCustom
let inputCustom = document.querySelector('.container__section__left-input');

//Total
const totalPercent = document.querySelector('#total-tipAmount');
const totalPerson = document.querySelector('#total-total');

//btnReset
const btnReset = document.querySelector('.container__section__right--btn');

//error
const errorBill = document.querySelector('.container__section__left-error-bill');
const errorPeople = document.querySelector(
    '.container__section__left-error-numberofpeople'
);

let percentTotal = 0;
let targetCheckBill,
    targetTotal,
    targetChecpeople = false;

inputBill.addEventListener('input', () => {
    targetTotal = true;
    parseBill = inputBill.value;
    validationCheck();
    if (targetCheckBill == true && targetChecpeople == true && targetTotal == true) {
        btnReset.disabled = false;
        percent('amount');
        percent('total');
    }
});
inputCustom.addEventListener('input', () => {
    percentTotal = inputCustom.value;
    validationCheck();
    if (inputCustom.value != '') {
        targetTotal = true;
        if (inputCustom.value != 0) {
            if (
                targetCheckBill == true &&
                targetChecpeople == true &&
                targetTotal == true
            ) {
                btnReset.disabled = false;
                percent('amount');
                percent('total');
            }
        }
    } else {
        totalPercent.innerText = '$0.00';
        totalPerson.innerText = '$0.00';
        targetTotal = false;
    }
});
inputPeople.addEventListener('input', () => {
    parsePeople = inputPeople.value;
    validationCheck();
    if (targetCheckBill == true && targetChecpeople == true && targetTotal == true) {
        btnReset.disabled = false;
        percent('amount');
        percent('total');
    }
});

btnPercent.forEach((element) => {
    element.addEventListener('click', (even) => {
        //find and remove de class .container__section__left--selected
        btnPercent.forEach((element) => {
            element.classList.remove('container__section__left--selected');
        });
        targetTotal = true;
        totalPercent.innerText = '$0.00';
        totalPerson.innerText = '$0.00';
        percentTotal = parseInt(even.target.innerText);
        validationCheck();
        if (targetCheckBill == true && targetChecpeople == true && targetTotal == true) {
            even.target.classList.toggle('container__section__left--selected');
            btnReset.disabled = false;
            percent('amount');
            percent('total');
        }
    });
});

//btnReset - reload page
btnReset.addEventListener('click', () => location.reload());

//function validation
function validationCheck() {
    if (veryfyIsFilled(inputBill, errorBill)) {
        if (inputBill.value != 0) {
            targetCheckBill = true;
        } else {
            msgError(inputBill, errorBill, "Can't be zero", true);
            targetCheckBill = false;
        }
    } else {
        totalPercent.innerText = '$0.00';
        totalPerson.innerText = '$0.00';
        targetCheckBill = false;
    }
    if (veryfyIsFilled(inputPeople, errorPeople)) {
        if (inputPeople.value != 0) {
            targetChecpeople = true;
        } else {
            msgError(inputPeople, errorPeople, "Can't be zero", true);
            targetChecpeople = false;
        }
    } else {
        totalPercent.innerText = '$0.00';
        totalPerson.innerText = '$0.00';
        targetChecpeople = false;
    }
}

//Validation function - If the input is empty
const veryfyIsFilled = (inputError, divError) => {
    if (inputError.value.length > 0) {
        msgError(inputError, divError, '', false);
        return true;
    } else {
        msgError(inputError, divError, "Cant't be blank", true);
        return false;
    }
};
//error input(border)
const msgError = (input, divError, msg, target) => {
    if (target) {
        divError.innerText = msg;
        input.style.border = '2px red solid';
    } else {
        divError.innerText = msg;
        input.style.border = 'none';
    }
};
//Tip Amount - Total (mathematical operations)
const percent = (key) => {
    let tipAmount = (parseBill * (percentTotal / 100)) / parsePeople;

    tipAmount = convString(tipAmount);

    let totalP = (parseBill * percentTotal) / 100;
    totalP = (parseFloat(totalP) + parseFloat(parseBill)) / parsePeople;
    totalP = convString(totalP);

    switch (key) {
        case 'amount':
            totalPercent.innerText = '$' + tipAmount;
            break;
        case 'total':
            totalPerson.innerText = '$' + totalP;
            break;
    }
};
//parseInt to string(two decimals)
const convString = (cString) => {
    cString = cString.toString();
    //indexOf() find position '.'   if there is no decimal point, it returns -1
    if (cString.indexOf('.') != '-1') {
        //.slice()  start with 0  and with the position found indexOf()
        cString = cString.slice(0, cString.indexOf('.') + 3);
        return cString;
    } else {
        return cString;
    }
};
