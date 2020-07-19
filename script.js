var highscoreDiv = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var sButton = document.getElementById("startbutton");
var conts = document.getElementsByClassName("container");
var questionList = document.querySelector("#questionList");
//var h2El = document.getElementById("question");
var resDiv = document.getElementById("resultDiv");
//var myForm = document.getElementById("myForm");
//var initial = document.getElementById("initials");

//var formH2 = h2El[0];

var listOfQuestions = [
    {
        question: "HTML stands for?",
        answers: ["1. Hyper Text Markup Language", "2. High Text Markup Language", "3. Hyper Tabular Markup Language", "4. None of the above"],
        correctAnswer: 1
    },
    {
        question: "Which of the following tag is used to mark a begining of paragraph?",
        answers: ["1. &lttd&gt", "2. &ltdiv&gt", "3. &ltbr&gt", "4. &ltp&gt"],
        correctAnswer: 4
    },
    {
        question: "Javascript is",
        answers: ["1. A programming language", "2. Compiled code", "3. Scripting language", "4. None of the above"],
        correctAnswer: 3
    },
    {
        question: "Data types supported in JavaScript",
        answers: ["1. Boolean", "2. String", "3. Number", "4. All the above"],
        correctAnswer: 4
    },
    {
        question: "Which of the following is true for Array in JavaScript?",
        answers: ["1. It can contain only numbers", "2. It can contain only string", "3. A combination of different data type", "4. All the above"],
        correctAnswer: 4
    }
]

var cont1 = conts[0];
var cont2 = conts[1];
var cont3 = conts[2];
var val = timerEl.textContent;
console.log(val);

var questionCount = 0;

var secondsLeft = 40;
var lastScore = 0;
var allDone = false;
var eachQuesTimeLeft = 10;

var highscoreArray = [];


function init() {
    console.log("Initialize");
    timerEl.textContent = val + secondsLeft;
    cont2.setAttribute("style", "display: none;");
    cont3.setAttribute("style", "display: none;");
}

function startTimer() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = val + secondsLeft;

    if(secondsLeft === 0 || allDone) {
      clearInterval(timerInterval);
      afterQuiz();
    }

  }, 1000);
}

sButton.addEventListener("click", function() {
    event.preventDefault();
    console.log("button clicked");
    startTimer();
    cont1.setAttribute("style", "display: none;");
    startQuestions();
});

function resetQueTimer() {
    eachQuesTimeLeft = 10;
    console.log("In resetQueTimer: " + eachQuesTimeLeft);
};

function startQueTimer() {
    resetQueTimer();
    var queInterval = setInterval (function() {
      eachQuesTimeLeft--;
  
      if(eachQuesTimeLeft === 0 || allDone) {
        clearInterval(queInterval);
        if (!allDone) {
            questionCount++;
            populateQuestion();
        }
      }
  
    }, 1000);
  }

function startQuestions() {
    console.log("In conatiner 2");
    cont2.setAttribute("style", "display: block;");
    populateQuestion();
}
// ******  For each question, add a timer
function populateQuestion() {
    if (questionCount < listOfQuestions.length) {
        //h2El.textContent = listOfQuestions[questionCount].question;
        questionList.textContent = listOfQuestions[questionCount].question;

        console.log("question is: "+ questionList.textContent);
        for (var i=0; i<4; i++) {
            var lix = document.createElement("li");
            var cButtonInfo;
            lix.setAttribute("id", i);
            cButtonInfo = listOfQuestions[questionCount].answers[i];
            console.log("From the list : " + listOfQuestions[questionCount].answers[i]);
            console.log("added to button : "+ cButtonInfo);
            lix.innerHTML= "<button>" + cButtonInfo + "</button>";
            //console.log("lix : " + lix.innerHTML);
            questionList.appendChild(lix);
        };
    } else {
        console.log("Good job! All questions are over!");
        allDone = true;
    }
    startQueTimer();

};

function clearContainer() {
    var element;
    for (var i=0; i<4; i++) {
        element = document.getElementById(i);
        questionList.removeChild(element);
    };
}


cont2.addEventListener("click", function() {
    // Add - display "correct" if user is correct!
    event.preventDefault();
    if(event.target.matches("button")) {
        var userAnswer = event.target.textContent;
        console.log("user answer :"+userAnswer + " char at 0: "+userAnswer.charAt(0));
        // OR I can use parent id but that is string again!
        //console.log("parent of event: "+event.target.parentNode.id);
        if (parseInt(userAnswer.charAt(0)) === listOfQuestions[questionCount].correctAnswer) {
            console.log("Hurray!!!!!");
            lastScore++;
            displayResult(1);
        }
        else {
            displayResult(0);
            console.log ("Next time!!!!");
        }
        questionCount++;
        clearContainer();
        populateQuestion();
    };

});

function displayResult(num) {
    if (num === 1) {
        resDiv.innerHTML = "<hr/><p>Correct</p>";
    } else {
        resDiv.innerHTML = "<hr><p>Wrong<p>";
    }
    setTimeout(function(){
        resDiv.innerHTML = "<p></p>";
        //console.log("res " + resDiv.innerHTML);
    },500);
};

function afterQuiz() {
    //Add the information to populate High Score
    console.log ("Time is up!");
    cont2.setAttribute("style", "display: none;");
    cont3.setAttribute("style", "display: block;");
    var newH1 = document.createElement("h1");
    newH1.textContent = "All Done!!!";
    cont3.append (newH1);
    var h3Element = document.createElement("h3");
    //pElement.innerHTML = "<p>Your Score is: "+ lastScore + "</p>";
    h3Element.textContent = "Your Score is: "+lastScore;
    console.log ("what to display "+h3Element.textContent);
    cont3.appendChild(h3Element);
    var iLabel = document.createElement("label")
    iLabel.setAttribute("style", "type: text, id: fname; name: initials;");
    iLabel.textContent = "Enter your initials:  ";
    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("id", "initials");
    inputBox.setAttribute("name", "initials");
    inputBox.setAttribute("placeholder", "abc");
    //cont3.append("Enter your initials  ", inputBox);
    var smButton = document.createElement("button");
    smButton.textContent = "Submit";
    //var gotoPage = "href=http://google.com";
    //smButton.setAttribute("onclick", gotoPage);
    // add <button onclick="location.href = 'www.yoursite.com';" id="myButton" class="float-left submit-button" >Home</button>
    //somekind of onclick to submit button
    cont3.append (iLabel, inputBox);
    cont3.append (smButton);
}

cont3.addEventListener("click", function() {
    // clicking submit should take the user to a different html page
    var initials = document.getElementById("initials");
    event.preventDefault();
    if(event.target.matches("button")) {
        console.log("Clicked");
        var highscoreObj = {
            initial: initials.value.trim(),
            score: lastScore
        };
        
        var storedHighscore = JSON.parse(localStorage.getItem("highscoreArray"));
        if(storedHighscore !== null) {
            highscoreArray = storedHighscore;
            console.log(storedHighscore);
        } 
        highscoreArray.push(highscoreObj);
        localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));
        pageRedirect();
    };
});

highscoreDiv.addEventListener("click", function() {
    //event.preventDefault();
    pageRedirect();
});

function pageRedirect() {
    //window.location.replace("https://www.google.com/");
    window.location.href = "highscore.html";
};

init();

