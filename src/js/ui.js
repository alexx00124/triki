/**
 * Actualiza el indicador de turno
 */
function updateTurnIndicator(currentPlayer) {
    const turnIndicator = document.getElementById("turnIndicator");
    const scoreXDiv = document.getElementById("scoreX");
    const scoreODiv = document.getElementById("scoreO");
    
    if (turnIndicator) {
        turnIndicator.textContent = `Turno del Jugador ${currentPlayer}`;
    }
    if (scoreXDiv) {
        scoreXDiv.classList.toggle('active', currentPlayer === 'X');
    }
    if (scoreODiv) {
        scoreODiv.classList.toggle('active', currentPlayer === 'O');
    }
}

/**
 * Actualiza los puntajes en pantalla
 */
function updateScores(scores) {
    const xWinsSpan = document.getElementById("xWins");
    const oWinsSpan = document.getElementById("oWins");
    
    if (xWinsSpan && oWinsSpan) {
        xWinsSpan.textContent = scores.X;
        oWinsSpan.textContent = scores.O;
    }
}

export { updateTurnIndicator, updateScores };