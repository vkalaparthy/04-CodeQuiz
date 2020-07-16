var timerEl = document.getElementById("timer");
var sButton = document.getElementById("startbutton");
var conts = document.getElementsByClassName("container");
var questionList = document.querySelector("#option-list");
var h2El = document.getElementById("question");
//var myForm = document.getElementById("myForm");
var pElement = document.querySelector("p");

//var formH2 = h2El[0];

var listOfQuestions = [
    {
        question: "What is 10/2?",
        answers: ["3", "5", "100", "20"],
        correctAnswer: "5"
    },
    {
        question: "What is 30/3?",
        answers: ["3", "5", "10", "1"],
        correctAnswer: "10"
    },
    {
        question: "How is this homework?",
        answers: ["Very hard", "Hard", "Easy", "Very easy"],
        correctAnswer: "Very hard"
    }
];

var cont1 = conts[0];
var cont2 = conts[1];
var cont3 = conts[2];
var val = timerEl.textContent;
console.log(val);

var questionCount = 0;

var secondsLeft = 6;
var lastScore = 0;

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

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }

  }, 1000);
}

function sendMessage() {
    //Add the information to populate High Score
    console.log ("Time is up!!!!");
    cont2.setAttribute("style", "display: none;");
    cont3.setAttribute("style", "display: block;");
    var pElement = document.createElement("h2");
    //pElement.innerHTML = "<p>Your Score is: "+ lastScore + "</p>";
    pElement.textContent = "Your Score is: "+lastScore;
    console.log ("what to display "+pElement.textContent);
    cont3.appendChild(pElement);
    var inputBox = document.createElement("input");
    cont3.appendChild(inputBox);
    
}

sButton.addEventListener("click", function() {
    event.preventDefault();
    console.log("button clicked");
    startTimer();
    cont1.setAttribute("style", "display: none;");
    startQuestions();
});


function startQuestions() {
    console.log("In conatiner 2");
    cont2.setAttribute("style", "display: block;");
    populateQuestionForm();
};

function populateQuestionForm() {
    h2El.textContent = listOfQuestions[questionCount].question;
    console.log("question is: "+ h2El.textContent);
    for (var i=0; i<4; i++) {
        var lix = document.createElement("li");
        var cButtonInfo;
        lix.setAttribute("id", i);
        console.log("added id to li : " + lix.getAttribute("id"));
        cButtonInfo = listOfQuestions[questionCount].answers[i];
        console.log("From the list : " + listOfQuestions[questionCount].answers[i]);
        console.log("added to button : "+ cButtonInfo);
        lix.innerHTML= "<button>" + cButtonInfo + "</button>";
        console.log("lix : " + lix.innerHTML);
        questionList.appendChild(lix);
    };
    
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
        console.log("user answer :"+userAnswer);
        if (userAnswer === listOfQuestions[questionCount].correctAnswer) {
            console.log("Hurry!!!!! ");
            lastScore++;
        }
        else {
            console.log ("Next time!!!!");
        }
        questionCount++;
        //cont2.setAttribute("style", "display: none;");
        clearContainer();
        populateQuestionForm();
      }

});

init();