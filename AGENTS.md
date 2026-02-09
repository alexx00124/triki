# AGENTS.md - Guía para Agentes de Desarrollo

Este archivo contiene las directrices y comandos para trabajar en el proyecto Triki - Aprende Inglés.

## 🚀 Comandos de Desarrollo

### Servidor de Desarrollo
```bash
# Iniciar servidor en puerto 5500
python3 -m http.server 5500

# Acceder al juego
http://localhost:5500
```

### Pruebas
```bash
# No existe framework de pruebas configurado
# Para pruebas manuales: abrir el juego en navegador y verificar:
# 1. Funcionalidad de audio (SpeechSynthesis)
# 2. Validación de palabras en inglés
# 3. Lógica del juego tres en raya
# 4. Sistema de puntajes y rondas
```

### Linting y Formato
```bash
# No hay herramientas de linting configuradas
# Usar validador HTML online para verificar sintaxis HTML
# Para JavaScript: verificar consola del navegador en busca de errores
```

## 📁 Estructura del Proyecto

```
triki/
├── index.html          # Archivo principal (HTML + CSS + JS)
└── .git/              # Control de versiones
```

**Nota**: Este es un proyecto monolítico con todo el código en `index.html`.

## 🎨 Estilo de Código

### General
- **Idioma**: Todo el código y comentarios en español
- **Arquitectura**: Monolítica - HTML, CSS y JavaScript en un solo archivo
- **Separación**: Secciones claramente delimitadas con comentarios

### Nomenclatura

#### Variables y Constantes
```javascript
// Constantes en MAYÚSCULAS (configuración)
const PALABRAS = ['cat', 'dog', 'sun'];
const WINNING_COMBOS = [[0,1,2], [3,4,5]];

// Variables en camelCase (estado del juego)
let estado = {
    tablero: ['', '', '', '', '', '', '', '', ''],
    jugadorActual: 'X',
    juegoActivo: true
};

// Elementos del DOM en camelCase descriptivo
const elementos = {
    wordModal: document.getElementById('wordModal'),
    playAudioBtn: document.getElementById('playAudioBtn')
};
```

#### Funciones
```javascript
// Funciones con nombres descriptivos en español
function obtenerPalabraAleatoria() { }
function reproducirAudio(palabra) { }
function mostrarModal() { }
function manejarClickCelda(evento) { }
```

### Formato HTML/CSS
```html
<!-- Usar 4 espacios para indentación -->
<div class="modal" id="wordModal">
    <div class="modal-content">
        <!-- Atributos en orden: id, class, otros -->
    </div>
</div>
```

### Formato JavaScript
```javascript
// Usar 4 espacios, no tabs
if (condicion) {
    // Código
}

// Espacio después de keywords
for (let i = 0; i < length; i++) { }

// No espacio después de nombre de función
miFuncion(parametro);
```

## 🔧 Patrones y Convenciones

### Manejo del DOM
```javascript
// Agrupar elementos en objeto 'elementos'
const elementos = {
    modal: document.getElementById('modal'),
    input: document.getElementById('input')
};

// Usar addEventListener con funciones anónimas para contexto
elementos.boton.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    miFuncion();
});
```

### Estado del Juego
```javascript
// Centralizar estado en objeto 'estado'
let estado = {
    tablero: Array(9).fill(''),
    jugadorActual: 'X',
    juegoActivo: true,
    palabraActual: ''
};
```

### Funciones de Audio
```javascript
function reproducirAudio(palabra) {
    // Validar soporte
    if (!('speechSynthesis' in window)) {
        alert('Tu navegador no soporta síntesis de voz');
        return;
    }
    
    // Cancelar audio previo
    window.speechSynthesis.cancel();
    
    // Configurar utterance
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = 'en-US';
    utterance.rate = 0.75;
    
    // Manejar eventos
    utterance.onerror = (e) => console.error('Error audio:', e);
    window.speechSynthesis.speak(utterance);
}
```

### Manejo de Eventos
```javascript
// Prevenir comportamiento por defecto
elementos.formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    manejarEnvio();
});

// Soporte para Enter en inputs
elementos.input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        manejarEnvio();
    }
});
```

### Validación
```javascript
function validarPalabra(input, palabraCorrecta) {
    // Normalizar: trim + lowercase
    const normalizedInput = input.trim().toLowerCase();
    const normalizedCorrect = palabraCorrecta.toLowerCase();
    return normalizedInput === normalizedCorrect;
}
```

## 🎛️ Funcionalidades Clave

### 1. Sistema de Audio
- Usar Web Speech API (SpeechSynthesis)
- Configurar idioma inglés ('en-US')
- Manejar errores de permisos ('not-allowed')

### 2. Juego Tres en Raya
- Validar combinaciones ganadoras
- Dibujar líneas de victoria
- Manejar empates

### 3. Sistema de Torneo
- Partidas a X rondas
- Persistencia de puntajes
- Modales de victoria/empate

## 🐛 Depuración

### Consola
```javascript
// Usar emojis para identificar fácilmente
console.log('🔊 Reproduciendo:', palabra);
console.log('✅ Palabra correcta');
console.log('❌ Error al procesar:', error);
```

### Problemas Comunes
1. **Audio 'not-allowed'**: Requerir interacción del usuario primero
2. **SpeechSynthesis no disponible**: Verificar soporte del navegador
3. **Eventos no asignados**: Verificar que el DOM esté listo

## 📱 Compatibilidad

### Navegadores Soportados
- Chrome/Edge: Web Speech API completo
- Firefox: Web Speech API funcional
- Safari: Puede requerir permisos explícitos

### Dispositivos
- Desktop: Experiencia completa
- Mobile: Responsive con táctiles
- Tablets: Optimizado para ambos

## 🔄 Flujo de Trabajo

### Modificar Juego
1. Editar sección correspondiente en index.html
2. Actualizar estado o elementos si es necesario
3. Probar en navegador (localhost:5500)
4. Verificar consola para errores

### Agregar Funcionalidad
1. Definir constantes/estado al inicio
2. Crear función descriptiva
3. Agregar event listeners en inicialización
4. Actualizar UI/estado según sea necesario

### Corregir Bugs
1. Identificar sección afectada
2. Revisar consola del navegador
3. Verificar flujo de datos y estado
4. Probar casos límite

## 🚨 Consideraciones Especiales

### Audio y Permisos
- Los navegadores requieren interacción del usuario para audio
- Manejar gracefully cuando no hay soporte
- Proporcionar feedback visual/audio

### Palabras en Inglés
- Mantener lista actualizada y apropiada para niños
- Asegurar pronunciación clara
- Considerar dificultad progresiva

### Estado Persistente
- Guardar puntajes entre partidas
- Mantener configuración de rondas
- Preservar configuración de usuario

## 📝 Logs y Comentarios

### Nivel de Logging
```javascript
console.log('✅ Inicialización completa');        // Éxito
console.warn('⚠️ Audio no disponible');             // Advertencia
console.error('❌ Error al procesar palabra');      // Error
```

### Comentarios Útiles
```javascript
// ==================== SECCIÓN: CONFIGURACIÓN ====================
// Agrupar constantes del juego

// Función: Maneja el clic en celda del tablero
// Parámetros: event - Evento de clic del DOM
```

---

**Nota para agentes**: Este es un proyecto educativo para niños. Mantener el código simple, bien comentado y enfocado en la experiencia de aprendizaje del inglés.