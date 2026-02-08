import { 
    board, 
    currentPlayer, 
    gameActive, 
    scores, 
    currentWord, 
    combinacionesGanadoras, 
    revisarGanador, 
    dibujarLinea
} from './game.js';

import {
    inicializarAudio,
    obtenerPalabraAleatoria,
    reproducirPalabra,
    validarPalabra,
    mostrarMensajeValidacion,
    audioInitialized
} from './audio.js';

import { updateTurnIndicator, updateScores } from './ui.js';

// Variables globales para el estado del juego
let gameState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameActive: true,
    scores: { X: 0, O: 0 },
    currentWord: ''
};

// Referencias a elementos del DOM
let cells = null;
let resultsDiv = null;
let turnIndicator = null;
let wordInput = null;
let playAudioBtn = null;
let submitWordBtn = null;
let wordModal = null;
let playerTurnText = null;
let validationMessage = null;
let container = null;

/**
 * Muestra la modal para ingresar la palabra
 */
function mostrarModalPalabra() {
    if (wordModal) {
        wordModal.classList.add('show');
    }
    if (container) {
        container.classList.add('disabled');
    }
    if (playerTurnText) {
        playerTurnText.textContent = `Turno del Jugador ${gameState.currentPlayer}`;
    }
    if (wordInput) {
        wordInput.value = ''; // Limpiar el input
        wordInput.focus();
    }
    if (validationMessage) {
        validationMessage.textContent = '';
        validationMessage.className = 'validation-message';
    }
}

/**
 * Oculta la modal para ingresar la palabra
 */
function ocultarModalPalabra() {
    if (wordModal) {
        wordModal.classList.remove('show');
    }
    if (container) {
        container.classList.remove('disabled');
    }
    if (validationMessage) {
        validationMessage.textContent = '';
    }
}

/**
 * Maneja el envío de la palabra
 */
function manejarEnvioPalabra() {
    console.log('manejarEnvioPalabra llamado');
    const palabraIngresada = wordInput.value;
    console.log('Palabra ingresada:', palabraIngresada, 'Palabra correcta:', gameState.currentWord);
    
    // No limpiar el input aquí, solo al final si todo va bien
    
    if (!palabraIngresada || palabraIngresada.trim() === '') {
        console.log('Input vacío');
        mostrarMensajeValidacion('Por favor, escribe una palabra.', 'error');
        return;
    }
    
    if (!validarPalabra(palabraIngresada, gameState.currentWord)) {
        console.log('Respuesta incorrecta');
        // Mostrar mensaje de error
        mostrarMensajeValidacion(`Incorrecto. La palabra era "${gameState.currentWord}". Turno para Jugador ${gameState.currentPlayer === 'X' ? 'O' : 'X'}`, 'error');
        
        // Cambiar al siguiente jugador después de un breve delay para mostrar el mensaje
        setTimeout(() => {
            gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
            updateTurnIndicator(gameState.currentPlayer);
            
            // Obtener nueva palabra para el siguiente jugador
            gameState.currentWord = obtenerPalabraAleatoria();
            
            // Mostrar la modal para el siguiente jugador y reproducir audio
            reproducirPalabra(gameState.currentWord);
            mostrarModalPalabra();
        }, 2000);
        
        return;
    }
    
    console.log('Respuesta correcta');
    // Si la palabra es correcta, limpiar input y ocultar la modal
    wordInput.value = '';
    mostrarMensajeValidacion('¡Correcto! Ahora puedes marcar una casilla.', 'success');
    
    setTimeout(() => {
        ocultarModalPalabra();
        // Permitir que el jugador marque una casilla
    }, 1000);
}

/**
 * Maneja el clic en una celda del tablero
 * @param {Event} event - El evento de clic
 */
function manejarClickCelda(event) {
    const cell = event.target;
    const index = Array.from(cells).indexOf(cell);
    
    // Verificar si la celda está vacía y el juego está activo
    if (gameState.board[index] !== '' || !gameState.gameActive) {
        return;
    }
    
    // Solo permitir marcar si acaba de responder correctamente
    gameState.board[index] = gameState.currentPlayer;
    cell.setAttribute('data-symbol', gameState.currentPlayer);
    cell.classList.add('taken');

    const ganador = revisarGanador();
    if (ganador) {
        gameState.gameActive = false;
        resultsDiv.innerHTML = `<span class="material-symbols-outlined winner-icon">person_celebrate</span> Jugador ${gameState.currentPlayer} ha ganado`;
        resultsDiv.classList.add('winner-animation');
        gameState.scores[gameState.currentPlayer]++;
        updateScores(gameState.scores);
        dibujarLinea(ganador);
        return;
    }

    if (!gameState.board.includes('')) {
        gameState.gameActive = false;
        resultsDiv.textContent = "Empate";
        return;
    }

    // Cambiar al siguiente jugador
    gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
    updateTurnIndicator(gameState.currentPlayer);
    
    // Obtener nueva palabra para el siguiente jugador
    gameState.currentWord = obtenerPalabraAleatoria();
    
    // Reproducir audio y mostrar la modal para el siguiente jugador
    setTimeout(() => {
        reproducirPalabra(gameState.currentWord);
        mostrarModalPalabra();
    }, 100);
}

/**
 * Asigna los eventos a los botones y elementos del DOM
 */
function asignarEventos() {
    console.log('Asignando eventos...');
    
    // Obtener referencias a elementos del DOM
    cells = document.querySelectorAll(".cell");
    resultsDiv = document.getElementById("results");
    turnIndicator = document.getElementById("turnIndicator");
    wordInput = document.getElementById("wordInput");
    playAudioBtn = document.getElementById("playAudioBtn");
    submitWordBtn = document.getElementById("submitWordBtn");
    wordModal = document.getElementById("wordModal");
    playerTurnText = document.getElementById("playerTurnText");
    validationMessage = document.getElementById("wordValidationMessage");
    container = document.querySelector(".container");
    
    // Debug: verificar que los elementos existen
    console.log('Elementos encontrados:', {
        playAudioBtn: !!playAudioBtn,
        submitWordBtn: !!submitWordBtn,
        wordModal: !!wordModal,
        wordInput: !!wordInput
    });
    
    // Agregar eventos a las celdas
    if (cells) {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", manejarClickCelda);
        });
    }

    // Eventos para botones de control
    const resetBtn = document.getElementById("resetBtn");
    const clearScoreBtn = document.getElementById("clearScoreBtn");
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }
    
    if (clearScoreBtn) {
        clearScoreBtn.addEventListener('click', clearScores);
    }

    // Evento para reproducir audio - CORREGIDO
    if (playAudioBtn) {
        playAudioBtn.addEventListener('click', () => {
            console.log('Botón de audio clickeado', gameState.currentWord);
            // Inicializar audio si aún no se ha hecho
            if (!audioInitialized) {
                inicializarAudio();
                audioInitialized = true;
            }
            if (gameState.currentWord) {
                reproducirPalabra(gameState.currentWord);
            } else {
                // Obtener una nueva palabra si no hay ninguna
                gameState.currentWord = obtenerPalabraAleatoria();
                reproducirPalabra(gameState.currentWord);
            }
        });
        console.log('Evento de audio asignado correctamente');
    } else {
        console.error('No se encontró el botón playAudioBtn');
    }

    // Evento para enviar la palabra - CORREGIDO
    if (submitWordBtn) {
        submitWordBtn.addEventListener('click', () => {
            console.log('Botón enviar clickeado');
            manejarEnvioPalabra();
        });
        console.log('Evento de enviar asignado correctamente');
    } else {
        console.error('No se encontró el botón submitWordBtn');
    }
    
    // Permitir enviar con Enter - CORREGIDO
    if (wordInput) {
        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevenir comportamiento por defecto
                console.log('Enter presionado en input');
                manejarEnvioPalabra();
            }
        });
        console.log('Evento Enter en input asignado correctamente');
    } else {
        console.error('No se encontró el input wordInput');
    }
}

/**
 * Reinicia el juego
 */
function resetGame() {
    gameState.board = ['', '', '', '', '', '', '', '', ''];
    gameState.currentPlayer = 'X';
    gameState.gameActive = true;
    const cells = document.querySelectorAll(".cell");
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
    
    // Reiniciar con nueva palabra
    setTimeout(() => {
        gameState.currentWord = obtenerPalabraAleatoria();
        reproducirPalabra(gameState.currentWord);
        updateTurnIndicator(gameState.currentPlayer);
        mostrarModalPalabra();
    }, 100);
}

/**
 * Limpia los puntajes
 */
function clearScores() {
    gameState.scores = { X: 0, O: 0 };
    updateScores(gameState.scores);
    resetGame();
}

/**
 * Inicializa el juego
 */
function inicializarJuego() {
    console.log('inicializarJuego llamado');

    // Asignar eventos inmediatamente
    asignarEventos();

    // Inicializar la primera palabra
    gameState.currentWord = obtenerPalabraAleatoria();
    
    // Inicializar el juego con un pequeño delay para asegurar que todo esté listo
    setTimeout(() => {
        console.log('Palabra inicial:', gameState.currentWord); // Debug
        updateTurnIndicator(gameState.currentPlayer);
        updateScores(gameState.scores);

        // Mostrar la modal para el primer jugador
        mostrarModalPalabra();

        // Mostrar mensaje al usuario para que haga clic en el botón de audio
        mostrarMensajeValidacion('¡Haz clic en el botón 🔊 para escuchar la palabra!', 'success');
    }, 100);
}

// Iniciar el juego cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', inicializarJuego);