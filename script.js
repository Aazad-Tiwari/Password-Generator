const displayPassword = document.querySelector('[data-displayPassword]')
const copyBtn = document.querySelector('[data-copy]')
const copyMsg = document.querySelector('[data-copyMsg]')
const lengthDisplay = document.querySelector('[data-passwordLength]')
const inputSlider = document.querySelector('[data-inputSlider]')
const uppercase = document.querySelector('#uppercase')
const lowercase = document.querySelector('#lowercase')
const numbers = document.querySelector('#numbers')
const symbols = document.querySelector('#symbols')
const displayStrength = document.querySelector('[data-displayStrength]')
const generateBtn = document.querySelector('#generateButton')
const allCheckbox = document.querySelectorAll('input[type=checkbox] ')

const stringOfSymbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/"
console.log(stringOfSymbols.length);

setStrength('#ccc')


let passwordLength = 10
let password = ''
let checkCount = 0

handleSlider()

function handleSlider() {
    inputSlider.value = passwordLength
    lengthDisplay.textContent = passwordLength
    const min = inputSlider.min
    const max = inputSlider.max
    const percentage = ((passwordLength - min) * 100) / (max - min);
    inputSlider.style.background = `linear-gradient(to right, #bc15f4 ${percentage}%, #341c4f ${percentage}%)`;
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value; 
    handleSlider()
})

async function copyContent() {
    try {
        
    await navigator.clipboard.writeText(displayPassword.value)
        
    } catch (error) {
        console.log('failed to copy');
    }
    copyMsg.classList.toggle('hidden')

    setTimeout(() => {
        copyMsg.classList.toggle('hidden')
    }, 2000);

}

copyBtn.addEventListener('click', () => {
    if (displayPassword.value) {
        copyContent()
    }
})


function randomValue(min, max) {
    return Math.floor(Math.random() *(max - min ) + min )
}

function generateUppercase () {
    return String.fromCharCode(randomValue(65,91))
}


function generateLowercase () {
    return String.fromCharCode(randomValue(97,123))
}

function generateNumber() {
    return randomValue(0,9)
}



function generateSymbol() {
    const value =  randomValue(0,stringOfSymbols.length)
    return stringOfSymbols.charAt(value)
}

function setStrength(color) {
    displayStrength.style.backgroundColor = `${color}`
    displayStrength.style.boxShadow = `0px 0px 12px 1px ${color}`
}


function calculateStrength(params) {
    let hasUpper = false
    let hasLower = false
    let hasNumber = false
    let hasSymbol = false

    if (uppercase.checked) hasUpper = true; 
    if (lowercase.checked) hasLower = true; 
    if (numbers.checked) hasNumber = true; 
    if (symbols.checked) hasSymbol = true; 


    if ((hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength>=10)){
        setStrength("#0f0")
    }
    else if ( ((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength>=8) ){
        setStrength("#ff0")
    }
    else{
        setStrength('#f00')
    }
    
}

function handleCheckCount() {
    checkCount = 0
    allCheckbox.forEach( (checkbox) => {
        if (checkbox.checked) {
            checkCount++
        }

    } )

    // if (passwordLength < checkCount) {
    //         passwordLength = checkCount
    //         handleSlider()
    // }
}


allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('click', handleCheckCount)
})


generateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        return
    }

    if (passwordLength < checkCount) {
        passwordLength = checkCount
        handleSlider()
    }

    password = ''

    // if (uppercase.checked) {
    //     password += generateUppercase()
    // }

    // if (lowercase.checked) {
    //     password += generateLowercase()
    // }

    // if (numbers.checked) {
    //     password += generateNumber()
    // }

    // if (symbols.checked) {
    //     password += generateSymbol()
    // }



    let setofpassword = []


    if (uppercase.checked) {
        setofpassword.push(generateUppercase)
    }
    
    if (lowercase.checked) {
        setofpassword.push(generateLowercase)
    }
    
    if (numbers.checked) {
        setofpassword.push(generateNumber)
    }
    
    if (symbols.checked) {
        setofpassword.push(generateSymbol)
    }

    for (let i = 0; i < setofpassword.length; i++) {
        password += setofpassword[i]();
    }
    
    console.log('compulsory done');
    

    for (let i = 0; i < (passwordLength - setofpassword.length); i++) {
        console.log('run');
        
        let randomIndex = randomValue(0,setofpassword.length)
        password += setofpassword[randomIndex]()

    }

    password = shufflePassword(Array.from(password))

    displayPassword.value = password

    calculateStrength()

})

function shufflePassword(array) {
    for (let i = 0; i < array.length; i++) {
        const randomindex1 = randomValue(0,array.length)
        const randomindex2 = randomValue(0,array.length)
        let temp = array[randomindex1]
        array[randomindex1] = array[randomindex2]
        array[randomindex2] = temp
    }

    let str = ''
    array.forEach( (el) => (str+=el) )

    return str
}






