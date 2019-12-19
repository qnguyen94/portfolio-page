/*
    Palindrom Checker
        String is the same forward and backward
        Input string is stripped of all punctuation, whitespaces, and special chars.
*/


//Main Function
function palindrome(str) {

    let str1 = '';
    //Turn everything into the same case (lower or upper case)
    for(let i = 0; i < str.length; i++){
        str1 = str1.concat(str[i].toLowerCase());
    }
    console.log(str1);

    //Remove all non-alphanumeric characters (punctuation, spaces and symbols)
    str1 = str1.replace(/[^a-z0-9]/g,'');
    console.log(str1);

    //Create a reversed string.
    let str2 = '';
    for (let i = 0 ;i < str1.length; i++){
        str2 = str2.concat(str1[str1.length - i -1]);
    }
    //console.log(str2);

    //Compare two strings. Return false if unmatch happens.
    for (let i = 0; i < str1.length; i++){
        if(str1[i] !== str2[i]){
            return [false, str2];
        }
    }

    return [true,str2];
  }


  //Function that get value from html --> Process --> return value to html
  function checkStr(){
    var checkString = document.getElementById("stringToCheck").value;
    console.log(checkString);

    if(checkString === ''){
        document.getElementById("stringToCheck").placeholder = `Please provide a string`;
    }
    else {
        var result = palindrome(checkString);
        if(result[0] === true){
            document.getElementById("response").innerHTML = 
            `<center><em style="color: darkgreen"><b>${checkString}</b></em> 
            is a <strong>Palindrome</strong> string</center>`;
        }
        else{
            document.getElementById("response").innerHTML = 
                `<center><em style="color: darkgreen"><b>${checkString}</b></em> is
                <strong style="color:red">Not</strong> a <strong>Palindrome</strong> string</center>`;
        }
        document.getElementById("pOutput").innerHTML = 
            `<center><b>The reversed string is:</b></center> </br><center>
            <center><em style="color: darkgreen"><b>${result[1]}</b></em></center>`;
    }
  }