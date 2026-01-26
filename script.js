let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

const cells = document.querySelectorAll(".cell");
const resultsDiv = document.getElementById("results");
const turnIndicator = document.getElementById("turnIndicator");
const scoreXDiv = document.getElementById("scoreX");
const scoreODiv = document.getElementById("scoreO");
const xWinsSpan = document.getElementById("xWins");
const oWinsSpan = document.getElementById("oWins");
const resetBtn = document.getElementById("resetBtn");
const clearScoreBtn = document.getElementById("clearScoreBtn");

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            cell.setAttribute('data-symbol', currentPlayer);
            cell.classList.add('taken');

            const ganador = revisarGanador();
            if (ganador) {
                gameActive = false;
                resultsDiv.innerHTML = `<span class="material-symbols-outlined winner-icon">person_celebrate</span> Jugador ${currentPlayer} ha ganado`;
                resultsDiv.classList.add('winner-animation');
                scores[currentPlayer]++;
                updateScores();
                dibujarLinea(ganador);
                return;
            }

            if (!board.includes('')) {
                gameActive = false;
                resultsDiv.textContent = "Empate";
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateTurnIndicator();
        }
    });
});

const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function revisarGanador() {
    for (let combo of combinacionesGanadoras) {
        const [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return combo;
        }
    }
    return null;
}

function dibujarLinea(combo) {
    const linea = document.getElementById("linea");
    if (!linea) {
        console.error("Elemento 'linea' no encontrado en el DOM");
        return;
    }

    const gameBoard = document.getElementById("game");
    linea.style.display = "block";

    const cellSize = 140; // Tamaño de celda
    const gap = 6; // Espacio entre celdas
    const [a, b, c] = combo;

    const rowA = Math.floor(a / 3);
    const colA = a % 3;
    const rowC = Math.floor(c / 3);
    const colC = c % 3;

    // Calcular posición considerando el tamaño de celda y el gap
    const centerX_A = colA * (cellSize + gap) + cellSize / 2;
    const centerY_A = rowA * (cellSize + gap) + cellSize / 2;
    const centerX_C = colC * (cellSize + gap) + cellSize / 2;
    const centerY_C = rowC * (cellSize + gap) + cellSize / 2;

    const midX = (centerX_A + centerX_C) / 2;
    const midY = (centerY_A + centerY_C) / 2;

    if (rowA === rowC) {
        // Línea horizontal
        linea.style.width = `${cellSize * 3 + gap * 2}px`; // Ancho de 3 celdas + 2 gaps
        linea.style.height = "8px";
        linea.style.top = `${midY}px`;
        linea.style.left = `${midX}px`;
        linea.style.transform = "translate(-50%, -50%)";
    } else if (colA === colC) {
        // Línea vertical
        linea.style.width = "8px";
        linea.style.height = `${cellSize * 3 + gap * 2}px`; // Alto de 3 celdas + 2 gaps
        linea.style.top = `${midY}px`;
        linea.style.left = `${midX}px`;
        linea.style.transform = "translate(-50%, -50%)";
    } else {
        // Línea diagonal
        const distance = Math.sqrt(Math.pow(centerX_C - centerX_A, 2) + Math.pow(centerY_C - centerY_A, 2));
        const angle = Math.atan2(centerY_C - centerY_A, centerX_C - centerX_A) * 180 / Math.PI;
        linea.style.width = `${distance}px`;
        linea.style.height = "8px";
        linea.style.top = `${midY}px`;
        linea.style.left = `${midX}px`;
        linea.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    }
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Turno del Jugador ${currentPlayer}`;
    scoreXDiv.classList.toggle('active', currentPlayer === 'X');
    scoreODiv.classList.toggle('active', currentPlayer === 'O');
}

function updateScores() {
    xWinsSpan.textContent = scores.X;
    oWinsSpan.textContent = scores.O;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.removeAttribute('data-symbol');
        cell.classList.remove('taken');
    });
    resultsDiv.textContent = '';
    resultsDiv.classList.remove('winner-animation');
    const linea = document.getElementById("linea");
    if (linea) {
        linea.style.display = "none";
    }
    updateTurnIndicator();
}

function clearScores() {
    scores = { X: 0, O: 0 };
    updateScores();
    resetGame();
}

resetBtn.addEventListener('click', resetGame);
clearScoreBtn.addEventListener('click', clearScores);

updateTurnIndicator();