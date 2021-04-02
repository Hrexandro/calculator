const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const zero = document.getElementById("zero");

const decimalButton = document.getElementById("decimal")
const plusButton = document.getElementById("plus")
const minusButton = document.getElementById("minus")
const multiplyButton = document.getElementById("multiply")
const divideButton = document.getElementById("divide")
const equalsButton = document.getElementById("equals")

const screen = document.getElementById("screen");

const operationButtons = document.getElementsByClassName("operationButton")

// addClickEvent(decimalButton,".")//for now ignore showing operation symbol on screen
// addClickEvent(plusButton,"+")
// addClickEvent(minusButton,"-")
// addClickEvent(multiplyButton,"x")
// addClickEvent(divideButton,":")
// addClickEvent(equalsButton,"=")

let firstNumber ="";
let secondNumber="";
let setOperation;//what mathematical operation is currently set

let numberButtons = [zero, one, two, three, four, five, six, seven, eight, nine]//used in the loop below to apply proper numbers to the buttons
for (i=0;i<numberButtons.length;i++){
    let thisPosition=i//when the textContent is set simply as "i", it ends up as "10" for every button, because it is updated with each iteration
    numberButtons[i].addEventListener('click',()=>{//sets what the buttons do
        let character = document.createElement('span');//creates span to add numbers

        if (setOperation === null||setOperation === undefined){//if no operation is chosen yet, you are picking the first number (????what about when calculating after an operation????)
            firstNumber+=`${thisPosition}`
            screen.appendChild(character);
            character.textContent=`${thisPosition}`//writes numbers on the screen
        }
        else {
            if(secondNumber===""){//if you have not started entering the second number, it clears the screen
                for (i=screen.children.length-1;i>=0;i--){
                    screen.children[i].remove()
                }
            }
            secondNumber+=`${thisPosition}`//set second number
            screen.appendChild(character);
            character.textContent=`${thisPosition}`//writes numbers on the screen
        }
        
    })
}

addOperationEvent(plusButton,add);// sets the setOperation variable - the operation that is currently chosen
addOperationEvent(minusButton,subtract);
addOperationEvent(multiplyButton,multiply);
addOperationEvent(divideButton,divide);
equalsButton.addEventListener('click',()=>{
    for (i=screen.children.length-1;i>=0;i--){//clear screen
        screen.children[i].remove()
    }
    let result=operate(firstNumber,secondNumber,setOperation)//calculate
    let character = document.createElement('span');
    screen.appendChild(character);
    character.textContent=`${result}`//writes result on the screen

//have it calculate and remove the numbers from screen and present the calculation, then clear both first and second number
})

function addOperationEvent (button, operation){
    button.addEventListener('click',()=>{
        setOperation = operation
    })
}

// function addClickEvent(button, symbol){//to show symbol on the screen, ignore for now
//     button.addEventListener('click',()=>{
//         let character = document.createElement('span');
//         character.setAttribute('id',`${symbol}`)
//         screen.appendChild(character);
//         character.textContent=`${symbol}`
//     }
//     )
// }

function operate(a,b, operation){
    return operation(a,b)
    
}
function add (a,b) {
	return Number(a)+Number(b);
}

function subtract (a,b) {
	return Number(a)-Number(b);
}

function multiply (a,b) {
    return Number(a)*(b);
}

function divide (a,b) {
    return Number(a)/Number(b);
}
// function viewOnscreen (symbol){

// }