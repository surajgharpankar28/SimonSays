let gameSeq = [];
let userSeq = [];

let gameStarted = false;
let level = 0;

document.addEventListener("keypress", function () {
  if (gameStarted == false) {
    console.log("Game Started");
    gameStarted = true;
  }
});
