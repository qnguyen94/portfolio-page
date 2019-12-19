//Number validation and fix for Cash Register App
function validateCurrency(numStr){
    if(numStr == ''){ //Return 0 if empty
        numStr = 0;
        return numStr.toString();
    }
    let regexDec = /^\d*(?=\.\d{0,2}$)/i;
    if(regexDec.test(numStr) === false){ //Fix number to 2 decimals
        return (parseFloat(numStr).toFixed(2)).toString();
    }
    
    return numStr; //Return number if criteria met.
}

//console.log(validateCurrency("7.00"));

//Key fix for Ceasar Cipher App. Only allow positive whole numbers.
function validateKey(key){
    if(key < 0){
        key = key *= -1;
    }

    return Math.round(key);
}