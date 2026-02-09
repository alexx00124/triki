// ==================== INICIALIZACIÓN ====================
import { estado } from './config.js';
import { obtenerPalabraAleatoria } from './audio.js';
import { 
    mostrarModal, 
    ocultarModal, 
    actualizarTurno, 
    actualizarPuntajes, 
    actualizarInfoRondas,
    getElementos
} from './ui.js';
import { manejarEnvioPalabra, manejarClickCelda, iniciarTorneo, reiniciarTorneo } from './events.js';

function inicializar() {
    console.log('🚀 Inicializando Triki Inglés...');
    
    const elementos = getElementos();
    
    // Event listeners para configuración inicial
    if (elementos.roundOptions) {
        elementos.roundOptions.forEach(option => {
            option.addEventListener('click', function() {
                elementos.roundOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                
                estado.rondasObjetivo = parseInt(this.dataset.rounds);
            });
        });
    }
    
    if (elementos.startGameBtn) {
        elementos.startGameBtn.addEventListener('click', iniciarTorneo);
    }
    
    // Event listeners del juego
    if (elementos.playAudioBtn) {
        elementos.playAudioBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔊 Click en botón audio');
            import('./audio.js').then(({ reproducirAudio }) => {
                reproducirAudio(estado.palabraActual);
            });
        });
    }
    
    if (elementos.submitWordBtn) {
        elementos.submitWordBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('✅ Click en botón enviar');
            manejarEnvioPalabra();
        });
    }
    
    if (elementos.wordInput) {
        elementos.wordInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                manejarEnvioPalabra();
            }
        });
    }
    
    if (elementos.cells) {
        console.log('🔍 Asignando eventos a celdas:', elementos.cells.length);
        elementos.cells.forEach((cell, index) => {
            // Las celdas ya tienen data-index en el HTML, no es necesario asignarlo
            cell.addEventListener('click', manejarClickCelda);
            console.log(`📍 Celda ${index} con data-index:`, cell.dataset.index);
        });
    } else {
        console.error('❌ No se encontraron las celdas del tablero');
    }
    
    if (elementos.clearScoreBtn) {
        elementos.clearScoreBtn.addEventListener('click', reiniciarTorneo);
    }
    
    // Inicializar UI
    actualizarTurno();
    actualizarPuntajes();
    
    // Mostrar modal de configuración inicial solo si no hay torneo activo
    if (elementos.setupModal && !estado.torneoActivo) {
        console.log('🚪 Mostrando modal de configuración inicial');
        elementos.setupModal.classList.add('active');
    }
    
    // Configurar ronda por defecto
    if (elementos.roundOptions) {
        const defaultOption = document.querySelector('[data-rounds="3"]');
        if (defaultOption) {
            defaultOption.classList.add('selected');
            estado.rondasObjetivo = 3;
            actualizarInfoRondas();
        }
    }
    
    console.log('✅ Triki Inglés listo para jugar');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}