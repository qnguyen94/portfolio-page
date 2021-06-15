let pageList = [
    ["Home", "/index.html"],
    ["Projects Summary", "/fcc_htmlAndCssCert/fcc_html_summary.html"],
    ["Tribute Page", "/fcc_htmlAndCssCert/tributePage.html"],
    ["Survey Form","/fcc_htmlAndCssCert/surveyForm.html"],
    ["Product Landing Page", "/html/fcc_htmlAndCssCert/productLandingPage.html"]
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
