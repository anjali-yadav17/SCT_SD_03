let board = document.getElementById('sudoku-board');
let numberPad = document.getElementById('number-pad');
let mistakes = 0;
let selectedInput = null;
let timerInterval;
let seconds = 0;

const puzzle = [
  "", "3", "", "", "7", "", "", "", "2",
  "6", "", "", "1", "", "5", "", "", "8",
  "", "9", "8", "", "", "2", "", "6", "",
  "8", "", "", "7", "6", "", "", "", "3",
  "", "", "", "", "", "", "", "", "",
  "7", "", "", "", "2", "4", "", "", "6",
  "", "6", "", "5", "", "", "2", "8", "",
  "2", "", "", "4", "", "9", "", "", "5",
  "3", "", "", "", "8", "", "", "7", ""
];

function buildBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 81; i++) {
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("maxlength", 1);
    input.value = puzzle[i];
    if (puzzle[i] !== "") {
      input.setAttribute("readonly", true);
      input.style.backgroundColor = "#ddd";
    }
    input.addEventListener("focus", () => selectedInput = input);
    board.appendChild(input);
  }
}

function updateTimer() {
  seconds++;
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").textContent = `${min}:${sec}`;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerInterval = setInterval(updateTimer, 1000);
}

numberPad.addEventListener("click", (e) => {
  if (!selectedInput || !e.target.textContent.match(/[1-9]/)) return;
  if (selectedInput.hasAttribute("readonly")) return;
  selectedInput.value = e.target.textContent;
  if (Math.random() < 0.3) {
    selectedInput.classList.add("incorrect");
    mistakes++;
    document.getElementById("mistakes").textContent = mistakes;
    if (mistakes >= 3) {
      alert("Game Over: Too many mistakes!");
      playAgain();
    }
  } else {
    selectedInput.classList.remove("incorrect");
  }
});

function eraseCell() {
  if (selectedInput && !selectedInput.hasAttribute("readonly")) {
    selectedInput.value = "";
  }
}

function hint() {
  if (selectedInput && !selectedInput.hasAttribute("readonly")) {
    selectedInput.value = Math.floor(Math.random() * 9) + 1;
  }
}

function playAgain() {
  buildBoard();
  startTimer();
  document.getElementById("mistakes").textContent = "0";
  mistakes = 0;
}

window.onload = () => {
  buildBoard();
  startTimer();
};
