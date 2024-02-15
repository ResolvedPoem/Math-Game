//defining essential functions

var questions, streakCounter, highScore, highScoreDiv, streak, longStreak;


window.onload = function(){
  document.addEventListener("keypress", waitForStart);
  questions = document.getElementById("output");
  streakCounter = document.getElementById("streakCounter");
  highScoreDiv = document.getElementById("highScore");
  streak = 0;
  longStreak = 0;
  if (document.cookie) {
    if (document.cookie.includes(";")) {
      highScoreReader = document.cookie.split(";");
    }
    else {
      highScoreReader = [document.cookie];
    }
    highScoreDiv.lastChild.data = highScoreReader[0].split("=")[1];
  }
}

function waitForStart(event) {
  if (event.keyCode == 13) {
    if (document.getElementById("playerAnswer").value.toLowerCase() == "start") {
      onStart();
    }
    else {
      document.getElementById("playerAnswer").value = "";
    }
  }
} 

function onStart() {

  document.getElementById("playerAnswer").focus();
  [problem, correct] = generateProblem();
  questions.innerText = `What is: ${problem}`;
  document.removeEventListener("keypress", waitForStart);
  document.addEventListener("keypress", pressEnter);
  document.getElementById("playerAnswer").value = "";
  setTimeout(quitGame, 60000);
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function chooseOp() {
  let operator = ["+", "-", "*", "/"];
  let rand = operator[Math.floor(Math.random()*operator.length)];
  return rand;
}

function generateProblem() {

  let minNum = 1;
  let maxNum = 12;
  let num1 = getRandomInt(minNum,maxNum);
  let num2 = getRandomInt(minNum,maxNum);
  let operator = chooseOp();
  let correct;
    if (operator == "+"){
      correct = num1 + num2;
    }

    else if (operator == "-"){
      correct = num1 - num2;
    }

    else if (operator == "*"){
      correct = num1 * num2;
    }

    else if (operator == "/"){
      correct = num1;
      num1 *= num2;     
    
    }
  return [`${num1} ${operator} ${num2}`, correct];
}

function increaseStreak() {
  streak++;
  streakCounter.lastChild.data = streak;
}

//defining essential variables, arrays, and objects

var initTime = Date.now();
var timePassed = Date.now();
var newQuestion = true;
var answer, correct, problem;

//program begins

function quitGame() {
  streak = -1;
  increaseStreak();
  questions.innerText = `Thanks for Playing! Your Longest Streak was: ${longStreak}.`
  document.removeEventListener("keypress", pressEnter);
  document.addEventListener("keypress", waitForStart);
  if (longStreak > highScoreDiv.lastChild.data) {
    highScoreDiv.lastChild.data = longStreak;
  }
  document.cookie = `highScoreDiv=${highScoreDiv.lastChild.data}`;
}


function pressEnter(event) {
  event = event || window.event;
  if (event.keyCode == 13) {
    answer = document.getElementById("playerAnswer").value.toLowerCase();
    document.getElementById("playerAnswer").value = "";

    if (answer == correct) {
      newQuestion = true;
      increaseStreak();
        if (streak > longStreak) {
          longStreak = streak;
        }
      [problem, correct] = generateProblem();
      questions.innerText = `Correct!\nWhat is: ${problem}`;
    }

    else if (answer == "quit") {
      quitGame()
    }

    else {
      newQuestion = false;
      streak = -1;
      increaseStreak();
      questions.innerText = `Incorrect!\nWhat is: ${problem}`;
    }
  }
}
