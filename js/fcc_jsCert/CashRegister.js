//Function to process amount, cash, and changes to be given out
function checkCashRegister(price, cash, cid) {
    var changeNeeded = cash - price;
    console.log(`Change needed: \$${changeNeeded}`);
    
    //Create an object with all values in cid
    let cidObj ={};
    for (let i = 0; i < cid.length; i++){
        cidObj[cid[i][0]] = cid[i][1];
    }

    // console.log(`Cash register contains:`)
    //console.log(cidObj);

    // Create an object to hold changes
    let changeObj = {
        "status": "pending",
        "change": []
    };

    if(changeNeeded < 0){
        changeObj['status'] = 'INSUFFICIENT_CASH';
        return changeObj;
    }

    // Case: There is not enough money
    let totalAvail = 0;
    for(let prop in cidObj){
        totalAvail = totalAvail + cidObj[prop];
        // Fix incorrect floating points. Source: https://www.jacklmoore.com/notes/rounding-in-javascript/
        totalAvail = Number(Math.round(totalAvail+'e2')+'e-2');
        //console.log(`${prop}: ${cidObj[prop]} ---> Total: ${totalAvail}`);
    }
    
    if(totalAvail < changeNeeded){
        changeObj['status'] = "INSUFFICIENT_FUNDS";
        return changeObj;
    }
    // End Case: There is not enough money

    //Case CLOSED: Cash left in drawer = changes => no more money to operate
    if (totalAvail == changeNeeded){
        console.log(`Confirm Closed Case!`);
        changeObj['status'] = "CLOSED";
        for(let prop in cidObj){
            changeObj["change"].push([prop, cidObj[prop]]);
        }
        return changeObj;
    }
    //End Case CLOSED

    // Go through changes bills available in cid object. Large -> small.
    let billValue ={
        "ONE HUNDRED": 100,
        "TWENTY": 20,
        "TEN": 10,
        "FIVE": 5,
        "ONE": 1,
        "QUARTER": 0.25,
        "DIME": 0.1,
        "NICKEL": 0.05,
        "PENNY": 0.01
    }
    let changesObject = {
        "ONE HUNDRED": 0,
        "TWENTY": 0,
        "TEN": 0,
        "FIVE": 0,
        "ONE": 0,
        "QUARTER": 0,
        "DIME": 0,
        "NICKEL": 0,
        "PENNY": 0
    }

    for (let prop in changesObject){
        while (changeNeeded >= billValue[prop] && cidObj[prop] >= billValue[prop]){
            cidObj[prop] -= billValue[prop]; //Decrease available bills/coins
            cidObj[prop] = Number(Math.round(cidObj[prop]+'e2')+'e-2'); //Fix inaccurate float
            changesObject[prop] +=  billValue[prop]; //Increase amount to give out as changes
            changesObject[prop] = Number(Math.round(changesObject[prop]+'e2')+'e-2'); //Fix inaccurate float
            changeNeeded -= billValue[prop]; //Decrease the required change amount
            changeNeeded = Number(Math.round(changeNeeded+'e2')+'e-2'); //Fix inaccurate float
            //console.log(`${prop} change: ${changesObject[prop]}`);
        }
    }
    
    console.log(`Changes could be given out:\n`);
    console.log(changesObject);
    console.log(`Change needed left: ${changeNeeded}`);

    //Case: Cannot return exact changes
    if(changeNeeded > 0){
        changeObj["status"] = "INSUFFICIENT_FUNDS";
        return changeObj;
    }
    //End Case: Cannot return exact changes

    //Insert changes amount in cash register into object array
    for(let prop in changesObject){
        if(changesObject[prop] > 0){
            changeObj["change"].push([prop, changesObject[prop]]);
        }
    }
    
    //Case OPEN. If code reach this point. There is enough money to give as change.
    changeObj["status"] = "OPEN";
    // End Case Open

    return changeObj;
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]


//**************************************** */
// HTML functions
// Use for processing and displaying results
//**************************************** */

//Generate random values for testing
function randomTransValuesGen(){
    //Generate random price
    let price = Math.random() * (10000 - 0) + 0;
    console.log(`Random Price: ${price}`);

    //Generate random cash
    let cash = Math.random() * (20000 - 0) + 0;
    console.log(`Random Cash: ${cash}`);

    //Assign random values to HTML elements
    document.getElementById("price").value = price.toFixed(2);
    document.getElementById("cashPaid").value = cash.toFixed(2);
}

function randomRegValuesGen(){
    //Generate random cash register values, 9 values
    //Max of 500 pieces, Min of 10 pieces.
    let ranArr = [];
    for(let i = 0; i < 9; i++){
        ranArr.push(Math.random() * (500 - 10) + 10);
    }
    console.log(`Random Reg Values: ${ranArr}`);

    //Assign
    document.getElementById("penny").value = Math.round(ranArr[0]);
    document.getElementById("nickel").value = Math.round(ranArr[1]);
    document.getElementById("dime").value = Math.round(ranArr[2]);
    document.getElementById("quarter").value = Math.round(ranArr[3]);
    document.getElementById("one").value = Math.round(ranArr[4]);
    document.getElementById("five").value = Math.round(ranArr[5]);
    document.getElementById("ten").value = Math.round(ranArr[6]);
    document.getElementById("twenty").value = Math.round(ranArr[7]);
    document.getElementById("oneHundred").value = Math.round(ranArr[8]);
}


//Assign new register values to main register values when Continue Operation button is clicked.
function contOp(){
    document.getElementById("penny").value = document.getElementById("pennyNew").value;
    document.getElementById("nickel").value = document.getElementById("nickelNew").value;
    document.getElementById("dime").value = document.getElementById("dimeNew").value;
    document.getElementById("quarter").value = document.getElementById("quarterNew").value;
    document.getElementById("one").value = document.getElementById("oneNew").value;
    document.getElementById("five").value = document.getElementById("fiveNew").value;
    document.getElementById("ten").value = document.getElementById("tenNew").value;
    document.getElementById("twenty").value = document.getElementById("twentyNew").value;
    document.getElementById("oneHundred").value = document.getElementById("oneHundredNew").value;
}

function displayChanges(changeArr){
    let changeStr = 'Changes Return: </br>';
    let changeAmount = 0;
    for(let i = 0; i < changeArr.length; i++){
        changeAmount = 0;
        switch(changeArr[i][0]){
            case 'PENNY':
                changeAmount = Math.round(changeArr[i][1] / 0.01);
                changeStr = changeStr.concat(`${changeAmount} x Penny(s)</br>`);
            break;
            case 'NICKEL': 
                changeAmount = Math.round(changeArr[i][1] / 0.05);
                changeStr = changeStr.concat(`${changeAmount} x Nickel(s)</br>`);
            break;
            case 'DIME':
                changeAmount = Math.round(changeArr[i][1] / 0.1);
                changeStr = changeStr.concat(`${changeAmount} x Dime(s)</br>`);
            break;
            case 'QUARTER':
                changeAmount = Math.round(changeArr[i][1] / 0.25);
                changeStr = changeStr.concat(`${changeAmount} x Quarter(s)</br>`);
            break;
            case 'ONE':
                changeAmount = Math.round(changeArr[i][1] / 1);
                changeStr = changeStr.concat(`${changeAmount} x One(s)</br>`);
            break;
            case 'FIVE':
                changeAmount = Math.round(changeArr[i][1] / 5);
                changeStr = changeStr.concat(`${changeAmount} x Five(s)</br>`);
            break;
            case 'TEN':
                changeAmount = Math.round(changeArr[i][1] / 10);
                changeStr = changeStr.concat(`${changeAmount} x Ten(s)</br>`);
            break;
            case 'TWENTY':
                changeAmount = Math.round(changeArr[i][1] / 20);
                changeStr = changeStr.concat(`${changeAmount} x Twenty(ies)</br>`);
            break;
            case 'ONE HUNDRED':
                changeAmount = Math.round(changeArr[i][1] / 100);
                changeStr = changeStr.concat(`${changeAmount} x One Hundred(s)</br>`);
            break;
        }
    }

    return changeStr;
}

//Display result after checkout process (main) finished running
function displayResult (changesObj,arr){
    if(changesObj['status'] === 'OPEN'){
        document.getElementById("contOp").style.visibility = 'visible';
        document.getElementById("pOutput").innerHTML =
         `<b style="color:darkgreen">Open register.</br> Return ${displayChanges(changesObj['change'])}</b></br>
         <b style="color:darkgreen;">Transaction Successful!</b>`;
        //Set new values to read-only fields
        document.getElementById("pennyNew").value = Math.round(arr[0][1] / 0.01);
        document.getElementById("nickelNew").value = Math.round(arr[1][1] / 0.05);
        document.getElementById("dimeNew").value = Math.round(arr[2][1] / 0.1);
        document.getElementById("quarterNew").value = Math.round(arr[3][1] / 0.25);
        document.getElementById("oneNew").value = Math.round(arr[4][1] / 1);
        document.getElementById("fiveNew").value = Math.round(arr[5][1] / 5);
        document.getElementById("tenNew").value = Math.round(arr[6][1] / 10);
        document.getElementById("twentyNew").value = Math.round(arr[7][1] / 20);
        document.getElementById("oneHundredNew").value = Math.round(arr[8][1] / 100);
    }
    else{
        document.getElementById("contOp").style.visibility = 'hidden';

        if(changesObj['status'] === 'INSUFFICIENT_FUNDS'){
            document.getElementById("pOutput").innerHTML = `<b style="color:darkred;">Transaction Failed! Insufficient Funds!</b>`;
        }
        else if (changesObj['status'] === 'CLOSED'){
            document.getElementById("pOutput").innerHTML =
             `<b style="color:darkgreen">Open register</br> Return ${displayChanges(changesObj['change'])}</b></br>
             <b style="color:brown;">Transaction Completed! Register Closed! All changes spent!</b>`;
            document.getElementById("pennyNew").value = 0;
            document.getElementById("nickelNew").value = 0;
            document.getElementById("dimeNew").value = 0;
            document.getElementById("quarterNew").value = 0;
            document.getElementById("oneNew").value = 0;
            document.getElementById("fiveNew").value = 0;
            document.getElementById("tenNew").value = 0;
            document.getElementById("twentyNew").value = 0;
            document.getElementById("oneHundredNew").value = 0;
        }
        else if (changesObj['status'] === 'INSUFFICIENT_CASH'){
            document.getElementById("pOutput").innerHTML =
             `<b style="color:darkred">Transaction Failed! Insuffient cash given!</b>`;
            document.getElementById("pennyNew").value = document.getElementById("penny").value;
            document.getElementById("nickelNew").value = document.getElementById("nickel").value;
            document.getElementById("dimeNew").value = document.getElementById("dime").value;
            document.getElementById("quarterNew").value = document.getElementById("quarter").value;
            document.getElementById("oneNew").value = document.getElementById("one").value;
            document.getElementById("fiveNew").value = document.getElementById("five").value;
            document.getElementById("tenNew").value = document.getElementById("ten").value;
            document.getElementById("twentyNew").value = document.getElementById("twenty").value;
            document.getElementById("oneHundredNew").value = document.getElementById("oneHundred").value;
        }
    }
    
}

function reset(){
    //reset the output displays when checkout is clicked
    document.getElementById("pOutput").innerHTML = 'Awaiting Input!';
    document.getElementById("pennyNew").value = 0;
    document.getElementById("nickelNew").value = 0;
    document.getElementById("dimeNew").value = 0;
    document.getElementById("quarterNew").value = 0;
    document.getElementById("oneNew").value = 0;
    document.getElementById("fiveNew").value = 0;
    document.getElementById("tenNew").value = 0;
    document.getElementById("twentyNew").value = 0;
    document.getElementById("oneHundredNew").value = 0;
}

//Start checkout Process (Main Function)
function checkout(){
    reset();
    let totalPrice = parseFloat(document.getElementById("price").value); //price
    let cashPaid = parseFloat(document.getElementById("cashPaid").value); //cash
    let checkoutArr = [
        ["PENNY",parseInt(document.getElementById("penny").value)*0.01], //penny
        ["NICKEL",parseInt(document.getElementById("nickel").value)*0.05], //nickel
        ["DIME",parseInt(document.getElementById("dime").value)*0.1], //dime
        ["QUARTER",parseInt(document.getElementById("quarter").value)*0.25], //quarter
        ["ONE",parseInt(document.getElementById("one").value)], //one
        ["FIVE",parseInt(document.getElementById("five").value)*5], //five
        ["TEN",parseInt(document.getElementById("ten").value)*10], //ten
        ["TWENTY",parseInt(document.getElementById("twenty").value)*20], //twenty
        ["ONE HUNDRED",parseInt(document.getElementById("oneHundred").value)*100] //oneHundred
    ]
    console.log(checkoutArr);

    let result = checkCashRegister(totalPrice, cashPaid, checkoutArr);
    //document.getElementById("pOutput").innerHTML = `${result['status']} ... ${result['change']}`;
    let newArr = [...checkoutArr];

    console.log(result);

    //Update new values into a temporary string
    if(result['change'].length > 0){
        for(let i = 0; i < result['change'].length; i++){
            for(let j = 0; j < newArr.length; j++){
                if(result.change[i][0] == newArr[j][0]){
                    newArr[j][1] = newArr[j][1] - result.change[i][1];
                }
            }
        }
    }

    console.log(newArr);

    displayResult(result,newArr);
}

//Reset Input and output on HTML page
function resetAll(){
    //Reset input
    document.getElementById("price").value = 0.00;
    document.getElementById("cashPaid").value = 0.00;
    document.getElementById("penny").value = 0;
    document.getElementById("nickel").value = 0;
    document.getElementById("dime").value = 0;
    document.getElementById("quarter").value = 0;
    document.getElementById("one").value = 0;
    document.getElementById("five").value = 0;
    document.getElementById("ten").value = 0;
    document.getElementById("twenty").value = 0;
    document.getElementById("oneHundred").value = 0;
    console.log("Input reset");


    //Reset output
    document.getElementById("pOutput").innerHTML = 'Awaiting Input!';
    document.getElementById("pennyNew").value = 0;
    document.getElementById("nickelNew").value = 0;
    document.getElementById("dimeNew").value = 0;
    document.getElementById("quarterNew").value = 0;
    document.getElementById("oneNew").value = 0;
    document.getElementById("fiveNew").value = 0;
    document.getElementById("tenNew").value = 0;
    document.getElementById("twentyNew").value = 0;
    document.getElementById("oneHundredNew").value = 0;
    console.log("Output Reset");
}