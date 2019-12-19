function telephoneCheck(str) {
    // Good luck!
    console.log(`Testing for: ${str}`);
  
    let divider = "================================================";
    console.log(divider);
    //Check if input contains illegal characters
    let check1Regex = /[^0-9\-\(\)\s]/g;
    console.log("String has illegal character?: " + check1Regex.test(str));
    if(check1Regex.test(str)){
      console.log("Number contains illegal character(s).");
      return false;
    } else {console.log("Check illegal character(s): Passed!");}
    //End: Check illegal characters
  
    console.log(divider);
  
    //Start: Check Nation Code
    let nationCodeRegex = /^\d{1}[-*\s*\(*]/;
    // console.log(nationCodeRegex.test(str));
    // console.log(str.match(nationCodeRegex));
    console.log("Checking nation code from " + str);
    //Check if the matched case is 1. The U.S code.
    if(nationCodeRegex.test(str)){
      console.log("Nation Code found! Checking validity ...");
      if(str.match(nationCodeRegex)[0].trim() !== '1' && str.match(nationCodeRegex)[0].trim() !== '1-'
      && str.match(nationCodeRegex)[0].trim() !== '1('){
        console.log("Failed: Nation Code must be 1.")
        return false;
      }
      else {console.log("Nation Code Passed !");}
    } else {console.log("No nation code found. Continue to final test ...");}
    //END: Check Nation Code.
  
    //Start Final Phase: Once two initial tests passed. Check str with each valid format.
    let valid = false;  //Valid flag
  
    //Start: Valid format Regular Expressions
    let regexArr = [
      /^\d{3}[\s*\-]*\d{3}[\s*\-]*\d{4}$/i,     // 555-555-555 or 555 555 555 or 5555555555
      /^\d{1}\(\d{3}\)[\s*\-]*\d{3}[\s*\-]*\d{4}$/i,     // (555)555-5555 or 1(555)555-5555
      /^\(\d{3}\)[\s*\-]*\d{3}[\s*\-]*\d{4}$/i,
      /^\d{1}[\s*\-]\d{3}[\s*\-]\d{3}[\s*\-]\d{4}$/i, // 1-555-555-555 or 1 555 555 555
      /^\d{1}[\s*\-]*\(\d{3}\)[\s*\-]\d{3}[\s*\-]*\d{4}$/i  // 1 (555) 555 5555 or 1-(555)-555-5555 or 1(555)555-5555
    ]
    //End: Valid format Regular Expressions
  
    //Loop through each regex. If one is true, stop and return var valid.
    let tempRegex;
    for (let i = 0; i < regexArr.length; i++){
      console.log(`Testing string : ${str} with ${regexArr[i]}`);
      if(regexArr[i].test(str)){
        console.log("Match Found! Input :" + str + " is valid!");
        return true;
      }
      console.log("Not matched: Next ...");
    }
    //End: Final Phase.
  
    //Var valid is return. If all test does not passed. False is returneds
    console.log(`No match is found. Input ${str} is invalid.`)
    return valid;
  }
  

function check(){
    let phoneNum = document.getElementById("inputBox").value;
    if(telephoneCheck(phoneNum)){
    document.getElementById("pOutput").innerHTML = `<b style="color:darkcyan">${phoneNum}</b> is <strong style="color: darkgreen">
        a valid</strong> U.S phone number.`
    }
    else{
    document.getElementById("pOutput").innerHTML = `<b style="color:darkcyan">${phoneNum}</b> is <strong style="color: red">not</strong>
            a valid U.S phone number.`
    }
}
  //console.log(telephoneCheck("(555)555-5555"));
  
//   function startTesting(){
//     console.log(telephoneCheck("555-555-5555")); //should return a boolean.
//     console.log(telephoneCheck("1 555-555-5555")); //should return true.
//     console.log(telephoneCheck("1 (555) 555-5555")); //should return true.
//     console.log(telephoneCheck("5555555555")); //should return true.
//     console.log(telephoneCheck("555-555-5555")); //should return true.
//     console.log(telephoneCheck("(555)555-5555")); //should return true.
//     console.log(telephoneCheck("1(555)555-5555")); //should return true.
//     console.log(telephoneCheck("555-5555")); //should return false.
//     console.log(telephoneCheck("5555555")); //should return false.
//     console.log(telephoneCheck("1 555)555-5555")); //should return false.
//     console.log(telephoneCheck("1 555 555 5555")); //should return true.
//     console.log(telephoneCheck("1 456 789 4444")); //should return true.
//     console.log(telephoneCheck("123**&!!asdf#")); //should return false.
//     console.log(telephoneCheck("55555555")); //should return false.
//     console.log(telephoneCheck("(6054756961)")); //should return false
//     console.log(telephoneCheck("2 (757) 622-7382")); //should return false.
//     console.log(telephoneCheck("0 (757) 622-7382")); //should return false.
//     console.log(telephoneCheck("-1 (757) 622-7382")); //should return false
//     console.log(telephoneCheck("2 757 622-7382")); //should return false.
//     console.log(telephoneCheck("10 (757) 622-7382")); //should return false.
//     console.log(telephoneCheck("27576227382")); //should return false.
//     console.log(telephoneCheck("(275)76227382")); //should return false.
//     console.log(telephoneCheck("2(757)6227382")); //should return false.
//     console.log(telephoneCheck("2(757)622-7382")); //should return false.
//     console.log(telephoneCheck("555)-555-5555")); //should return false.
//     console.log(telephoneCheck("(555-555-5555")); //should return false.
//     console.log(telephoneCheck("(555)5(55?)-5555")); //should return false.
//   } 