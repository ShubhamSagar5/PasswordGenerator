const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[dataPassword-display]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upeerCaseCheck = document.querySelector("#upperCase");
const lowerCaseCheck = document.querySelector("#lowerCase");
const numberCaseCheck = document.querySelector("#numbers");
const symbolCaseCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_+={}[]\|";:"",./<>?';

let password = "";
let passwodLength = 10;
let checkCount = 0;
//set strength circle for gray

handleSlider();
setIndicator("#ccc");


//set password length
function handleSlider(){
    inputSlider.value = passwodLength;
    lengthDisplay.innerText = passwodLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwodLength - min)*100/(max - min)) + "% 100%"

}


function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRndInteger(min,max){
   return Math.floor( Math.random()* (max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
   return String.fromCharCode(getRndInteger(97,123));

}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

function calStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(upeerCaseCheck.checked) hasUpper = true;
    if(lowerCaseCheck.checked) hasLower = true;
    if(numberCaseCheck.checked) hasNum = true;
    if(symbolCaseCheck.checked) hasSym  = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwodLength >= 8){
        setIndicator("#0f0");
    }else if(
        (hasLower || hasUpper) && (hasNum || hasSym) && passwodLength >=6
    ){
        setIndicator("#0ff0");
    }else {
        setIndicator("#f00");
    }
}


async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
    
        copyMsg.innerText = "copied";

    }
    catch(err){
        copyMsg.innerText = "failed";
    }

    copyMsg.classList.add("active");

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array){
    //fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;


}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })

    if(passwodLength < checkCount) {
        passwodLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkebox)=>{
    checkebox.addEventListener("change",handleCheckBoxChange)
})








inputSlider.addEventListener("input",(e)=>{
    passwodLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener("click",()=>{
    if(passwordDisplay.value){
        copyContent();
    }
})

generateBtn.addEventListener("click",()=>{
    if(checkCount ==0){
        return;
    }
    if(passwodLength < checkCount ){
        passwodLength = checkCount;
        handleSlider();
    }

    console.log("Starting the Journey");
    password = "";


    // if(upeerCaseCheck.checked){
    //     password = password+ generateUpperCase();
    // }
    // if(lowerCaseCheck.checked){
    //     password = password+ generateLowerCase();
    // }
    // if(numberCaseCheck.checked){
    //     password = password+ generateRandomNumber()
    // }
    // if(symbolCaseCheck.checked){
    //     password = password+ generateSymbol();
    // }

    let funcArr =[];

    if(upeerCaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowerCaseCheck.checked){
        funcArr.push(generateLowerCase);
    }
    if(numberCaseCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolCaseCheck.checked){
        funcArr.push(generateSymbol);
    }


    for(let i=0; i<funcArr.length;i++){
        password = password+funcArr[i]()
    }


    for(let i = 0 ;i<passwodLength-funcArr.length;i++){
        let randomIndex = getRndInteger(0,funcArr.length);
        password = password+funcArr[randomIndex]();

    }
    console.log("Remaining adddition done");
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    passwordDisplay.value = password;
    console.log("UI adddition done");

    calStrength();

    
})