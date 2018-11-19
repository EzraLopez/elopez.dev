// Esdras Lopez
var simonMoves = [];
var userMoves = [];
var count = 0;

var playerMove = true;
var endGame = false;
var runningGame = false;

var canvas;
var context;

var userScores = [];
var userNames = [];

addEventListener("load", start, false);

function start() {
  canvas = document.getElementById("myCanvas");
  canvas.addEventListener("mousedown", makeMove, false);
  canvas.addEventListener("mouseup", drawBoard, false);
  context = canvas.getContext("2d");
  loadHighScores();
  drawBoard();

  var newGameBotton = document.getElementById("newgamebutton");
  newGameBotton.addEventListener("click", newGame, false);
  newGameBotton.addEventListener("mousedown", endGame, false);

  document.getElementById("highscoresbutton").addEventListener("click", displayHighScores, false);
  document.getElementById("aboutbutton").addEventListener("click", about, false);
}

function about() {
  document.getElementById("about").style.display = "inline";
  document.getElementById("close").style.display = "inline";
  document.getElementById("logo").style.display = "inline";
  document.getElementById("close").addEventListener("click", closeAbout, false);
}

function closeAbout() {
  document.getElementById("about").style.display = "none";
  document.getElementById("close").style.display = "none";
  document.getElementById("logo").style.display = "none";
}

function loadHighScores() {
  var score = localStorage.getItem("score1");
  var name = localStorage.getItem("name1");
  if (score == null || name == null) {
    for (var i = 0; i <= 4; i++) {
      userScores[i] = 0;
      userNames[i] = "Player " + (i + 1)
    }
    console.log("No Local High Scores Table found!");
    updateLocalHighScores();
    return false;
  } else {
    for (var i = 0; i < 5; i++) {
      var nameid = "name" + (i + 1);
      var scoreid = "score" + (i + 1);

      userNames[i] = localStorage.getItem(nameid);
      userScores[i] = localStorage.getItem(scoreid);
    }
  }
}

function updateLocalHighScores() {
  for (var i = 0; i < 5; i++) {
    var nameid = "name" + (i + 1);
    var scoreid = "score" + (i + 1);

    localStorage.setItem(nameid, userNames[i]);
    localStorage.setItem(scoreid, userScores[i]);
  }
}

function clearHighScores() {
  var x = confirm("Are you sure you want to clear all the High Scores?")
  if (x == true) {
    for (var i = 0; i <= 4; i++) {
      userScores[i] = 0;
      userNames[i] = "Player " + (i + 1)
    }
    updateLocalHighScores();
    displayHighScores()
  }
}

function displayHighScores() {
  document.getElementById("highscorestable").style.display = "table";
  for (var i = 0; i < 5; i++) {
    var nameid = "name" + (i + 1);
    var scoreid = "score" + (i + 1);

    document.getElementById(nameid).innerHTML = userNames[i];
    document.getElementById(scoreid).innerHTML = userScores[i];
  }

  document.getElementById("closehighscores").addEventListener("click", closeHighScores, false);
  document.getElementById("resethighscoresbutton").addEventListener("click", clearHighScores, false);
}

function closeHighScores() {
  document.getElementById("highscorestable").style.display = "none";
}

function drawBoard() {
  // Draw filled blue rectangle
  context.fillStyle = "darkblue";
  context.fillRect(170, 200, 150, 150);

  // Draw filled red rectangle
  context.fillStyle = "darkred";
  context.fillRect(170, 50, 150, 150);

  // Draw filled green rectangle
  context.fillStyle = "darkgreen";
  context.fillRect(20, 50, 150, 150);

  // Draw filled yellow rectangle
  context.fillStyle = "orange";
  context.fillRect(20, 200, 150, 150);
}

function newGame() {
  changeButton()
  simonMoves.length = 0;
  userMoves.length = 0;
  runningGame = true;

  if (endGame == false) {
    // document.getElementById('turnInfo').innerHTML = "Computer's turn.";
    setTimeout(simonMove, 1000);
  } else {
    drawBoard();
    document.getElementById('turnInfo').style.visibility = "hidden";
    endGame = false;
    setTimeout(simonMove, 1000);
  }
}

function changeButton() {
  document.getElementById("newgamebutton").style.display = "none";
  document.getElementById("endgamebutton").style.display = "inline-block";
  document.getElementById("endgamebutton").addEventListener("click", reset, false);
}

function reset() {
  var score;
  alert("Game Over!");
  if (simonMoves.length == 1 && userMoves.length == 1)
    score = 0;
  else
    score = (simonMoves.length - 1);
  alert("You got " + score + " moves correct!");
  highScores(score);
  clearBoard();
}

function clearBoard() {
  document.getElementById('turnInfo').style.visibility = "hidden";
  document.getElementById('movesInfo').style.visibility = "hidden";
  document.getElementById("endgamebutton").style.display = "none";
  document.getElementById("newgamebutton").style.display = "inline-block";
  simonMoves.length = 0;
  userMoves.length = 0;
  count = 0;
  drawBoard();
  playerMove = true;
  runningGame = false;
  endGame = true;
}

function simonMove() {
  if (runningGame == true) {
    playerMove = false;
    document.getElementById('movesInfo').style.visibility = "hidden";
    document.getElementById('turnInfo').innerHTML = "Computer's turn.";
    if (count == 0)
      document.getElementById('turnInfo').style.visibility = "visible";

    simonMoves[count] = Math.floor((Math.random() * 11) + 1);
    count = 0;
    setTimeout(pushSquare(), 1000);
  }
}

function pushSquare() {
  switch (simonMoves[count]) {
    case 1:
    case 5:
    case 9:
      context.fillStyle = "DeepSkyBlue";
      context.fillRect(170, 200, 150, 150);
      break;
    case 2:
    case 6:
    case 10:
      context.fillStyle = "Crimson";
      context.fillRect(170, 50, 150, 150);
      break;
    case 3:
    case 7:
    case 11:
      context.fillStyle = "Chartreuse";
      context.fillRect(20, 50, 150, 150);
      break;
    default:
      context.fillStyle = "Gold";
      context.fillRect(20, 200, 150, 150);
  }
  setTimeout(releaseSquare, 500);
}

function releaseSquare(square) {
  drawBoard();
  count++;

  if (count < simonMoves.length)
    setTimeout(pushSquare, 1000);
  else
    userTurn();
}

function userTurn() {
  // If the game is not over then it's the users' count
  document.getElementById('turnInfo').innerHTML = 'Your turn.';
  count = 0;
  playerMove = true;
}

function makeMove(e) {
  if (playerMove == true) {
    x = e.pageX - canvas.offsetLeft;
    y = e.pageY - canvas.offsetTop;

    if (x >= 170 && x <= 320 && y >= 200 && y <= 350) {
      //alert("Blue");
      userMoves[count] = 1;
      context.fillStyle = "DeepSkyBlue";
      context.fillRect(170, 200, 150, 150);
    } else if (x >= 170 && x <= 320 && y >= 50 && y <= 200) {
      //alert("Red");
      userMoves[count] = 2;
      context.fillStyle = "Crimson";
      context.fillRect(170, 50, 150, 150);
    } else if (x >= 20 && x <= 170 && y >= 50 && y <= 200) {
      //alert("Green");
      userMoves[count] = 3;
      context.fillStyle = "Chartreuse";
      context.fillRect(20, 50, 150, 150);
    } else if (x >= 20 && x <= 170 && y >= 200 && y <= 350) {
      //alert("Yellow");
      userMoves[count] = 4;
      context.fillStyle = "Gold";
      context.fillRect(20, 200, 150, 150);
    }

    if (runningGame == true) {
      gameOver();
      if (userMoves.length == simonMoves.length) {
        playerMove = false;
        for (var i = 0; i <= count - 1; i++) {
          console.log("Simon Move " + (i + 1) + ": " + simonMoves[i]);
          console.log("User Move " + (i + 1) + ": " + userMoves[i]);
        }
        if (endGame == false && runningGame == true) {
          var moves = userMoves.length;
          if (moves > 1)
            moves += " moves correct!";
          else
            moves += " move correct!";

          document.getElementById('movesInfo').style.visibility = "visible";
          document.getElementById('movesInfo').innerHTML = moves;
          setTimeout(simonMove, 2000);
        }
      }
    } else
      playSounds();
  }
}

function playSounds() {
  var square = userMoves[count];
  if (square == 1)
    document.getElementById('audio1').play();
  else if (square == 2)
    document.getElementById('audio2').play();
  else if (square == 3)
    document.getElementById('audio3').play();
  else if (square == 4)
    document.getElementById('audio4').play();
}

function gameOver() {
  var test = simonMoves[count] - userMoves[count];
  switch (test) {
    case 0:
    case 4:
    case 8:
      playSounds();
      count++;
      break;

    default:
      document.getElementById('buzzer').play();
      alert("Game over!");
      document.getElementById('lose').play();
      if (simonMoves.length == 1 && userMoves.length == 1)
        score = 0;
      else
        score = (simonMoves.length - 1);
      alert("Your score was:\n" + score);
      highScores(score);
      clearBoard();
  }
}

function highScores(score) {
  var tempS = [];
  var tempN = [];
  var name;
  for (var i = 0; i <= 4; i++) {
    if (score > userScores[i]) {
      console.log("Before:\n");
      for (var z = 0; z <= 4; z++) {
        var output = userNames[z] + ": " + userScores[z] + "\n";
        console.log(output);
      }

      name = prompt("What is your name? ");
      if (name == null || name == "null" || name == '') {
        name = prompt("Please enter your name: ");
        if (name == null || name == "null" || name == '') {
          var t = confirm("You didn't enter any name, you will appear as " +
            "anonymous in the High Scores Table.\n\n" +
            "Press \"OK\" to continue or \"Cancel\" to enter your name.");
          if (t == true)
            name = "No name";
          else {
            name = prompt("Name: ", "");
            if (name == null || name == "null" || name == '');
            name = "No name";
          }
        }
      }
      for (var j = 0; j <= 4; j++) {
        tempS[j] = userScores[j];
        tempN[j] = userNames[j];
      }
      userScores[i] = score;
      userNames[i] = name;
      for (var j = i; j <= 4; j++) {
        userScores[j + 1] = tempS[j];
        userNames[j + 1] = tempN[j];
      }
      console.log("After:\n");
      for (var z = 0; z <= 4; z++) {
        var output = userNames[z] + ": " + userScores[z] + "\n";
        console.log(output);
      }
      updateLocalHighScores();
      return;
    }
  }
}
