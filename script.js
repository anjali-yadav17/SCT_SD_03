const board = document.getElementById('board');
let solutionBoard = [];
let timerInterval;
let seconds = 0;

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `⏱ ${min}:${sec}`;
  }, 1000);
}

function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.dataset.index = i;
    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^1-9]/g, '');
    });
    board.appendChild(input);
  }
}

function getBoardArray() {
  return Array.from(board.querySelectorAll('input')).map(cell => +cell.value || 0);
}

function setBoardArray(arr, lock = false) {
  board.querySelectorAll('input').forEach((cell, i) => {
    cell.classList.remove('invalid', 'valid', 'fixed');
    cell.value = arr[i] === 0 ? '' : arr[i];
    cell.readOnly = false;
    if (lock && arr[i] !== 0) {
      cell.readOnly = true;
      cell.classList.add('fixed');
    }
  });
}

function isValidMove(board, row, col, num, idx) {
  for (let i = 0; i < 9; i++) {
    if ((i !== col && board[row * 9 + i] === num) || 
        (i !== row && board[i * 9 + col] === num)) return false;
    const boxRow = Math.floor(row / 3) * 3 + Math.floor(i / 3);
    const boxCol = Math.floor(col / 3) * 3 + i % 3;
    const boxIdx = boxRow * 9 + boxCol;
    if (boxIdx !== idx && board[boxIdx] === num) return false;
  }
  return true;
}

function solve(board) {
  for (let i = 0; i < 81; i++) {
    if (board[i] === 0) {
      for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, Math.floor(i / 9), i % 9, num, i)) {
          board[i] = num;
          if (solve(board)) return true;
          board[i] = 0;
        }
      }
      return false;
    }
  }
  return true;
}

function solveSudoku() {
  const boardArr = getBoardArray();
  const solved = [...boardArr];
  if (solve(solved)) {
    setBoardArray(solved);
    alert("✅ Sudoku Solved!");
  } else {
    alert("❌ No solution exists.");
  }
}

function resetBoard() {
  board.querySelectorAll('input').forEach(cell => {
    cell.value = '';
    cell.classList.remove('invalid', 'valid', 'fixed');
    cell.readOnly = false;
  });
}

function generateSudoku() {
  resetBoard();
  startTimer();
  const difficulty = document.getElementById('difficulty').value;
  const filled = difficulty === 'easy' ? 40 : difficulty === 'medium' ? 30 : 22;
  const full = Array(81).fill(0);
  solve(full);
  solutionBoard = [...full];
  const puzzle = [...solutionBoard];
  let removed = 0;
  while (removed < 81 - filled) {
    let idx = Math.floor(Math.random() * 81);
    if (puzzle[idx] !== 0) {
      puzzle[idx] = 0;
      removed++;
    }
  }
  setBoardArray(puzzle, true);
}

function checkBoard() {
  const arr = getBoardArray();
  const cells = board.querySelectorAll('input');
  let correct = 0, filled = 0;
  cells.forEach((cell, i) => {
    const val = +cell.value;
    if (val) {
      filled++;
      if (val === solutionBoard[i]) {
        cell.classList.remove('invalid');
        cell.classList.add('valid');
        correct++;
      } else {
        cell.classList.remove('valid');
        cell.classList.add('invalid');
      }
    } else {
      cell.classList.remove('invalid', 'valid');
    }
  });
  if (filled === 0) alert("📝 Please enter some numbers!");
  else if (correct === filled) alert("✅ All inputs are correct!");
  else alert(`❌ ${filled - correct} mistake(s) found.`);
}

createBoard();
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.dataset.index = i;

    const row = Math.floor(i / 9);
    const col = i % 9;

    // 🔲 Apply border classes for 3x3 distribution
    if (row % 3 === 0) input.classList.add('top-border');
    if (col % 3 === 0) input.classList.add('left-border');
    if (col === 8) input.classList.add('right-border');
    if (row === 8) input.classList.add('bottom-border');

    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^1-9]/g, '');
    });

    board.appendChild(input);
  }
}
function createBoard() {
  board.innerHTML = '';
  for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    input.dataset.index = i;

    const row = Math.floor(i / 9);
    const col = i % 9;

    // Bold black borders every 3 blocks
    if (row % 3 === 0) input.classList.add('top-border');
    if (col % 3 === 0) input.classList.add('left-border');
    if (col === 8) input.classList.add('right-border');
    if (row === 8) input.classList.add('bottom-border');

    input.addEventListener('input', () => {
      input.value = input.value.replace(/[^1-9]/g, '');
    });

    board.appendChild(input);
  }
}
