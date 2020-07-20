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
        question: "In HTML, DOM stands for ",
        answers: ["1. Delivery On Monday", "2. Document Object Model", "3. Defined Object Memory", "4. None of the above"],
        correctAnswer: 2
    },
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
    },
    {
        question: "window.setInterval() can take how many parameters?",
        answers: ["1. One", "2. Two", "3. One or Two", "4. More than Two"],
        correctAnswer: 2
    },
    {
        question: "How to change the text color in CSS",
        answers: ["1. font-color", "2. color", "3. backgroud-color", "4. None of the above"],
        correctAnswer: 2
    },
    {
        question: "pop in Array is used to",
        answers: ["1. Removes from the beginning of an Array", "2. Removes from the End of an Array", "3. Removes from a specific Array index", "4. Allows you to programatically remove elements from an Array"],
        correctAnswer: 1
    },
    {
        question: "String in JavaScript is enclosed by",
        answers: ["1. Single quotes", "2. Paranthesis", "3. Double quotes", "4. Sqaure brackets"],
        correctAnswer: 3
    },
    {
        question: "Which of the below tags in HTML do not have end tag",
        answers: ["1. &ltbr&gt", "2. &ltimg&gt", "3. &ltinput&gt", "4. All of the above"],
        correctAnswer: 4
    },
]

var cont1 = conts[0];
var cont2 = conts[1];
var cont3 = conts[2];
var val = timerEl.textContent;
console.log(val);

var questionCount = 0;

var secondsLeft = 100;
var lastScore = 0;
var allDone = false;
var eachQuesTimeLeft = 10;
var timerVariable = setTimeout(function(){
}, 10000);

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

function startQuestions() {
    console.log("In conatiner 2");
    cont2.setAttribute("style", "display: block;");
    populateQuestion();
}
// ******  For each question, add a timer
function populateQuestion() {
    //setTimeout(function(){
        if (questionCount < listOfQuestions.length) {
            //h2El.textContent = listOfQuestions[questionCount].question;
            questionList.textContent = listOfQuestions[questionCount].question;

            console.log("question is: "+ questionList.textContent);
            for (var i=0; i<4; i++) {
                var lix = document.createElement("li");
                var cButtonInfo;
                lix.setAttribute("id", i);
                cButtonInfo = listOfQuestions[questionCount].answers[i];
                //console.log("From the list : " + listOfQuestions[questionCount].answers[i]);
                //console.log("added to button : "+ cButtonInfo);
                lix.innerHTML= "<button>" + cButtonInfo + "</button>";
                //console.log("lix : " + lix.innerHTML);
                questionList.appendChild(lix);
            };
        } else {
            console.log("All questions are over!");
            allDone = true;
        }
        timerVariable = setTimeout(function(){
            console.log ("10 sec over !!!");
            questionCount++;
            clearTimeout(timerVariable); // clear the Question timeout
            displayResult(0);
            populateQuestion();
        }, 10000);
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
        if (parseInt(userAnswer.charAt(0)) === listOfQuestions[questionCount].correctAnswer) {
            //console.log("Hurray!!!!!");
            lastScore++;
            displayResult(1);
        }
        else {
            displayResult(2);
            //console.log(secondsLeft);
            secondsLeft = secondsLeft-10;
            //console.log(secondsLeft);
            //console.log ("Next time!!!!");
        }
        questionCount++;
        clearTimeout(timerVariable);
        clearContainer();
        populateQuestion();
    };

});

function displayResult(num) {
    if (num === 1) {
        resDiv.innerHTML = "<hr/><p>Correct</p>";
    } else if (num === 2) {
        resDiv.innerHTML = "<hr><p>Wrong<p>";
    } else {
        resDiv.innerHTML = "<hr><p>Timed out<p>";
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
    newH1.textContent = "All Done!";
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

        if (validateInitials(highscoreObj.initial)) {
            var storedHighscore = JSON.parse(localStorage.getItem("highscoreArray"));
            if(storedHighscore !== null) {
                highscoreArray = storedHighscore;
                console.log(storedHighscore);
            } 
            highscoreArray.push(highscoreObj);
            localStorage.setItem("highscoreArray", JSON.stringify(highscoreArray));
            pageRedirect();
        }
        else {
            alert ("Initials should be letters with length less than 5 characters");
        }
    };
});

function validateInitials(initalValue) {
    var isValid = false;
    if (initalValue === "" || initalValue.length > 5) {
        return isValid;
    } else if(initalValue.length >= 1 ) {
        //var initialArray = initalValue.split('');
        for (var i=0; i<initalValue.length; i++) {
            if ( (initalValue.charCodeAt(i) > 64 && initalValue.charCodeAt(i) < 91) ||
            (initalValue.charCodeAt(i) > 96 && initalValue.charCodeAt(i) < 123)) {
                isValid = true;
            } else {
                isValid = false;
                i = initalValue.length;
            }
        }; 
    }
    
    return isValid;

};

highscoreDiv.addEventListener("click", function() {
    //event.preventDefault();
    pageRedirect();
});

function pageRedirect() {
    //window.location.replace("https://www.google.com/");
    window.location.href = "highscore.html";
};

init();

