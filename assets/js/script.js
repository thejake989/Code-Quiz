// Quiz questions
const questions = [
  {
    question: "1. Inside which HTML element do we put the JavaScript?",
    choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
    answer: "d. <script>",
  },
  {
    question:
      "2. String values must be enclosed within _____ when being assigned to variables.",
    choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
    answer: "c. quotes",
  },
  {
    question: "3. Arrays in JavaScript can be used to store _____.",
    choices: [
      "a. numbers and strings",
      "b. other arrays",
      "c. booleans",
      "d. all of the above",
    ],
    answer: "b. other arrays",
  },
  {
    question: "4. Commonly used data types DO NOT include:",
    choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
    answer: "c. alerts",
  },
  {
    question: "5. How do you create a function in JavaScript",
    choices: [
      "a. function = myFunction()",
      "b. function myFunction()",
      "c. function:myFunction()",
      "d. createMyFunction()",
    ],
    answer: "b. function myFunction()",
  },
  {
    question: "6. How do you call a function named myFunction?",
    choices: [
      "a. call myFunction()",
      "b. call function myFunction()",
      "c. myFunction()",
      "d. call myFunction",
    ],
    answer: "c. myFunctions()",
  },
  {
    question:
      "7. To see if two variables are equal in an if / else statement you would use ____.",
    choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
    answer: "b. ==",
  },
  {
    question: "8. The first index of an array is ____.",
    choices: ["a. 0", "b. 1", "c. 8", "d. any"],
    answer: "a. 0",
  },
  {
    question: "9. Who invented JavaScript?",
    choices: [
      "a. Douglas Crockford",
      "b. Sheryl Sandberg",
      "c. Brendan Eich",
      "d. Ben Javascript",
    ],
    answer: "c. Brendan Eich",
  },
  {
    question: "10. How to write an IF statement in JavaScript?",
    choices: [
      "a. if i == 5 then",
      "b. if i = 5 then",
      "c. if(i == 5)",
      "d. if i = 5",
    ],
    answer: "c. if(i == 5)",
  },
  {
    question: "11. How do you add a comment in a JavaScript?",
    choices: [
      "a. //This is a comment",
      "b. <!--This is a comment-->",
      "c. 'This is a comment",
      "d. * This is a comment *",
    ],
    answer: "a. //This is a comment",
  },
  {
    question: "12. Which event occurs when the user clicks on an HTML element?",
    choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
    answer: "a. onclick",
  },
];

// Timer
var timer = document.getElementById("timer");
var timeLeft = document.getElementById("timeLeft");
var timesUp = document.getElementById("timesUp");

// Quiz Button
var startDiv = document.getElementById("start");
var startQuizBtn = document.getElementById("start-quiz-button");

var questionDiv = document.getElementById("questionDiv");
var questionTitle = document.getElementById("questionTitle");
var choiceA = document.getElementById("btn0");
var choiceB = document.getElementById("btn1");
var choiceC = document.getElementById("btn2");
var choiceD = document.getElementById("btn3");
var answerCheck = document.getElementById("answerCheck");

var summary = document.getElementById("summary");
var submitInitialBtn = document.getElementById("submitInitialBtn");
var initialInput = document.getElementById("initialInput");
var everything = document.getElementById("everything");

// High Score
var highScoreSection = document.getElementById("highScoreSection");
var finalScore = document.getElementById("finalScore");

var goBackBtn = document.getElementById("goBackBtn");
var clearHighScoreBtn = document.getElementById("clearHighScoreBtn");
var viewHighScore = document.getElementById("viewHighScore");
var listOfHighScores = document.getElementById("listOfHighScores");

// Other variables
var correctAns = 0;
var questionNum = 0;
var scoreResult;
var questionIndex = 0;

// Timer attributes
var totalTime = 151;
function newQuiz() {
  questionIndex = 0;
  totalTime = 150;
  timeLeft.textContent = totalTime;
  initialInput.textContent = "";

  startDiv.style.display = "none";
  questionDiv.style.display = "block";
  timer.style.display = "block";
  timesUp.style.display = "none";

  var startTimer = setInterval(function () {
    totalTime--;
    timeLeft.textContent = totalTime;
    if (totalTime <= 0) {
      clearInterval(startTimer);
      if (questionIndex < questions.length - 1) {
        gameOver();
      }
    }
  }, 1000);

  showQuiz();
}

function showQuiz() {
  nextQuestion();
}

function nextQuestion() {
  questionTitle.textContent = questions[questionIndex].question;
  choiceA.textContent = questions[questionIndex].choices[0];
  choiceB.textContent = questions[questionIndex].choices[1];
  choiceC.textContent = questions[questionIndex].choices[2];
  choiceD.textContent = questions[questionIndex].choices[3];
}

// Answer check
function checkAnswer(answer) {
  var lineBreak = document.getElementById("lineBreak");
  lineBreak.style.display = "block";
  answerCheck.style.display = "block";

  if (
    questions[questionIndex].answer === questions[questionIndex].choices[answer]
  ) {
    // 1 point per correct answer
    correctAns++;
    // console.log(correctAns);
    answerCheck.textContent = "Correct!";
  } else {
    // 10 second time penalty for wrong answers
    totalTime -= 10;
    timeLeft.textContent = totalTime;
    answerCheck.textContent =
      "Wrong! The correct answer is: " + questions[questionIndex].answer;
  }

  questionIndex++;
  // Repeat with the rest of questions
  if (questionIndex < questions.length) {
    nextQuestion();
  } else {
    // If no more questions, run the game over function
    gameOver();
  }
}

function chooseA() {
  checkAnswer(0);
}

function chooseB() {
  checkAnswer(1);
}

function chooseC() {
  checkAnswer(2);
}

function chooseD() {
  checkAnswer(3);
}

// When all questions are answered or timer reaches 0, game over
function gameOver() {
  summary.style.display = "block";
  questionDiv.style.display = "none";
  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "block";

  // Show final score
  finalScore.textContent = correctAns;
}

// Enter initial and store highscore in local storage
function storeHighScores(event) {
  event.preventDefault();

  // Stop function if initials are blank
  if (initialInput.value === "") {
    alert("Please enter your initials!");
    return;
  }

  startDiv.style.display = "none";
  timer.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";

  // High score local storage
  var savedHighScores = localStorage.getItem("high scores");
  var scoresArray;

  if (savedHighScores === null) {
    scoresArray = [];
  } else {
    scoresArray = JSON.parse(savedHighScores);
  }

  var userScore = {
    initials: initialInput.value,
    score: finalScore.textContent,
  };

  console.log(userScore);
  scoresArray.push(userScore);

  // Array to store in local
  var scoresArrayString = JSON.stringify(scoresArray);
  window.localStorage.setItem("high scores", scoresArrayString);

  // Shows high scores
  showHighScores();
}

// High score function
var i = 0;
function showHighScores() {
  startDiv.style.display = "none";
  timer.style.display = "none";
  questionDiv.style.display = "none";
  timesUp.style.display = "none";
  summary.style.display = "none";
  highScoreSection.style.display = "block";
  var savedHighScores = localStorage.getItem("high scores");

  //Local storage
  if (savedHighScores === null) {
    return;
  }
  console.log(savedHighScores);

  var storedHighScores = JSON.parse(savedHighScores);

  for (; i < storedHighScores.length; i++) {
    var eachNewHighScore = document.createElement("p");
    eachNewHighScore.innerHTML =
      storedHighScores[i].initials + ": " + storedHighScores[i].score;
    listOfHighScores.appendChild(eachNewHighScore);
  }
}

// Event listeners
startQuizBtn.addEventListener("click", newQuiz);
choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

submitInitialBtn.addEventListener("click", function (event) {
  storeHighScores(event);
});

viewHighScore.addEventListener("click", function (event) {
  showHighScores(event);
});

goBackBtn.addEventListener("click", function () {
  startDiv.style.display = "block";
  highScoreSection.style.display = "none";
});

clearHighScoreBtn.addEventListener("click", function () {
  window.localStorage.removeItem("high scores");
  listOfHighScores.innerHTML = "High Scores Cleared!";
  listOfHighScores.setAttribute(
    "style",
    "font-family: 'Archivo', sans-serif; font-style: italic;"
  );
});
