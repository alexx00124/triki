// ==================== FUNCIONES DE UI ====================
import { estado } from './config.js';
import { reproducirAudio } from './audio.js';

export function mostrarMensaje(texto, tipo) {
    const elementos = getElementos();
    if (elementos.validationMessage) {
        elementos.validationMessage.textContent = texto;
        elementos.validationMessage.className = 'message ' + tipo;
    }
}

export function mostrarModal() {
    const elementos = getElementos();
    if (elementos.wordModal) {
        elementos.wordModal.classList.add('active');
    }
    if (elementos.playerTurnText) {
        elementos.playerTurnText.textContent = `Turno del Jugador ${estado.jugadorActual}`;
    }
    if (elementos.wordInput) {
        elementos.wordInput.value = '';
        elementos.wordInput.focus();
    }
    mostrarMensaje('', '');
    estado.puedeMarcar = false;
}

export function ocultarModal() {
    const elementos = getElementos();
    if (elementos.wordModal) {
        elementos.wordModal.classList.remove('active');
    }
}

export function actualizarTurno() {
    const elementos = getElementos();
    if (elementos.turnIndicator) {
        elementos.turnIndicator.textContent = `Turno del Jugador ${estado.jugadorActual}`;
    }
    if (elementos.scoreX) {
        elementos.scoreX.classList.toggle('active', estado.jugadorActual === 'X');
    }
    if (elementos.scoreO) {
        elementos.scoreO.classList.toggle('active', estado.jugadorActual === 'O');
    }
}

export function actualizarPuntajes() {
    const elementos = getElementos();
    if (elementos.xWins) {
        elementos.xWins.textContent = estado.puntajes.X;
    }
    if (elementos.oWins) {
        elementos.oWins.textContent = estado.puntajes.O;
    }
}

export function actualizarInfoRondas() {
    const elementos = getElementos();
    if (elementos.roundsInfo) {
        elementos.roundsInfo.textContent = `Primera a ${estado.rondasObjetivo} rondas`;
    }
}

export function mostrarAlerta(ganador) {
    const elementos = getElementos();
    const esEmpate = ganador === 'empate';
    const mensaje = esEmpate ?
        '¡Es un empate! 🤝 La siguiente partida comenzará en breve...' :
        `¡Felicidades Jugador ${ganador}! 🎉 La siguiente partida comenzará en breve...`;

    if (elementos.alertIcon) {
        elementos.alertIcon.textContent = esEmpate ? '🤝' : '🎉';
    }
    if (elementos.alertTitle) {
        elementos.alertTitle.textContent = esEmpate ? 'Empate' : '¡Victoria!';
    }
    if (elementos.alertMessage) {
        elementos.alertMessage.textContent = mensaje;
    }
    if (elementos.scoreSummary) {
        elementos.scoreSummary.textContent = `Marcador: X: ${estado.puntajes.X} - O: ${estado.puntajes.O}`;
    }

    if (elementos.customAlert) {
        elementos.customAlert.classList.add('active');
    }

    // Reproducir mensaje de voz
    setTimeout(() => {
        if (!esEmpate) {
            reproducirAudio(`Player ${ganador} wins`);
        }
    }, 500);
}

export function ocultarAlerta() {
    const elementos = getElementos();
    if (elementos.customAlert) {
        elementos.customAlert.classList.remove('active');
    }
}

export function mostrarAlertaTorneo(ganador) {
    const elementos = getElementos();
    if (elementos.alertIcon) {
        elementos.alertIcon.textContent = '🏆';
    }
    if (elementos.alertTitle) {
        elementos.alertTitle.textContent = '¡CAMPEÓN!';
    }
    if (elementos.alertMessage) {
        elementos.alertMessage.textContent = `¡Jugador ${ganador} ha ganado el torneo!`;
    }
    if (elementos.scoreSummary) {
        elementos.scoreSummary.innerHTML = `
            <div style="font-size: 1.3rem; margin-bottom: 10px;">🏆 Resultado Final 🏆</div>
            <div style="font-size: 1.5rem;">X: ${estado.puntajes.X} - O: ${estado.puntajes.O}</div>
        `;
    }

    if (elementos.customAlert) {
        elementos.customAlert.classList.add('active');
    }

    setTimeout(() => {
        reproducirAudio(`Player ${ganador} is the champion`);
    }, 500);
}

// Función para obtener elementos del DOM (caché)
let elementosCache = null;
export function getElementos() {
    if (!elementosCache) {
        elementosCache = {
            setupModal: document.getElementById('setupModal'),
            wordModal: document.getElementById('wordModal'),
            customAlert: document.getElementById('customAlert'),
            wordInput: document.getElementById('wordInput'),
            playAudioBtn: document.getElementById('playAudioBtn'),
            submitWordBtn: document.getElementById('submitWordBtn'),
            validationMessage: document.getElementById('wordValidationMessage'),
            playerTurnText: document.getElementById('playerTurnText'),
            turnIndicator: document.getElementById('turnIndicator'),
            roundsInfo: document.getElementById('roundsInfo'),
            scoreX: document.getElementById('scoreX'),
            scoreO: document.getElementById('scoreO'),
            xWins: document.getElementById('xWins'),
            oWins: document.getElementById('oWins'),
            results: document.getElementById('results'),
            linea: document.getElementById('linea'),
            cells: document.querySelectorAll('.cell'),
            clearScoreBtn: document.getElementById('clearScoreBtn'),
            startGameBtn: document.getElementById('startGameBtn'),
            roundOptions: document.querySelectorAll('.round-option'),
            alertIcon: document.getElementById('alertIcon'),
            alertTitle: document.getElementById('alertTitle'),
            alertMessage: document.getElementById('alertMessage'),
            scoreSummary: document.getElementById('scoreSummary')
        };
    }
    return elementosCache;
}