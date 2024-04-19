let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "blue", "yellow"];

let gameStarted = false;
let level = 0;

let h3 = document.querySelector("h3");

h3.innerText = `Press any Key to start`;
let hightestScore = 0;

document.addEventListener("keypress", function () {
  if (gameStarted == false) {
    console.log("Game Started");
    gameStarted = true;
    levelUp();
  }
});

function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  btnFlash(randBtn);
  gameSeq.push(randColor);
  console.log(`GAME ${gameSeq}`);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function checkAns(idx) {
  console.log("Current Level : ", level);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      console.log("Same");
      setTimeout(levelUp, 1000);
    }
  } else {
    h3.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to Start`;
    if (level > hightestScore && level > 0) {
      hightestScore = level;
      document.querySelector(
        "#hightestScore"
      ).innerText = `Hightest Score is : ${hightestScore}`;
    }

    setTimeout(resetGame, 1000);
  }
}
function resetGame() {
  gameStarted = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
function btnPress() {
  if (gameStarted == true) {
    console.log("Btn Pressed");
    btnFlash(this);

    userBtn = this.getAttribute("value");
    userSeq.push(userBtn);
    console.log(`USER ${userSeq}`);
    checkAns(userSeq.length - 1);
  }
}

function btnFlash(btn) {
  //   var btn = this;
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 350); // Adjust the time as needed
}
