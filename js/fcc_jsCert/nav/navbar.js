let pageList = [
    ["Home", "/index.html"],
    ["Projects Summary", "/html/fcc_JSandAlScriptCert/fcc_js_summary.html"],
    ["Palindrome Checker", "/html/fcc_JSandAlScriptCert/PalindromeChecker.html"],
    ["Roman Number Convert","/html/fcc_JSandAlScriptCert/RomanNumeralConverter.html"],
    ["Caesar Cipher", "/html/fcc_JSandAlScriptCert/CaesarsCipher.html"],
    ["Phone Number Validator", "/html/fcc_JSandAlScriptCert/TelephoneNumberValidator.html"],
    ["Cash Register", "/html/fcc_JSandAlScriptCert/CashRegister.html"]
]

// var pathname = window.location.pathname;
// console.log(pathname);

let navBar = `<ul>`;

for (let i = 0; i < pageList.length; i++){
    if(window.location.pathname != pageList[i][1]){
        navBar = navBar.concat(
            `<li class='navElem'><a class='navLinks' href='${pageList[i][1]}'>
                | ${pageList[i][0]} |
            </a></li>`
        );
    }
}

navBar = navBar.concat(`</ul>`)

document.getElementById("navBar").innerHTML = `${navBar}`;
