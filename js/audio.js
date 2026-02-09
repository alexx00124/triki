// ==================== FUNCIONES DE AUDIO ====================
import { PALABRAS } from './config.js';

export function obtenerPalabraAleatoria() {
    return PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
}

export function reproducirAudio(palabra) {
    console.log('🔊 Reproduciendo:', palabra);
    
    if (!('speechSynthesis' in window)) {
        alert('❌ Tu navegador no soporta síntesis de voz');
        return;
    }

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    utterance.volume = 1;
    
    utterance.onstart = () => console.log('✅ Audio iniciado');
    utterance.onend = () => console.log('✅ Audio completado');
    utterance.onerror = (e) => console.error('❌ Error audio:', e);
    
    window.speechSynthesis.speak(utterance);
}