# Triki - Aprende Inglés

Un juego interactivo de Triki (Tic-Tac-Toe) diseñado para ayudar a los niños a aprender inglés. Los jugadores deben escuchar palabras en inglés y escribirlas correctamente para poder hacer sus movimientos.

## Características

- Juego de Triki clásico con mecánica educativa
- Palabras en inglés apropiadas para niños
- Reproducción de audio con SpeechSynthesis API
- Sistema de puntuación
- Interfaz amigable y responsive

## Cómo jugar

1. Escucha la palabra en inglés que se reproduce automáticamente
2. Escribe la palabra en el campo de texto
3. Si la palabra es correcta, puedes marcar una casilla
4. Si es incorrecta, el turno pasa al otro jugador
5. El primer jugador en conseguir tres en línea gana

## Estructura del proyecto

```
triki/
├── index.html              # Página principal
├── styles.css              # Estilos del juego
├── src/
│   └── js/
│       ├── main.js         # Archivo principal del juego
│       ├── game.js         # Lógica del juego Triki
│       ├── audio.js        # Lógica de audio y palabras
│       └── ui.js           # Interfaz de usuario
├── package.json            # Configuración del proyecto
└── README.md               # Documentación
```

## Instalación y ejecución

1. Clona o descarga este repositorio
2. Abre `index.html` en un navegador web moderno
3. ¡Comienza a jugar!

Alternativamente, puedes usar Python para servir localmente:

```bash
# Desde la raíz del proyecto
python -m http.server 8000
```

Luego visita http://localhost:8000 en tu navegador.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6+ (módulos)
- Web Speech API (SpeechSynthesis)
- Diseño responsive
