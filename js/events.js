// ==================== MANEJADORES DE EVENTOS ====================
import { estado } from './config.js';
import { obtenerPalabraAleatoria } from './audio.js';
import { revisarGanador, dibujarLinea } from './game.js';
import { 
    mostrarMensaje, 
    mostrarModal, 
    ocultarModal, 
    actualizarTurno, 
    actualizarPuntajes, 
    mostrarAlerta, 
    ocultarAlerta, 
    mostrarAlertaTorneo,
    getElementos
} from './ui.js';

export function manejarEnvioPalabra() {
    const elementos = getElementos();
    const respuesta = elementos.wordInput.value.trim().toLowerCase();
    
    if (!respuesta) {
        mostrarMensaje('⚠️ Por favor escribe una palabra', 'error');
        return;
    }
    
    if (respuesta !== estado.palabraActual.toLowerCase()) {
        mostrarMensaje(`❌ Incorrecto. Era "${estado.palabraActual}"`, 'error');
        setTimeout(() => {
            estado.jugadorActual = estado.jugadorActual === 'X' ? 'O' : 'X';
            actualizarTurno();
            estado.palabraActual = obtenerPalabraAleatoria();
            // Usar la función de audio importada
            import('./audio.js').then(({ reproducirAudio }) => {
                reproducirAudio(estado.palabraActual);
            });
            mostrarModal();
        }, 2000);
        return;
    }
    
    mostrarMensaje('✅ ¡Correcto! Marca una casilla', 'success');
    estado.puedeMarcar = true;
    console.log('✅ Respuesta correcta, puedeMarcar:', estado.puedeMarcar);
    setTimeout(() => {
        ocultarModal();
        console.log('🔄 Modal oculto, esperando clic en celda');
    }, 1000);
}

export function manejarClickCelda(e) {
    const elementos = getElementos();
    const index = parseInt(e.target.dataset.index);
    
    console.log('🎮 Click en celda:', {
        index: index,
        puedeMarcar: estado.puedeMarcar,
        tableroIndex: estado.tablero[index],
        juegoActivo: estado.juegoActivo,
        jugadorActual: estado.jugadorActual
    });
    
    if (!estado.puedeMarcar || estado.tablero[index] || !estado.juegoActivo) {
        console.log('❌ Click bloqueado');
        return;
    }
    
    estado.tablero[index] = estado.jugadorActual;
    e.target.setAttribute('data-symbol', estado.jugadorActual);
    e.target.classList.add('taken');
    estado.puedeMarcar = false;
    
    const ganador = revisarGanador();
    if (ganador) {
        console.log('🏆 ¡GANADOR DETECTADO! Jugador:', estado.jugadorActual, 'Combinación:', ganador);
        estado.juegoActivo = false;
        estado.puntajes[estado.jugadorActual]++;
        actualizarPuntajes();
        dibujarLinea(ganador);
        
        if (elementos.results) {
            elementos.results.innerHTML = `<span class="winner-icon">🎉</span> Jugador ${estado.jugadorActual} ha ganado`;
            elementos.results.classList.add('winner-animation');
        }
        
        // Mostrar el resultado y la línea por 4 segundos antes de la alerta
        console.log('⏰ Mostrando victoria por 4 segundos...');
        setTimeout(() => {
            console.log('📣 Mostrando alerta de victoria');
            mostrarAlerta(estado.jugadorActual);
            setTimeout(() => {
                ocultarAlerta();
                if (verificarFinTorneo()) return;
                reiniciarPartida();
            }, 3000);
        }, 4000);
        return;
    }
    
    if (!estado.tablero.includes('')) {
        console.log('🤝 ¡EMPATE DETECTADO!');
        estado.juegoActivo = false;
        if (elementos.results) {
            elementos.results.textContent = '🤝 ¡Empate!';
            elementos.results.classList.add('winner-animation');
        }
        
        // Mostrar el resultado del empate por 4 segundos antes de la alerta
        console.log('⏰ Mostrando empate por 4 segundos...');
        setTimeout(() => {
            console.log('📣 Mostrando alerta de empate');
            mostrarAlerta('empate');
            setTimeout(() => {
                ocultarAlerta();
                reiniciarPartida();
            }, 3000);
        }, 4000);
        return;
    }
    
    estado.jugadorActual = estado.jugadorActual === 'X' ? 'O' : 'X';
    actualizarTurno();
    estado.palabraActual = obtenerPalabraAleatoria();
    
    // Usar la función de audio importada
    import('./audio.js').then(({ reproducirAudio }) => {
        reproducirAudio(estado.palabraActual);
        mostrarModal();
    });
}

function verificarFinTorneo() {
    if (estado.puntajes.X >= estado.rondasObjetivo) {
        estado.torneoActivo = false;
        setTimeout(() => {
            mostrarAlertaTorneo('X');
            setTimeout(() => {
                ocultarAlerta();
                reiniciarTorneo();
            }, 5000);
        }, 3000);
        return true;
    }
    
    if (estado.puntajes.O >= estado.rondasObjetivo) {
        estado.torneoActivo = false;
        setTimeout(() => {
            mostrarAlertaTorneo('O');
            setTimeout(() => {
                ocultarAlerta();
                reiniciarTorneo();
            }, 5000);
        }, 3000);
        return true;
    }
    
    return false;
}

export function reiniciarPartida() {
    const elementos = getElementos();
    
    estado.tablero = ['', '', '', '', '', '', '', '', ''];
    estado.jugadorActual = 'X';
    estado.juegoActivo = true;
    estado.puedeMarcar = false;
    
    if (elementos.cells) {
        elementos.cells.forEach(cell => {
            cell.removeAttribute('data-symbol');
            cell.classList.remove('taken');
        });
    }
    
    if (elementos.results) {
        elementos.results.textContent = '';
        elementos.results.classList.remove('winner-animation');
    }
    
    if (elementos.linea) {
        elementos.linea.style.display = 'none';
    }
    
    actualizarTurno();
    
    estado.palabraActual = obtenerPalabraAleatoria();
    import('./audio.js').then(({ reproducirAudio }) => {
        reproducirAudio(estado.palabraActual);
        mostrarModal();
    });
}

export function iniciarTorneo() {
    const elementos = getElementos();
    
    console.log('🎮 Iniciando torneo...');
    estado.torneoActivo = true;
    
    // Ocultar el modal de configuración
    if (elementos.setupModal) {
        console.log('🚪 Ocultando modal de configuración');
        elementos.setupModal.classList.remove('active');
    }
    
    reiniciarPartida();
}

export function reiniciarTorneo() {
    // Reiniciar puntajes y estado del torneo
    estado.puntajes = { X: 0, O: 0 };
    estado.rondasObjetivo = 3;
    estado.torneoActivo = false;
    
    const elementos = getElementos();
    actualizarPuntajes();
    actualizarTurno();
    
    if (elementos.setupModal) {
        elementos.setupModal.classList.add('active');
    }
}