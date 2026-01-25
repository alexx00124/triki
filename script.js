let board = ['', '', '', '', '', '', '', '', ''];


let currentPlayer = 'X';

const celdas = document.querySelectorAll(".cell");

celdas.forEach((celdas, index) => {
    celdas.addEventListener("click", () => {
        if (board[index] === '') {
            board[index] = currentPlayer;
            celdas.textContent = currentPlayer;

            const ganador = revisarGanador();
            if (ganador) {
                console.log(`El jugador ${currentPlayer} ha ganado`);
                dibujarLinea(ganador);
                return; // detenemos el juego
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});


const combinacionesGanadoras = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

function revisarGanador() {
  for (let combo of combinacionesGanadoras) {
    const [a, b, c] = combo;

    if (
      board[a] !== '' &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return combo; // devuelve la combinacion ganadora
    }
  }
  return null;
}

function dibujarLinea(combo) {
  const linea = document.getElementById("linea");
  linea.style.display = "block";

  // Reiniciar estilos previos
  linea.style.width = "270px";
  linea.style.height = "4px";
  linea.style.top = "0";
  linea.style.left = "0";
  linea.style.transform = "rotate(0deg)";
  linea.style.transformOrigin = "center";

  // Calcular posiciones basadas en el tamaño de las celdas (90px)
  const cellSize = 90;
  const borderSize = 1;

  // Obtener las posiciones de las celdas ganadoras
  const [a, b, c] = combo;

  // Calcular filas y columnas para cada celda
  const rowA = Math.floor(a / 3);
  const colA = a % 3;
  const rowB = Math.floor(b / 3);
  const colB = b % 3;
  const rowC = Math.floor(c / 3);
  const colC = c % 3;

  // Calcular posiciones centrales de las celdas
  const centerX_A = colA * cellSize + cellSize / 2;
  const centerY_A = rowA * cellSize + cellSize / 2;
  const centerX_C = colC * cellSize + cellSize / 2;
  const centerY_C = rowC * cellSize + cellSize / 2;

  // Calcular punto medio entre la primera y última celda ganadora
  const midX = (centerX_A + centerX_C) / 2;
  const midY = (centerY_A + centerY_C) / 2;

  // Establecer posición y rotación según la combinación ganadora
  if (rowA === rowB && rowB === rowC) {
    // Línea horizontal (misma fila)
    linea.style.top = `${midY}px`;
    linea.style.left = `${midX}px`;
    linea.style.width = "270px";
    linea.style.height = "4px";
    linea.style.transform = "translate(-50%, -50%) rotate(0deg)";
  } else if (colA === colB && colB === colC) {
    // Línea vertical (misma columna)
    linea.style.top = `${midY}px`;
    linea.style.left = `${midX}px`;
    linea.style.width = "4px";
    linea.style.height = "270px";
    linea.style.transform = "translate(-50%, -50%) rotate(0deg)";
  } else {
    // Línea diagonal
    // Calcular la distancia entre puntos para determinar la longitud de la línea
    const distance = Math.sqrt(Math.pow(centerX_C - centerX_A, 2) + Math.pow(centerY_C - centerY_A, 2));

    // Calcular ángulo de rotación
    const angle = Math.atan2(centerY_C - centerY_A, centerX_C - centerX_A) * 180 / Math.PI;

    linea.style.top = `${midY}px`;
    linea.style.left = `${midX}px`;
    linea.style.width = `${distance}px`;
    linea.style.height = "4px";
    linea.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";
  }
}

