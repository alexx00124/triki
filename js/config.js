// ==================== CONFIGURACIÓN ====================
export const PALABRAS = [
    'cat', 'dog', 'sun', 'moon', 'star', 'fish', 'bird', 'tree',
    'book', 'ball', 'car', 'bus', 'hat', 'shoe', 'bed', 'cup',
    'pen', 'apple', 'duck', 'egg', 'fan', 'gift', 'hand',
    'ice', 'juice', 'kite', 'leg', 'milk', 'nest', 'orange', 'pig',
    'red', 'blue', 'green', 'one', 'two', 'three', 'four', 'five'
];

export const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// ==================== ESTADO DEL JUEGO ====================
export let estado = {
    tablero: ['', '', '', '', '', '', '', '', ''],
    jugadorActual: 'X',
    juegoActivo: true,
    puntajes: { X: 0, O: 0 },
    palabraActual: '',
    puedeMarcar: false,
    rondasObjetivo: 3,
    torneoActivo: false
};

// Función para resetear el estado
export function resetearEstado() {
    estado = {
        tablero: ['', '', '', '', '', '', '', '', ''],
        jugadorActual: 'X',
        juegoActivo: true,
        puntajes: estado.puntajes, // Mantener puntajes
        palabraActual: '',
        puedeMarcar: false,
        rondasObjetivo: estado.rondasObjetivo, // Mantener rondas objetivo
        torneoActivo: estado.torneoActivo // Mantener estado del torneo
    };
}

// Función para reiniciar completamente
export function reiniciarCompleto() {
    estado = {
        tablero: ['', '', '', '', '', '', '', '', ''],
        jugadorActual: 'X',
        juegoActivo: true,
        puntajes: { X: 0, O: 0 },
        palabraActual: '',
        puedeMarcar: false,
        rondasObjetivo: 3,
        torneoActivo: false
    };
}