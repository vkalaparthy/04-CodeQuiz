var containerElement = document.getElementById("container");
var hsTable = document.getElementById("tableBody");
var goback = document.getElementById("gobackButton");
var hsButton = document.getElementById("hsButton");

var highscoreArray = [];

function init() {
    populateTable();
};

function populateTable() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscoreArray"));
    if(storedHighscore !== null) {

        highscoreArray = storedHighscore;
        //highscoreArray = sortScores(highscoreArray);
        //console.log(storedHighscore);
        highscoreArray = sortScores (highscoreArray);
    }  else {
        return;
    };
    for (var i = 0; i<highscoreArray.length; i++) {
        var row = hsTable.insertRow(i);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        //console.log(highscoreArray[i].initial + " & " + highscoreArray[i].score);
        cell0.innerHTML = i+1;
        cell1.innerHTML = highscoreArray[i].initial;
        cell2.innerHTML = highscoreArray[i].score;
    };
};

function sortScores(hsArray) {
    var high;
    var newArray = [];

    while (hsArray.length >= 1) {
        high = 0;
        for (var n = 1; n<hsArray.length; n++) {
            if (hsArray[n].score > hsArray[high].score) {
                high = n;
                //excahnge the objects
                //console.log("high index: " + high);
            }
        }
        var highscoreObj = {
            initial: hsArray[high].initial,
            score: hsArray[high].score
        };
        //console.log("high "+ hsArray[high].initial + " , " + hsArray[high].score);
        hsArray.splice(high, 1);
        newArray.push(highscoreObj);
    }
    //console.log("new Array");
    console.log (newArray);
    return newArray;
};

goback.addEventListener("click", function() {
    event.preventDefault();
    window.location.href = "./index.html";
});

hsButton.addEventListener("click", function() {
    console.log("in hsButton event");
    localStorage.clear();
    location.reload();
});

init();