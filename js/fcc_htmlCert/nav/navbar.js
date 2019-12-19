let pageList = [
    ["Home", "./portfolio-page/index.html"],
    ["Projects Summary", "./portfolio-page/html/fcc_htmlAndCssCert/fcc_html_summary.html"],
    ["Tribute Page", "/portfolio-page/html/fcc_htmlAndCssCert/tributePage.html"],
    ["Survey Form","./portfolio-page/html/fcc_htmlAndCssCert/surveyForm.html"],
    ["Product Landing Page", "./portfolio-page/html/fcc_htmlAndCssCert/productLandingPage.html"]
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
