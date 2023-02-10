// Init game, sync with HTML
let gameActive = true;

let currentMove = 0;
let currentPlayer = "X";
let currentSquares = new Array(9).fill(null);
const history = [[...currentSquares]];

function handlePlay() {
  history.push([...currentSquares]);
  currentMove++;
  currentPlayer = currentMove % 2 ? "O" : "X";
  if (calculateWinner() || !notDraw()) gameActive = false;
}

function handleJump() {
  currentPlayer = currentMove % 2 ? "O" : "X";
  currentSquares = [...history[currentMove]];
  history.length = currentMove + 1;
  gameActive = true;
}

// child component: chess board
const chessBoard = document.querySelector(".board");
chessBoard.addEventListener("click", (e) => {
  const clickedSquare = e.target;
  const clickedSquareIndex = clickedSquare.dataset.index;

  if (!gameActive || currentSquares[clickedSquareIndex]) return;

  // data change
  currentSquares[clickedSquareIndex] = currentPlayer;
  handlePlay();

  // tigger rendering
  addPiece(clickedSquare, clickedSquareIndex);
  addButton();
  updateStatus();
});

// child component: time machine
const timeMachine = document.querySelector(".time-machine");
timeMachine.addEventListener("click", (e) => {
  const clickedNode = Number(e.target.dataset.node);

  if (clickedNode === currentMove) return;

  // data change
  currentMove = clickedNode;
  handleJump();

  // tigger rendering
  removeButton(currentMove);
  removePiece();
  updateStatus();
});

// UI change
function addPiece(target, index) {
  target.textContent = currentSquares[index];
}

function addButton() {
  const newItem = document.createElement("li");
  newItem.innerHTML = `<button type="button" data-node="${currentMove}">Go to move #${currentMove}</button>`;
  timeMachine.append(newItem);
}

function removeButton(currNode) {
  const items = timeMachine.querySelectorAll("li");
  for (let i = items.length - 1; i > currNode; i--) {
    items[i].remove();
  }
}

function removePiece() {
  const squares = chessBoard.querySelectorAll(".square");
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = currentSquares[i];
  }
}

const statusBar = document.querySelector(".status");
function updateStatus() {
  const Winner = calculateWinner();

  if (gameActive) {
    statusBar.textContent = `Next player: ${currentPlayer}`;
  } else if (Winner) {
    statusBar.textContent = `Winner: ${Winner}`;
  } else {
    statusBar.textContent = "five even";
  }
}

// game rules
const winnerLine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function calculateWinner() {
  for (const [a, b, c] of winnerLine) {
    if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
      return currentSquares[a];
    }
  }
  return null;
}

function notDraw() {
  return currentSquares.includes(null);
}
