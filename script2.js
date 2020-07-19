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
        console.log(storedHighscore);
    }  else {
        return;
    };
    for (var i = 0; i<highscoreArray.length; i++) {
        //var rowN = document.createElement("tr");
        var row = hsTable.insertRow(i);
        //row.setAttribute("scope", "row");
        //row.textContent(i+1);
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        console.log(highscoreArray[i].initial + " & " + highscoreArray[i].score);
        cell0.innerHTML = i+1;
        cell1.innerHTML = highscoreArray[i].initial;
        cell2.innerHTML = highscoreArray[i].score;
    };
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