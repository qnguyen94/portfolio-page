let pageList = [
    ["Home", "/portfolio-page/index.html"],
    ["Projects Summary", "/portfolio-page/html/fcc_JSandAlScriptCert/fcc_js_summary.html"],
    ["Palindrome Checker", "/portfolio-page/html/fcc_JSandAlScriptCert/PalindromeChecker.html"],
    ["Roman Number Convert","/portfolio-page/html/fcc_JSandAlScriptCert/RomanNumeralConverter.html"],
    ["Caesar Cipher", "/portfolio-page/html/fcc_JSandAlScriptCert/CaesarsCipher.html"],
    ["Phone Number Validator", "/portfolio-page/html/fcc_JSandAlScriptCert/TelephoneNumberValidator.html"],
    ["Cash Register", "/portfolio-page/html/fcc_JSandAlScriptCert/CashRegister.html"]
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
