let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "blue", "yellow"];

let gameStarted = false;
let level = 0;

let h3 = document.querySelector("h3");
let hightestScore = localStorage.getItem("highestScore") || 0; // Retrieve highest score from localStorage

h3.innerText = ``;
let gameStartBtn = document.querySelector("#gameStart");

// Display the highest score
document.querySelector(
  "#hightestScore"
).innerText = `Highest Score: ${hightestScore}`;

// Start or stop the game
gameStartBtn.addEventListener("click", toggleGame);

function toggleGame() {
  if (!gameStarted) {
    startGame();
  } else {
    stopGame();
  }
}

// Start the game
function startGame() {
  gameStarted = true;
  levelUp();
  gameStartBtn.innerText = "Stop Game";
}

// Stop the game
function stopGame() {
  gameStarted = false;
  resetGame();
  h3.innerText = "";
}

// Function to handle level progression
function levelUp() {
  userSeq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  setTimeout(() => btnFlash(randBtn), 250); // Ensure the function is called properly
  gameSeq.push(randColor);
  console.log(`GAME ${gameSeq}`);
}

// Handle button click
let allBtns = document.querySelectorAll(".mybtn");

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// Flash red on wrong answer
let body = document.querySelector("body");
function wrongAns() {
  body.classList.add("wrongAns");
  setTimeout(function () {
    body.classList.remove("wrongAns");
  }, 350);
}

// Check user's answer
function checkAns(idx) {
  console.log("Current Level: ", level);

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      console.log("Same");
      setTimeout(levelUp, 200);
    }
  } else {
    wrongAns();
    h3.innerHTML = `Game Over! Your score was <b>${level}</b>`;
    // Update highest score if necessary
    if (level > hightestScore && level > 0) {
      hightestScore = level;
      localStorage.setItem("highestScore", hightestScore); // Save the new highest score in localStorage
      document.querySelector(
        "#hightestScore"
      ).innerText = `Highest Score: ${hightestScore}`; // Update the displayed highest score
    }

    setTimeout(resetGame, 300);
  }
}

// Reset the game state
function resetGame() {
  gameStarted = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  gameStartBtn.innerText = "Start Game";
}

// Handle button press
function btnPress() {
  if (gameStarted == true) {
    console.log("Btn Pressed");
    btnFlash(this);

    let userBtn = this.getAttribute("value");
    userSeq.push(userBtn);
    console.log(`USER ${userSeq}`);
    checkAns(userSeq.length - 1);
  }
}

// Add glow effect to button
function btnFlash(btn) {
  btn.classList.add("glow");
  btn.classList.add("borderWhite");
  setTimeout(function () {
    btn.classList.remove("glow");
    btn.classList.remove("borderWhite");
  }, 350);
}

// Add this within your existing JavaScript code
let howToPlayBtn = document.querySelector("#howToPlayBtn");
let popupContainer = document.querySelector("#popupContainer");

howToPlayBtn.addEventListener("click", openPopup);

function openPopup() {
  popupContainer.style.display = "block";
}

function closePopup() {
  popupContainer.style.display = "none";
}
