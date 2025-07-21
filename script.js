
let currentGrid = [];
let startTime;
let timerInterval;

function generatePuzzle() {
  const difficulty = document.getElementById("difficulty").value;
  currentGrid = createPuzzle(difficulty);
  renderGrid(currentGrid);
  document.getElementById("message").innerText = "";
  resetTimer();
  startTimer();
}

function renderGrid(grid) {
  const gridDiv = document.getElementById("sudoku-grid");
  gridDiv.innerHTML = "";
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.setAttribute("maxlength", 1);
      input.dataset.row = row;
      input.dataset.col = col;
      if (grid[row][col] !== 0) {
        input.value = grid[row][col];
        input.disabled = true;
      }
      input.addEventListener("keydown", handleKeyDown);
      gridDiv.appendChild(input);
    }
  }
}

function handleKeyDown(e) {
  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);
  const index = row * 9 + col;
  const gridInputs = document.querySelectorAll("#sudoku-grid input");

  if (e.key === "ArrowRight" && col < 8) gridInputs[index + 1].focus();
  else if (e.key === "ArrowLeft" && col > 0) gridInputs[index - 1].focus();
  else if (e.key === "ArrowDown" && row < 8) gridInputs[index + 9].focus();
  else if (e.key === "ArrowUp" && row > 0) gridInputs[index - 9].focus();
  else if (e.key === "Enter") checkSolution();
}

function createPuzzle(difficulty) {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  // Dummy data for demo (can replace with algorithm or API)
  if (difficulty === "easy") grid[0][0] = 5;
  else if (difficulty === "medium") grid[0][0] = 3;
  else if (difficulty === "hard") grid[0][0] = 1;
  return grid;
}

function checkSolution() {
  const gridInputs = document.querySelectorAll("#sudoku-grid input");
  let correct = true;
  for (let input of gridInputs) {
    if (!input.disabled && input.value === "") correct = false;
  }
  document.getElementById("message").innerText = correct ? "✅ Correct!" : "❌ Incorrect, keep trying.";
}

function getHint() {
  const empty = Array.from(document.querySelectorAll("#sudoku-grid input")).find(i => i.value === "" && !i.disabled);
  if (empty) empty.value = Math.ceil(Math.random() * 9);
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const seconds = String(elapsed % 60).padStart(2, '0');
  document.getElementById("timer").innerText = `Time: ${minutes}:${seconds}`;
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").innerText = "Time: 00:00";
}
