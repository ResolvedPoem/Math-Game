//defining essential functions

var questions = document.getElementById("output")

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

//defining essential variables


//program begins

function onStart() {
  var num1 = getRandomInt(1,10);
  var num2 = getRandomInt(1,10)
  questions.innerHTML = `${num1} + ${num2}`;
}


console.log("string")