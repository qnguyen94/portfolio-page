let alphabet = {
    1:"A", 2:"B", 3:"C", 4:"D", 5:"E", 6:"F",
    7:"G", 8:"H", 9:"I", 10:"J", 11:"K", 12:"L",
    13:"M", 14:"N", 15:"O", 16:"P", 17:"Q", 18:"R",
    19:"S", 20:"T", 21:"U", 22:"V", 23:"W", 24:"X",
    25:"Y", 26:"Z"
}

function decryptChar(char, key){

    let charKey = 0;
    //Assign charKey with key of character
    for (let i = 1; i <= 26; i++){
        //console.log(i);
        if(alphabet[i] == char){
            charKey = i;
            break;
        }
    }

    if(charKey === 0){return char};

    let newCharKey = charKey - key;
    while(newCharKey < 1){
        newCharKey = 26 + newCharKey;
    }

    return alphabet[newCharKey];
}

function encryptChar(char, key){

    let charKey = 0;
    //Assign charKey with key of character
    for (let i = 1; i <= 26; i++){
        //console.log(i);
        if(alphabet[i] == char){
            charKey = i;
            break;
        }
    }

    if(charKey === 0){return char};

    let newCharKey = charKey + key;
    while(newCharKey > 26){
        newCharKey = newCharKey - 26;
    }

    return alphabet[newCharKey];
}

function prepStr(str){
    let str1 = [];
    for(let i = 0; i <str.length; i++){
        str1.push(str[i].toUpperCase());
    }
    str1 = str1.join('');
    return str1;
}

function decrypt() {
    if(document.getElementById("encryptKey").value == ''){
        document.getElementById("pOutput").innerHTML = `Enter only whole number`;
    }
    else{
        let decryptKey = parseInt(document.getElementById("encryptKey").value);
        let str = prepStr(document.getElementById("textBox").value);
        let decipheredStr = '';
        for (let p = 0; p < str.length; p++){
            decipheredStr = decipheredStr.concat(decryptChar(str[p], decryptKey))
        }
        console.log(decipheredStr);
    
        document.getElementById("pOutput").innerHTML = `${decipheredStr}`;
    }
}

function encrypt() {
    if(document.getElementById("encryptKey").value == ''){
        document.getElementById("pOutput").innerHTML = `Enter only whole number`;
    }
    else{
        let encryptKey = parseInt(document.getElementById("encryptKey").value);
        let str = document.getElementById("textBox").value;
        str = prepStr(str);
        console.log(str);
        let encrypteddStr = '';
        for (let p = 0; p < str.length; p++){
            encrypteddStr = encrypteddStr.concat(encryptChar(str[p], encryptKey))
        }

        console.log(encrypteddStr);
    
        document.getElementById("pOutput").innerHTML = `${encrypteddStr}`;
    }
}
