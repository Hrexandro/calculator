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
const addButton = document.getElementById("plus");
const subtractButton = document.getElementById("minus");
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

let firstNumber ="";
let secondNumber="";
let activeNo=1;//sets whether you are entering the first number or second
let selectedOperation;//what mathematical operation is currently selected
let subsequent = false; //checks if we are in the aftermath of a calculation, so that when entering a number instead of a new operation,
//the firstNumber is substituted and not added to
let percentageSymbolPresent = false //checks whether the percentage symbol has been displayed on screen, to avoid things like "100%55"
let digitsThatFitOnCalculatorScreen = 15;//number of digits that fit, so the symbols don't overflow the screen

let buttons = document.querySelectorAll("button");//select all buttons, later set activation or not with pushed class
function removePushedClass(){
    for (i=0;i<operationButtons.length;i++){
        operationButtons[i].classList.remove('pushed')
    }
}
function addPushedClass(button){
    button.classList.add('pushed')
}



function fitOnScreen(a){
    a=Math.round(a*100000000000000)/100000000000000//to fix JS doing floating point numbers wrong, based on https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
    if (a.toString().length>digitsThatFitOnCalculatorScreen){
        while (a.toString().length>digitsThatFitOnCalculatorScreen&&a%1!==0){
            a=a.toString().slice(0,-1) 
        }
    }
    if (Number(a).toString().length>digitsThatFitOnCalculatorScreen){//if the length is still higher than the space on the screen, returns infinity to prompt an error message
        return Infinity
    }
    else {
        return Number(a);
    }  
}

percentageButton.addEventListener('click',()=>{
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1){
        firstNumber=Number(firstNumber)*0.01;//0.01x's the currently active number 
        firstNumber=fitOnScreen(firstNumber);
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
function displayError(){
    clearScreen();
    clearVariables();
    removePushedClass();
    let character = document.createElement('span');
    screen.appendChild(character);
    character.textContent='ERROR';//writes ERROR on the screen
}
rootButton.addEventListener('click',()=>{//square roots the currently active number
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1){
        firstNumber=Math.sqrt(Number(firstNumber))//operation
        firstNumber=fitOnScreen(firstNumber);
        screen.appendChild(character);
        if (isNaN(firstNumber)||firstNumber===Infinity){//if the number is negative, the result is NaN
            displayError()
        }
        else {
            removePushedClass();
            character.textContent=`${firstNumber}`//writes on the screen
        }
        subsequent=true//if it did calculate the square root, it should be subsequent, but also when it gives an ERROR, so that if you start a new calculation, the screen clears etc.
    }
    else if (activeNo===2){
        secondNumber=Math.sqrt(Number(secondNumber))//operation
        secondNumber=fitOnScreen(secondNumber);
        screen.appendChild(character);
        if (isNaN(secondNumber)||firstNumber===Infinity){//if the number is negative, the result is NaN
            displayError()
        }
        else {
            character.textContent=`${secondNumber}`//writes on the screen
            removePushedClass();
        }
        subsequent=true
    }
})
deleteButton.addEventListener('click',()=>{
    deleteFunction(); 
})

function deleteFunction(){//clears screen, removes last digit from variable, then puts the variable onscreen, for fitting onscreen purposes
    clearScreen();
    let character = document.createElement('span');
    if (activeNo===1||secondNumber===""){
        firstNumber=firstNumber.toString().slice(0,-1)//number is turned to a string and last character is removed
        screen.appendChild(character);
        character.textContent=`${firstNumber}`//writes on the screen
    }
    else if (activeNo===2){
        if (percentageSymbolPresent===true){//removes the percentage symbol isntead of the digit
            screen.appendChild(character);
    
            percentageSymbolPresent=false;
            secondNumber= 100*secondNumber/firstNumber;//calculated the number before changed by the percentage symbol
            character.textContent=`${secondNumber}`//prints the recalculated secondNumber
        }
        else{
            secondNumber=secondNumber.toString().slice(0,-1)//number is turned to a string and last character is removed
            screen.appendChild(character);
            character.textContent=`${secondNumber}`//writes on the screen
    
        }
    
    }
}

clearButton.addEventListener('click',clearVariables)
clearButton.addEventListener('click',clearScreen)

function clearVariables() {
    firstNumber ="";
    secondNumber="";
    activeNo=1;
    selectedOperation=null;
    subsequent = false
    removePushedClass();
}

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
    addDecimalSymbol();
})

function addDecimalSymbol(){
    let character = document.createElement('span');//creates span to add symbol
    if (activeNo===1){//if no operation is chosen yet, add to first number
        if (firstNumber===""){//if no number is entered, pressing the decimal buttons creates "0."
            clearScreen()//if for example, the error message is visible
            firstNumber+="0."
            screen.appendChild(character);
            character.textContent="0."//writes on the screen
            subsequent=false
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
}

let numberButtons = [zero, one, two, three, four, five, six, seven, eight, nine]//used in the loop below to apply proper numbers to the buttons
for (i=0;i<numberButtons.length;i++){
    let thisPosition=i//when the textContent is set simply as "i", it ends up as "10" for every button, because it is updated with each iteration
    numberButtons[i].addEventListener('click',()=>{//sets what the buttons do
        numberTyping(thisPosition)
    })
}

function numberTyping (numberGiver){//what gives you the number, either thisPosition from the click event, or e.key from typing the key
    let character = document.createElement('span');//creates span to add numbers
    if (activeNo===1){//if no operation is chosen yet, //
        //you are picking the first number, if you are after an operation, the first number is set as the last result, so it is not === ""
        if (subsequent===true||(Number(firstNumber)===0&&!String(firstNumber).includes("."))){//aftermath of calculation, clears screen and then clears the subsequent status
            //same if just adding zeros, so you don't end up with 00009, but does not do that if there is a decimal
            firstNumber="";//clears firstNumber
            clearScreen();
            subsequent=false;
        }
        if (firstNumber.toString().length<digitsThatFitOnCalculatorScreen){//so that it does nothing if there are too many numbers
            firstNumber+=`${numberGiver}`;
            screen.appendChild(character);
            character.textContent=`${numberGiver}`//writes numbers on the screen
        }
    }
    else {
        if(secondNumber===""||percentageSymbolPresent===true||(Number(secondNumber)===0&&!String(secondNumber).includes("."))){//if you have not started entering the second number, it clears the screen
            clearScreen();
            secondNumber=""//needed if the percentage symbol is present
        }
        if (secondNumber.toString().length<digitsThatFitOnCalculatorScreen){//so that it does nothing if there are too many numbers
            secondNumber+=`${numberGiver}`//set second number
            screen.appendChild(character);
            character.textContent=`${numberGiver}`//writes numbers on the screen
        }
    }

}
addOperationEvent(addButton,add);// sets the selectedOperation variable - the operation that is currently chosen
addOperationEvent(subtractButton,subtract);
addOperationEvent(multiplyButton,multiply);
addOperationEvent(divideButton,divide);
addOperationEvent(powerButton,power);

squaredButton.addEventListener('click',()=>{//squares the currently active number
    clearScreen();
    let character = document.createElement('span');
    
    if (activeNo===1){
        firstNumber=power(firstNumber,2)//operation
        firstNumber=fitOnScreen(firstNumber);
        if (firstNumber===Infinity){
            displayError();
        }
        else {
            screen.appendChild(character);
            character.textContent=`${firstNumber}`//writes on the screen
            subsequent=true;
            removePushedClass();
        }
    }
    else if (activeNo===2){
        secondNumber=power(secondNumber,2)//operation
        secondNumber=fitOnScreen(secondNumber);
        if (secondNumber===Infinity){
            displayError();
        }
        else {
            screen.appendChild(character);
            character.textContent=`${secondNumber}`//writes on the screen
            subsequent=true;    
            removePushedClass();
        }
    }
    
})
equalsButton.addEventListener('click',()=>{
    equalize()
})
function equalize () {
    if (selectedOperation === null||selectedOperation === undefined){
        return//if you're just pressing "=" nothing happens
    }
    else {
        removePushedClass();
        clearScreen();
        let result=operate(firstNumber,secondNumber,selectedOperation)//calculate
        result=fitOnScreen(result)
        if (result===Infinity){
            displayError();
        }
        else {    
            let character = document.createElement('span');
            screen.appendChild(character);
            character.textContent=`${result}`;//writes result on the screen
            firstNumber=result;
            secondNumber="";
            selectedOperation=null;
            activeNo=1;
            subsequent=true;
            percentageSymbolPresent=false;
        }
    }
}


function clearScreen () {
    for (i=screen.children.length-1;i>=0;i--){//clear screen
        screen.children[i].remove();
    }
}

document.addEventListener ('keydown',(e)=>{ //keyboard support 
    if (!isNaN(e.key)){//if the pressed key is a number
        numberTyping(e.key);//types the numbers
    }
    if (e.key==='*'||e.key==='x'){//sets operations
        pickOperation(multiply);
    }
    if (e.key==='+'){//sets operations
        pickOperation(add);
    }
    if (e.key==='-'){//sets operations
        pickOperation(subtract);
    }
    if (e.key==='/'||e.key===':'){//sets operations
        pickOperation(divide);
    }
    if (e.key==='='||e.key==='Enter'){//sets operations
        e.preventDefault();
        equalize();
    }
    if (e.key==='Backspace'||e.key==='Delete'){//sets operations
        deleteFunction();
    }
    if (e.key==='.'||e.key===','){//adds decimal symbol
        addDecimalSymbol();
    }
 })

function addOperationEvent (button, operation){
    button.addEventListener('click',()=>{
        pickOperation(operation)
    })
}

function pickOperation (operation) {//for use in setting operation with buttons and keyboard
    if (secondNumber!==""){//if you select operation after entering the second number, you are starting the next operation
        equalize()
    }
    removePushedClass();
    selectedOperation = operation;
    addPushedClass(decideWhichOperationIsPushed());
    if (firstNumber===""){//if you select operation before picking the number, it doesn't switch to second leaving first one blank
        firstNumber=secondNumber;
        secondNumber="";
    }
    activeNo=2;
}
function decideWhichOperationIsPushed(){//decides which operation button is visually selected
    if (selectedOperation===add){
        return addButton;
    }
    if (selectedOperation===multiply){
        return multiplyButton;
    }
    if (selectedOperation===subtract){
        return subtractButton
    }
    if (selectedOperation===divide){
        return divideButton
    }
    if (selectedOperation===power){
        return powerButton
    }
}

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