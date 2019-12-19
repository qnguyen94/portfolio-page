function twoDigit(num){
    if(num < 10){
        return `0${num}`;
    }
    return num;
}

function liveClock() {
    var today = new Date();
    var time = twoDigit(today.getHours()) + ":" + twoDigit(today.getMinutes()) + ":" + twoDigit(today.getSeconds());
    document.getElementById("clock").innerHTML = `${time}`;
}

setInterval(liveClock, 1000); // Time in milliseconds