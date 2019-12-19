function convertToRoman(num) {
    console.log(typeof(num));
    let regexInt = /\D/g;
    if((Number(num) === num && num % 1 !== 0) || regexInt.test(num)){ //numer is float
        return "<font style='color:darkred'>Must be a whole number!</font>";
    }

    num = parseInt(num);

    if(num > 3999 || num < 1){
        return "<font style='color:darkred'>This program cannot convert a number smaller than 1 or larger than 3999</font>";
    }

    //Roman numberic chart
    let romanArr= 
        [  
            ['','I','II','III','IV','V','VI','VII','VIII','IX'], // Index 0: 1 ,2 ,3 ,4 ,5, 6, 7, 8, 9
            ['','X','XX','XXX','XL','L','LX','LXX','LXXX','XC'], // Index 1: 10, 20, 30, 40, 50, 60, 70, 80, 90
            ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM'], // Index 2: 100, 200, 300, 400, 500, 600, 700, 800, 900
            ['','M','MM','MMM']  // Index 3: 1000, 2000, 3000
        ];

    //Inititate flags
    let one = 0;
    let ten = 0;
    let hundred = 0;
    let thousand = 0;

    //Assign flags. Nesting if to save processing time.
    if (num > 0){
        one = 1;
        if (num > 9){
            ten = 1;
            if (num > 99){
                hundred = 1;
                if (num > 999){
                    thousand = 1;
                }
            }
        }
    }

    //console.log(one, ten, hundred, thousand);

    // Number holders
    let thsNum = 0;
    let hdrNum = 0; 
    let tnNum = 0;
    // No oneNum, if num is more than 1 digit, num will be left with 1 digit after below operations

    //String holders
    let thsStr = '';
    let hdrStr = '';
    let tnStr = '';
    let numStr = '';

    // Assign numbers
    if(thousand === 1){
        thsNum = Math.floor(num/1000);
        num = num - thsNum*1000;
        thsStr = romanArr[3][thsNum];
        //console.log(num, thsStr);
    }

    if (hundred === 1){
        hdrNum = Math.floor(num/100);
        num = num - hdrNum*100;
        hdrStr = romanArr[2][hdrNum];
        //console.log(num, hdrStr);
    }

    if (ten === 1){
        tnNum = Math.floor(num/10);
        num = num - tnNum*10;
        tnStr = romanArr[1][tnNum];
        //console.log(num, tnStr);
    }

    numStr = romanArr[0][num];
    //console.log(num, numStr);

    console.log(thsNum, hdrNum, tnNum, num);
    //console.log(thsStr + hdrStr + tnStr + numStr);


    return thsStr + hdrStr + tnStr + numStr;
}

function convertNumber() {
    let result = convertToRoman(document.getElementById("stringToCheck").value);
    document.getElementById("pOutput").innerHTML = 
            `<center><em style="color: darkgreen"><b>${result}</b></em> </center>`;
}