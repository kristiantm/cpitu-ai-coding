// ========== KrystalMagisk Tetris ==========
// Basis Tetris implementation

// Canvas setup
const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

// Scale for grid
const SCALE = 30;
const ROWS = 20;
const COLS = 10;

// Colors for tetrominoes (magical crystal theme)
const COLORS = [
    null,
    '#00FFFF', // I - Cyan (Ice crystal)
    '#FF00FF', // O - Magenta (Amethyst)
    '#FFFF00', // T - Yellow (Citrine)
    '#00FF00', // S - Green (Emerald)
    '#FF0000', // Z - Red (Ruby)
    '#0000FF', // J - Blue (Sapphire)
    '#FF8000'  // L - Orange (Amber)
];

// Tetromino shapes
const SHAPES = [
    null,
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
    [[2, 2], [2, 2]],                                      // O
    [[0, 3, 0], [3, 3, 3], [0, 0, 0]],                    // T
    [[0, 4, 4], [4, 4, 0], [0, 0, 0]],                    // S
    [[5, 5, 0], [0, 5, 5], [0, 0, 0]],                    // Z
    [[6, 0, 0], [6, 6, 6], [0, 0, 0]],                    // J
    [[0, 0, 7], [7, 7, 7], [0, 0, 0]]                     // L
];

// Game state
let board = createMatrix(COLS, ROWS);
let player = {
    pos: {x: Math.floor(COLS / 2) - 1, y: 0},
    matrix: null,
    type: null
};

let score = 0;
let level = 1;
let dropCounter = 0;
let dropInterval = 1000; // Start: 1 second
let lastTime = 0;
let gameOver = false;

// Mood system
const moodStates = [
    { emoji: '😊', text: 'Fantastisk!', threshold: 500 },
    { emoji: '😐', text: 'Ok, ok...', threshold: 200 },
    { emoji: '😠', text: 'Øv, prøv igen!', threshold: 0 }
];

// Initialize
function init() {
    resetPlayer();
    updateScore(0);
    updateLevel(1);
    updateMood(0);
    gameOver = false;
    board = createMatrix(COLS, ROWS);
}

// Create empty matrix
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

// Create tetromino
function createPiece(type) {
    return SHAPES[type];
}

// Reset player piece
function resetPlayer() {
    const types = [1, 2, 3, 4, 5, 6, 7]; // All tetromino types
    const randomType = types[Math.floor(Math.random() * types.length)];
    player.matrix = createPiece(randomType);
    player.type = randomType;
    player.pos.y = 0;
    player.pos.x = Math.floor(COLS / 2) - Math.floor(player.matrix[0].length / 2);

    // Game over check
    if (collide()) {
        gameOver = true;
        updateMood(score);
    }
}

// Check collision
function collide() {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0 && 
                (board[y + o.y] === undefined || 
                 board[y + o.y][x + o.x] === undefined ||
                 board[y + o.y][x + o.x] !== 0)) {
                return true;
            }
        }
    }
    return false;
}

// Rotate matrix
function rotate(matrix) {
    const N = matrix.length;
    const result = createMatrix(N, N);
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < N; x++) {
            result[x][N - 1 - y] = matrix[y][x];
        }
    }
    return result;
}

// Rotate player piece
function rotatePlayer() {
    const pos = player.pos.x;
    let offset = 1;
    rotateMatrix();

    // Wall kick adjustment
    while (collide()) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotateMatrix();
            player.pos.x = pos;
            return;
        }
    }
}

function rotateMatrix() {
    const oldMatrix = player.matrix;
    player.matrix = rotate(oldMatrix);
}

// Move player
function movePlayer(dir) {
    player.pos.x += dir;
    if (collide()) {
        player.pos.x -= dir;
    }
}

// Drop player
function dropPlayer() {
    player.pos.y++;
    if (collide()) {
        player.pos.y--;
        merge();
        resetPlayer();
        clearLines();
        updateScore(10);
    }
    dropCounter = 0;
}

// Hard drop
function hardDrop() {
    while (!collide()) {
        player.pos.y++;
    }
    player.pos.y--;
    merge();
    resetPlayer();
    clearLines();
    updateScore(20);
}

// Merge piece with board
function merge() {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; y++) {
        for (let x = 0; x < m[y].length; x++) {
            if (m[y][x] !== 0) {
                board[y + o.y][x + o.x] = m[y][x];
            }
        }
    }
}

// Clear completed lines
function clearLines() {
    let linesCleared = 0;
    outer: for (let y = board.length - 1; y >= 0; y--) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] === 0) {
                continue outer;
            }
        }
        // Remove the line
        const row = board.splice(y, 1)[0].fill(0);
        board.unshift(row);
        y++; // Re-check the same row (now with new content)
        linesCleared++;
    }

    if (linesCleared > 0) {
        // Score calculation
        const points = [0, 100, 300, 500, 800][linesCleared] * level;
        updateScore(points);
        
        // Level up every 10 lines
        const newLines = linesCleared;
        if (Math.floor((score + points) / 1000) > level - 1) {
            levelUp();
        }
        
        updateMood(score);
    }
}

// Update score
function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
    updateMood(score);
}

// Level up
function levelUp() {
    level++;
    document.getElementById('level').textContent = level;
    dropInterval = Math.max(100, dropInterval * 0.8); // Speed up
    updateMood(score);
}

// Update level display
function updateLevel(lvl) {
    level = lvl;
    document.getElementById('level').textContent = level;
}

// Update mood based on score
function updateMood(currentScore) {
    let moodIndex = 0;
    if (currentScore < 200) moodIndex = 2;
    else if (currentScore < 500) moodIndex = 1;
    else moodIndex = 0;

    document.getElementById('mood-emoji').textContent = moodStates[moodIndex].emoji;
    document.getElementById('mood-text').textContent = moodStates[moodIndex].text;
}

// Draw matrix
function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                ctx.fillStyle = COLORS[value];
                ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                
                // Add crystal sparkle effect
                ctx.strokeStyle = '#FFFFFF';
                ctx.lineWidth = 0.05;
                ctx.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

// Draw board
function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 204, 0.2)';
    ctx.lineWidth = 0.02;
    for (let i = 0; i <= COLS; i++) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ROWS);
        ctx.stroke();
    }
    for (let i = 0; i <= ROWS; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(COLS, i);
        ctx.stroke();
    }

    // Draw board
    drawMatrix(board, {x: 0, y: 0});

    // Draw current piece
    if (!gameOver && player.matrix) {
        drawMatrix(player.matrix, player.pos);
    }

    // Game over overlay
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, COLS, ROWS);
        ctx.fillStyle = '#FF0000';
        ctx.font = '1px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', COLS / 2, ROWS / 2);
        ctx.fillText(`Score: ${score}`, COLS / 2, ROWS / 2 + 1);
        ctx.fillText('Tryk R for at starte forfra', COLS / 2, ROWS / 2 + 2);
    }
}

// Draw scaled to canvas
function drawScaled() {
    ctx.scale(SCALE, SCALE);
    draw();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// Game loop
function update(time = 0) {
    if (gameOver) {
        drawScaled();
        requestAnimationFrame(update);
        return;
    }

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        dropPlayer();
    }

    drawScaled();
    requestAnimationFrame(update);
}

// Keyboard controls
document.addEventListener('keydown', event => {
    if (gameOver) {
        if (event.key === 'r' || event.key === 'R') {
            init();
        }
        return;
    }

    switch (event.key) {
        case 'ArrowLeft':
            movePlayer(-1);
            break;
        case 'ArrowRight':
            movePlayer(1);
            break;
        case 'ArrowDown':
            dropPlayer();
            break;
        case 'ArrowUp':
            rotatePlayer();
            break;
        case ' ':
            hardDrop();
            break;
    }
});

// Start game
init();
update();
