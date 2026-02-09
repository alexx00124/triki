// ==================== FUNCIONES DE JUEGO ====================
import { WINNING_COMBOS, estado } from './config.js';

export function revisarGanador() {
    const tablero = estado.tablero;
    
    for (let combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        if (tablero[a] !== '' && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            return combo;
        }
    }
    return null;
}

export function dibujarLinea(combo) {
    const linea = document.getElementById('linea');
    if (!linea) {
        console.error("Elemento 'linea' no encontrado en el DOM");
        return;
    }

    const gameBoard = document.getElementById('game');
    linea.style.display = 'block';

    const cellSize = 140;
    const gap = 6;
    const [a, b, c] = combo;

    const rowA = Math.floor(a / 3);
    const colA = a % 3;
    const rowC = Math.floor(c / 3);
    const colC = c % 3;

    const centerX_A = colA * (cellSize + gap) + cellSize / 2;
    const centerY_A = rowA * (cellSize + gap) + cellSize / 2;
    const centerX_C = colC * (cellSize + gap) + cellSize / 2;
    const centerY_C = rowC * (cellSize + gap) + cellSize / 2;

    const midX = (centerX_A + centerX_C) / 2;
    const midY = (centerY_A + centerY_C) / 2;

    if (rowA === rowC) {
        // Línea horizontal
        linea.style.width = `${cellSize * 3 + gap * 2}px`;
        linea.style.height = '8px';
        linea.style.top = `${midY}px`;
        linea.style.left = `${midX}px`;
        linea.style.transform = 'translate(-50%, -50%)';
    } else if (colA === colC) {
        // Línea vertical
        linea.style.width = '8px';
        linea.style.height = `${cellSize * 3 + gap * 2}px`;
        linea.style.top = `${midY}px`;
        linea.style.left = `${midX}px`;
        linea.style.transform = 'translate(-50%, -50%)';
    } else {
        // Línea diagonal
        const distance = Math.sqrt(Math.pow(centerX_C - centerX_A, 2) + Math.pow(centerY_C - centerY_A, 2));
        const angle = Math.atan2(centerY_C - centerY_A, centerX_C - centerX_A) * 180 / Math.PI;
        linea.style.width = `${distance}px`;
        linea.style.height = '8px';
        linea.style.top = `${midY}px`;
        linea.style.left = `${midX}px`;
        linea.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    }
}

export function validarPalabra(input, palabraCorrecta) {
    // Normalizar: trim + lowercase
    const normalizedInput = input.trim().toLowerCase();
    const normalizedWord = palabraCorrecta.toLowerCase();
    return normalizedInput === normalizedWord;
}