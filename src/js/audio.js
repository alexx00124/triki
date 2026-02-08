// Variable para saber si el audio ha sido inicializado
let audioInitialized = false;

/**
 * Inicializa el audio después de la primera interacción del usuario
 */
function inicializarAudio() {
    if (audioInitialized) return;

    if ('speechSynthesis' in window) {
        // Crear un utterance silencioso para inicializar el audio
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
        audioInitialized = true;
        console.log('Audio inicializado correctamente');
    }
}

/**
 * Obtiene una palabra aleatoria de una lista predefinida de palabras sencillas
 * @returns {string} La palabra seleccionada
 */
function obtenerPalabraAleatoria() {
    // Lista de palabras sencillas en inglés apropiadas para niños
    const palabras = [
        'cat', 'dog', 'sun', 'moon', 'star', 'fish', 'bird', 'tree',
        'book', 'ball', 'car', 'bus', 'hat', 'shoe', 'bed', 'cup',
        'pen', 'apple', 'ball', 'duck', 'egg', 'fan', 'gift', 'hand',
        'ice', 'juice', 'kite', 'leg', 'milk', 'nest', 'orange', 'pig',
        'queen', 'ring', 'sun', 'top', 'umbrella', 'van', 'water', 'xray',
        'yellow', 'zip', 'ant', 'bear', 'cow', 'deer', 'eye', 'fox',
        'goat', 'horse', 'ink', 'jelly', 'knee', 'lion', 'mouse', 'nut',
        'owl', 'panda', 'rabbit', 'snake', 'tiger', 'wolf', 'zoo', 'air',
        'big', 'hot', 'cold', 'happy', 'sad', 'fast', 'slow', 'red',
        'blue', 'green', 'yellow', 'black', 'white', 'one', 'two', 'three'
    ];
    
    // Seleccionar una palabra aleatoria de la lista
    const indice = Math.floor(Math.random() * palabras.length);
    return palabras[indice];
}

/**
 * Reproduce la palabra usando la API de SpeechSynthesis
 * @param {string} word - La palabra a reproducir
 */
function reproducirPalabra(word) {
    if (!word || typeof word !== 'string') {
        console.error('Palabra inválida para reproducir:', word);
        return;
    }
    
    if ('speechSynthesis' in window) {
        // Cancelar cualquier reproducción anterior
        window.speechSynthesis.cancel();
        
        // Si el audio no está inicializado, inicializarlo primero
        if (!audioInitialized) {
            console.log('Iniciando audio por primera vez...');
            inicializarAudio();
            // Esperar un poco y luego reproducir la palabra
            setTimeout(() => {
                reproducirPalabra(word);
            }, 500);
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(word.trim());
        utterance.lang = 'en-US'; // Establecer idioma inglés
        utterance.rate = 0.8; // Velocidad un poco más lenta para claridad
        utterance.volume = 1.0; // Volumen máximo
        utterance.pitch = 1.0; // Tono normal
        
        utterance.onstart = () => {
            console.log('Reproduciendo palabra:', word);
        };
        
        utterance.onerror = (event) => {
            console.error('Error al reproducir audio:', event.error);
            if (event.error === 'not-allowed') {
                console.log('Audio no permitido - esperando interacción del usuario');
            }
        };
        
        utterance.onend = () => {
            console.log('Audio terminado');
        };
        
        // Pequeño delay antes de hablar
        setTimeout(() => {
            window.speechSynthesis.speak(utterance);
        }, 50);
        
    } else {
        console.error('Tu navegador no soporta la API de SpeechSynthesis');
        alert('Tu navegador no soporta la API de SpeechSynthesis');
    }
}

/**
 * Valida si la palabra ingresada coincide con la palabra actual
 * @param {string} input - La palabra ingresada por el jugador
 * @returns {boolean} True si la palabra es correcta
 */
function validarPalabra(input, currentWord) {
    // Normalizar texto: quitar espacios extras y convertir a minúsculas
    const normalizedInput = input.trim().toLowerCase();
    const normalizedWord = currentWord.toLowerCase();
    
    return normalizedInput === normalizedWord;
}

/**
 * Actualiza el mensaje de validación
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje ('success' o 'error')
 */
function mostrarMensajeValidacion(message, type) {
    const validationMessage = document.getElementById("wordValidationMessage");
    validationMessage.textContent = message;
    validationMessage.className = 'validation-message ' + type;
}

export {
    inicializarAudio,
    obtenerPalabraAleatoria,
    reproducirPalabra,
    validarPalabra,
    mostrarMensajeValidacion,
    audioInitialized
};