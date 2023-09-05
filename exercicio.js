const player = document.getElementById("objetoNaoIdentificado");
const canvas = document.getElementById("mazeCanvas");
const timerElement = document.getElementById("timer");
const ctx = canvas.getContext("2d");


const tileSize = 35;


let playerX = 0;
let playerY = 0;


let startTime = null;
let endTime = null;
let isInsideMaze = true;


// Mapa do labirinto
const maze = [

    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,1,1,0,1,0,1,0,0,0,1],
    [1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,1,0,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1],
    [1,1,0,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,0,1],
    [1,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,1],
    [1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,0,0,1,1,1,0,0,0,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]
];


// Função para renderizar o labirinto
function renderMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = "black";
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}


// Função para atualizar a posição do jogador
function updatePlayerPosition() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}


// Função para verificar colisões
function checkCollision(nextX, nextY) {
    const col = Math.floor(nextX / tileSize);
    const row = Math.floor(nextY / tileSize);


    if (maze[row] && maze[row][col] === 1) {
        return true;
    }
    return false;
}


// Função de loop
function gameLoop(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    
    const elapsedTime = Math.floor((timestamp - startTime) / 1000);
    timerElement.textContent = `Tempo total: ${elapsedTime} segundos`;


    if (isInsideMaze) {
        updatePlayerPosition();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderMaze();
    } else {
        if (!endTime) {
            endTime = timestamp;
        }
        const elapsedGameTime = Math.floor((endTime - startTime) / 1000);
        timerElement.textContent = `Tempo total: ${elapsedGameTime} segundos`;
    }
    
    requestAnimationFrame(gameLoop);
}


// Event listener para teclas
document.addEventListener("keydown", function(event) {
    const tecla = event.keyCode;


    if (isInsideMaze) {
        let nextX = playerX;
        let nextY = playerY;


        if (tecla === 39) { // Tecla direita
            nextX = playerX + tileSize;
        } else if (tecla === 37) { // Tecla esquerda
            nextX = playerX - tileSize;
        } else if (tecla === 38) { // Tecla cima
            nextY = playerY - tileSize;
        } else if (tecla === 40) { // Tecla baixo
            nextY = playerY + tileSize;
        }


        if (!checkCollision(nextX, nextY)) {
            playerX = nextX;
            playerY = nextY;
        }
        
        // Verificar se o jogador saiu do labirinto
        if (playerX < 0 || playerX >= canvas.width || playerY < 0 || playerY >= canvas.height) {
            isInsideMaze = false;
            endTime = performance.now(); // Finalizar o tempo ao sair
            playerX = 0;
            playerY = 0;
        }
    }
});


// Iniciar o loop do jogo
gameLoop();









