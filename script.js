/*TO DO

after making graphics, make sure the numbers do not overflow from the screen

test percentage on a person

have multiple zeros not appear if at the beginning of a number, i.e. no "00000009"
*/
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

const decimalButton = document.getElementById("decimal");
const plusButton = document.getElementById("plus");
const minusButton = document.getElementById("minus");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
const equalsButton = document.getElementById("equals");
const signButton = document.getElementById("sign");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const rootButton = document.getElementById("sqRoot");
const percentageButton = document.getElementById("percentage");
const squaredButton = document.getElementById("squared")
const powerButton = document.getElementById("power")

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
let activeNo=1;//sets whether you are entering the first number or second
let setOperation;//what mathematical operation is currently set
let subsequent = false; //checks if we are in the aftermath of a calculation, so that when entering a number instead of a new operation,
//the firstNumber is substituted and not added to
let percentageSymbolPresent = false //checks whether the percentage symbol has been displayed on screen, to avoid thigns like "100%55"


percentageButton.addEventListener('click',()=>{
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1){
        firstNumber=Number(firstNumber)*0.01;//0.01x's the currently active number 
        screen.appendChild(character);
        character.textContent=`${firstNumber}`//writes on the screen
    }
    else if (activeNo===2){
        screen.appendChild(character);
        character.textContent=`${secondNumber}`+'%'//before change of the number, to retain legibility
        secondNumber=Number(firstNumber)*(Number(secondNumber)/100);//second number as percentage of the first no.
        percentageSymbolPresent=true;
    }
})


rootButton.addEventListener('click',()=>{//square roots the currently active number
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1){
        firstNumber=Math.sqrt(Number(firstNumber))//operation
        screen.appendChild(character);
        character.textContent=`${firstNumber}`//writes on the screen
        subsequent=true;
    }
    else if (activeNo===2){
        secondNumber=Math.sqrt(Number(secondNumber))//operation
        screen.appendChild(character);
        character.textContent=`${secondNumber}`//writes on the screen
        subsequent=true;
    }
})

deleteButton.addEventListener('click',()=>{//clears screen, removes last digit from variable, then puts the variable onscreen
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1){
        firstNumber=firstNumber.toString().slice(0,-1)//number is turned to a string and last character is removed
        screen.appendChild(character);
        character.textContent=`${firstNumber}`//writes on the screen
    }
    else if (activeNo===2){
        if (percentageSymbolPresent===true){//usuwa procent a nie lcizbę
            screen.appendChild(character);

            percentageSymbolPresent=false;
            secondNumber= 100*secondNumber/firstNumber;//is ok
            character.textContent=`${secondNumber}`//prints the recalculated secondNumber
        }
        else{
            secondNumber=secondNumber.toString().slice(0,-1)//number is turned to a string and last character is removed
            screen.appendChild(character);
            character.textContent=`${secondNumber}`//writes on the screen

        }

    }
})

clearButton.addEventListener('click',()=>{//clears everything
    clearScreen();
    firstNumber ="";
    secondNumber="";
    activeNo=1;
    setOperation=null;
    subsequent = false
})

signButton.addEventListener('click',()=>{//+/-button changes the sign of the current number
    clearScreen();//clears screen, fills it later according to variables
    let character = document.createElement('span');//creates span to add symbol

    if (activeNo===1){
        if (Number(firstNumber)>0){//if number is positive, prepend the negative sign
            firstNumber=-Math.abs(Number(firstNumber))//change the variable
            screen.appendChild(character);
            character.textContent=`${firstNumber}`//writes on the screen
    
        }
        else if (Number(firstNumber)<0){//if number is negative, remove the negative sign
            firstNumber=Math.abs(Number(firstNumber))
            screen.appendChild(character);
            character.textContent=`${firstNumber}`//writes on the screen
        }
    }
    else if (activeNo===2){
        if (Number(secondNumber)>0){//if number is positive, prepend the negative sign
            secondNumber=-Math.abs(Number(secondNumber))
            screen.appendChild(character);
            character.textContent=`${secondNumber}`//writes on the screen

        }
        else if (Number(secondNumber)<0){//if number is negative, remove the negative sign
            secondNumber=Math.abs(Number(secondNumber))
            screen.appendChild(character);
            character.textContent=`${secondNumber}`//writes on the screen
        }
    }
})

decimalButton.addEventListener('click',()=>{//add decimals
    let character = document.createElement('span');//creates span to add symbol
    if (activeNo===1){//if no operation is chosen yet, add to first number
        if (firstNumber===""){//if no number is entered, pressing the decimal buttons creates "0."
            firstNumber+="0."
            screen.appendChild(character);
            character.textContent="0."//writes on the screen
        }
        else {
            if (!String(firstNumber).includes(".")){//makes sure there is no decimal symbol already, so that it does not appear multiple times in a single number
                firstNumber+="."
                screen.appendChild(character);
                character.textContent="."//writes decimal symbol on the screen
                subsequent=false;//if you start adding a decimal to a result, you do not want the next digit to erase the number
            }
        }
    }
    else {//if activeNo is not 1 then it is 2
        if (secondNumber===""){
            clearScreen();
            secondNumber+="0."
            screen.appendChild(character);
            character.textContent="0."//writes on the screen
        }
        else if (!String(secondNumber).includes(".")){
            secondNumber+="."
            screen.appendChild(character);
            character.textContent="."
        }
    }
})

let numberButtons = [zero, one, two, three, four, five, six, seven, eight, nine]//used in the loop below to apply proper numbers to the buttons
for (i=0;i<numberButtons.length;i++){
    let thisPosition=i//when the textContent is set simply as "i", it ends up as "10" for every button, because it is updated with each iteration
    numberButtons[i].addEventListener('click',()=>{//sets what the buttons do
        let character = document.createElement('span');//creates span to add numbers

        if (activeNo===1){//if no operation is chosen yet, //
            //you are picking the first number, if you are after an operation, the first number is set as the last result, so it is not === ""
            if (subsequent===true){//aftermath of calculation, clears screen and then clears the subsequent status
                firstNumber="";//clears firstNumber
                clearScreen();
                subsequent=false;
            }
            firstNumber+=`${thisPosition}`
            screen.appendChild(character);
            character.textContent=`${thisPosition}`//writes numbers on the screen
        }
        else {
            if(secondNumber===""||percentageSymbolPresent===true){//if you have not started entering the second number, it clears the screen
                clearScreen();
                secondNumber=""//needed if the percentage symbol is present
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
addOperationEvent(powerButton,power);
squaredButton.addEventListener('click',()=>{//squares the currently active number
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1){
        firstNumber=power(firstNumber,2)//operation
        screen.appendChild(character);
        character.textContent=`${firstNumber}`//writes on the screen
        subsequent=true;
    }
    else if (activeNo===2){
        secondNumber=power(secondNumber,2)//operation
        screen.appendChild(character);
        character.textContent=`${secondNumber}`//writes on the screen
        subsequent=true;
    }
    
})
equalsButton.addEventListener('click',()=>{
    if (setOperation === null||setOperation === undefined){
        return//if you're just pressing "=" nothing happens
    }
    else {
        clearScreen();
        let result=operate(firstNumber,secondNumber,setOperation)//calculate
        result=parseFloat(result.toPrecision(30));//toPrecision specifies the number of displayed characters **later add error message if the number gives more characters than fits on screen**
        //parseFloat removes superficial zeros caused by toPrecision
        let character = document.createElement('span');
        screen.appendChild(character);
        character.textContent=`${result}`;//writes result on the screen
        firstNumber=result;
        secondNumber="";
        setOperation=null;
        activeNo=1;
        subsequent=true;
        percentageSymbolPresent=false;
    }
    

//have it calculate and remove the numbers from screen and present the calculation, then clear both first and second number
})
function clearScreen () {
    for (i=screen.children.length-1;i>=0;i--){//clear screen
        screen.children[i].remove();
    }
}

function addOperationEvent (button, operation){
    button.addEventListener('click',()=>{
        setOperation = operation
        activeNo=2;
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

function power (a,b) {
    return Math.pow(Number(a),Number(b));
}
// function viewOnscreen (symbol){

// }