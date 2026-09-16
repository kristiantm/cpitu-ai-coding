// ============================================
// SLANGETÆMMER - Western Snake Game
// Bane 1: Ørken
// ============================================

// ===== KONSTANTER =====
const GRID_SIZE = 20;      // 20x20 grid
const CELL_SIZE = 30;     // 30x30px pr. celle
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE; // 600x600px

// Farver fra spec
const COLORS = {
    background: '#DEB887',   // Beige - bane baggrund
    snake: '#8B4513',       // Brun - slange
    goldBar: '#FFD700',     // Gylden - guldbarrer
    cactus: '#228B22',      // Mørkegrøn - kaktusser
    wall: '#5D4037',        // Mørkebrun - vægge
    text: '#8B4513',        // Brun - tekst
    sepia: '#F5DEB3'       // Sepia - side baggrund
};

// ===== CANVAS SETUP =====
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// ===== GAME STATE =====
const GAME_STATES = {
    MENU: 'MENU',
    PLAYING: 'PLAYING',
    GAME_OVER: 'GAME_OVER',
    WIN: 'WIN'
};

let gameState = GAME_STATES.MENU;

// ===== BANE 1: ØRKEN =====
// Koordinater - tilpasset for bedre synlighed
const level1 = {
    cacti: [
        { x: 0, y: 0 },
        { x: 19, y: 1 },
        { x: 14, y: 2 },
        { x: 14, y: 3 }
    ],
    goldBars: [
        { x: 8, y: 1 },   // Midt-øverst
        { x: 5, y: 5 },   // Midt-venstre
        { x: 15, y: 5 },  // Midt-højre
        { x: 3, y: 10 },  // Nederst-venstre
        { x: 17, y: 10 }, // Nederst-højre
        { x: 10, y: 15 }  // Midt-nederst
    ]
};

// ===== SLANGE =====
let snake = {
    body: [{ x: 10, y: 10 }],  // Startposition midt på banen
    direction: 'RIGHT',
    nextDirection: 'RIGHT'    // Buffer til at undgå 180° drej
};

// ===== SPIL-STATE =====
let score = 0;
let goldBar = null;
let frameCount = 0;
const MOVE_SPEED = 10; // Bevæg slangen hver 10. frame (~6 FPS)

// ============================================
// INITIALISERING
// ============================================

function init() {
    // Spawn første guldbarr
    spawnGoldBar();
    
    // Start game loop
    requestAnimationFrame(gameLoop);
}

function spawnGoldBar() {
    // For nu: tag den første guldbarr fra level1
    if (level1.goldBars.length > 0) {
        const bar = level1.goldBars.shift();
        goldBar = { x: bar.x, y: bar.y };
    } else {
        // Hvis ingen flere i listen, spawn tilfældigt på gyldig position
        goldBar = getRandomValidPosition();
    }
}

function getRandomValidPosition() {
    let x, y;
    let isValid = false;
    
    while (!isValid) {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
        
        // Tjek om positionen er gyldig (ikke på slange, kaktus, eller guldbarr)
        isValid = true;
        
        // Tjek slange
        for (const segment of snake.body) {
            if (segment.x === x && segment.y === y) {
                isValid = false;
                break;
            }
        }
        
        if (!isValid) continue;
        
        // Tjek kaktusser
        for (const cactus of level1.cacti) {
            if (cactus.x === x && cactus.y === y) {
                isValid = false;
                break;
            }
        }
    }
    
    return { x, y };
}

// ============================================
// GAME LOOP
// ============================================

function gameLoop() {
    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Update og draw baseret på game state
    switch (gameState) {
        case GAME_STATES.MENU:
            drawMenu();
            break;
        case GAME_STATES.PLAYING:
            update();
            draw();
            break;
        case GAME_STATES.GAME_OVER:
            drawGameOver();
            break;
        case GAME_STATES.WIN:
            drawWin();
            break;
    }
    
    // Fortsæt loop
    requestAnimationFrame(gameLoop);
}

// ============================================
// UPDATE LOGIK
// ============================================

function update() {
    frameCount++;
    
    // Håndter input buffer
    snake.direction = snake.nextDirection;
    
    // Flyt slangen kun hver MOVE_SPEED frame
    if (frameCount % MOVE_SPEED === 0) {
        moveSnake();
        
        // Tjek collisioner
        if (checkCollisions()) {
            gameState = GAME_STATES.GAME_OVER;
            return;
        }
        
        // Tjek om slangen samler guldbarr
        checkGoldCollision();
        
        // Tjek vind (20 guldbarrer = 200 point)
        if (score >= 200) {
            gameState = GAME_STATES.WIN;
        }
    }
}

function moveSnake() {
    const head = { ...snake.body[0] };
    
    // Opdater hoved position baseret på retning
    switch (snake.direction) {
        case 'UP':
            head.y--;
            break;
        case 'DOWN':
            head.y++;
            break;
        case 'LEFT':
            head.x--;
            break;
        case 'RIGHT':
            head.x++;
            break;
    }
    
    // Tilføj nyt hoved
    snake.body.unshift(head);
    
    // Fjern hale (undtagen ved vækst - håndteres i checkGoldCollision)
    snake.body.pop();
}

function checkCollisions() {
    const head = snake.body[0];
    
    // 1. Collision med vægge
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        return true;
    }
    
    // 2. Collision med sig selv (start fra index 1 for at undgå hovedet)
    for (let i = 1; i < snake.body.length; i++) {
        if (head.x === snake.body[i].x && head.y === snake.body[i].y) {
            return true;
        }
    }
    
    // 3. Collision med kaktusser
    for (const cactus of level1.cacti) {
        if (head.x === cactus.x && head.y === cactus.y) {
            return true;
        }
    }
    
    return false;
}

function checkGoldCollision() {
    if (!goldBar) return;
    
    const head = snake.body[0];
    
    if (head.x === goldBar.x && head.y === goldBar.y) {
        // Samlet guldbarr!
        score += 10;
        
        // Slangen vokser (tilføj et ekstra segment)
        // Find sidste segment og tilføj et nyt bagved
        const tail = snake.body[snake.body.length - 1];
        snake.body.push({ ...tail });
        
        // Spawn ny guldbarr
        spawnGoldBar();
    }
}

// ============================================
// DRAW FUNKTIONER
// ============================================

function draw() {
    // Tegn baggrund med subtilt sand-mønster
    drawBackground();
    
    // Tegn kaktusser
    drawCacti();
    
    // Tegn guldbarr
    if (goldBar) {
        drawGoldBar(goldBar.x, goldBar.y);
    }
    
    // Tegn slange
    drawSnake();
    
    // Tegn score
    drawScore();
}

function drawBackground() {
    // Base farve
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Tegn subtile sand-bølger (horisontale linjer)
    ctx.strokeStyle = 'rgba(210, 180, 140, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < GRID_SIZE; i += 2) {
        const y = i * CELL_SIZE + CELL_SIZE / 2;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let j = 0; j < GRID_SIZE; j++) {
            const x = j * CELL_SIZE;
            const offset = Math.sin(j * 0.5) * 3;
            ctx.lineTo(x, y + offset);
        }
        ctx.stroke();
    }
}

function drawSnake() {
    const head = snake.body[0];
    
    // Tegn alle segmenter (krop)
    for (let i = 0; i < snake.body.length; i++) {
        const segment = snake.body[i];
        const isHead = (i === 0);
        
        // Farve: hovedet er lidt mørkere
        ctx.fillStyle = isHead ? '#654321' : COLORS.snake;
        
        // Tegn afrundet rektangel for pænere look
        const x = segment.x * CELL_SIZE;
        const y = segment.y * CELL_SIZE;
        const radius = 5;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + CELL_SIZE - radius, y);
        ctx.quadraticCurveTo(x + CELL_SIZE, y, x + CELL_SIZE, y + radius);
        ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE - radius);
        ctx.quadraticCurveTo(x + CELL_SIZE, y + CELL_SIZE, x + CELL_SIZE - radius, y + CELL_SIZE);
        ctx.lineTo(x + radius, y + CELL_SIZE);
        ctx.quadraticCurveTo(x, y + CELL_SIZE, x, y + CELL_SIZE - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        
        // Tegn kant
        ctx.strokeStyle = '#5D4037';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Tegn cowboyhat på hovedet
        if (isHead) {
            drawCowboyHat(x, y);
        }
    }
}

function drawCowboyHat(x, y) {
    // Cowboyhat: brun med gul kant
    const hatWidth = CELL_SIZE * 0.7;
    const hatHeight = CELL_SIZE * 0.4;
    const hatX = x + (CELL_SIZE - hatWidth) / 2;
    const hatY = y - hatHeight / 2; // Lidt ovenover hovedet
    
    // Hat brim (den brede del)
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(
        x + CELL_SIZE / 2,
        hatY + hatHeight / 2,
        hatWidth / 2,
        hatHeight / 4,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Hat top (crown)
    ctx.fillStyle = '#654321';
    ctx.beginPath();
    ctx.moveTo(hatX, hatY + hatHeight / 4);
    ctx.lineTo(hatX + hatWidth * 0.4, hatY - hatHeight / 4);
    ctx.lineTo(hatX + hatWidth * 0.6, hatY - hatHeight / 4);
    ctx.lineTo(hatX + hatWidth, hatY + hatHeight / 4);
    ctx.lineTo(hatX + hatWidth * 0.6, hatY + hatHeight * 0.7);
    ctx.lineTo(hatX + hatWidth * 0.4, hatY + hatHeight * 0.7);
    ctx.closePath();
    ctx.fill();
    
    // Gul kant på brimmen
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(
        x + CELL_SIZE / 2,
        hatY + hatHeight / 2,
        hatWidth / 2 - 2,
        hatHeight / 4 - 1,
        0,
        0,
        Math.PI * 2
    );
    ctx.stroke();
}

function drawCacti() {
    for (const cactus of level1.cacti) {
        const x = cactus.x * CELL_SIZE;
        const y = cactus.y * CELL_SIZE;
        
        // Tegn kaktus stamme (hoveddel)
        ctx.fillStyle = COLORS.cactus;
        ctx.beginPath();
        ctx.moveTo(x + CELL_SIZE / 2, y + 5);
        ctx.lineTo(x + 15, y + CELL_SIZE - 5);
        ctx.lineTo(x + CELL_SIZE - 15, y + CELL_SIZE - 5);
        ctx.lineTo(x + CELL_SIZE / 2, y + 5);
        ctx.closePath();
        ctx.fill();
        
        // Tegn kant på stammen
        ctx.strokeStyle = '#1E3D25';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Tegn kaktus "arme" (3-4 pigge)
        ctx.fillStyle = '#2E8B57';
        
        // Venstre arm
        ctx.beginPath();
        ctx.moveTo(x + 10, y + CELL_SIZE / 2);
        ctx.lineTo(x + 5, y + CELL_SIZE / 3);
        ctx.lineTo(x, y + CELL_SIZE / 2);
        ctx.closePath();
        ctx.fill();
        
        // Højre arm
        ctx.beginPath();
        ctx.moveTo(x + CELL_SIZE - 10, y + CELL_SIZE / 2);
        ctx.lineTo(x + CELL_SIZE - 5, y + CELL_SIZE / 3);
        ctx.lineTo(x + CELL_SIZE, y + CELL_SIZE / 2);
        ctx.closePath();
        ctx.fill();
        
        // Top arm
        ctx.beginPath();
        ctx.moveTo(x + CELL_SIZE / 2, y + 10);
        ctx.lineTo(x + CELL_SIZE / 2 + 5, y + 5);
        ctx.lineTo(x + CELL_SIZE / 2, y + 15);
        ctx.closePath();
        ctx.fill();
        
        // Tegn mørkegrønne linjer for detaljer
        ctx.strokeStyle = '#006400';
        ctx.lineWidth = 1;
        
        // Vertikale linjer på stammen
        ctx.beginPath();
        ctx.moveTo(x + CELL_SIZE / 2, y + 10);
        ctx.lineTo(x + CELL_SIZE / 2, y + CELL_SIZE - 10);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + CELL_SIZE / 2 - 8, y + 15);
        ctx.lineTo(x + CELL_SIZE / 2 - 8, y + CELL_SIZE - 15);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(x + CELL_SIZE / 2 + 8, y + 15);
        ctx.lineTo(x + CELL_SIZE / 2 + 8, y + CELL_SIZE - 15);
        ctx.stroke();
    }
}

function drawGoldBar(x, y) {
    const centerX = x * CELL_SIZE + CELL_SIZE / 2;
    const centerY = y * CELL_SIZE + CELL_SIZE / 2;
    const size = CELL_SIZE - 4; // Større (26px diameter)
    
    // Tegn guldbarr som en gylden cirkel med gradient
    const gradient = ctx.createRadialGradient(
        centerX, centerY, size * 0.1,
        centerX, centerY, size * 0.5
    );
    gradient.addColorStop(0, '#FFD700'); // Lysegylden center
    gradient.addColorStop(0.5, '#FFBF00'); // Medium guld
    gradient.addColorStop(1, '#D4AF37');  // Mørkere guld kant
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Glanseffekt (stor hvid prik for synlighed)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(centerX - size * 0.25, centerY - size * 0.25, size * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Kant for definition (tyk og mørk)
    ctx.strokeStyle = '#5D4037';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
    ctx.stroke();
}

function drawScore() {
    // Tegn score bakgrund (lille plade)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(5, 5, 150, 40);
    
    // Tegn ramme
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.strokeRect(5, 5, 150, 40);
    
    // Tegn score tekst med skygge
    ctx.fillStyle = COLORS.text;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'left';
    
    // Skygge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText(`Score: ${score}`, 12, 32);
    
    // Tekst
    ctx.fillStyle = COLORS.text;
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// ============================================
// GAME STATES: MENU / GAME OVER / WIN
// ============================================

function drawMenu() {
    // Tegn baggrund
    ctx.fillStyle = COLORS.sepia;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Tegn subtil western-mønster i baggrunden
    drawMenuBackground();
    
    // Tegn titel med western-style
    ctx.fillStyle = '#FFD700'; // Guld
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    
    // Skygge effekt
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText('SLANGETÆMMER', CANVAS_SIZE / 2 + 3, CANVAS_SIZE / 2 - 40 + 3);
    
    ctx.fillStyle = '#8B4513';
    ctx.fillText('SLANGETÆMMER', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 40);
    
    // Tegn undertekst
    ctx.font = '24px Arial';
    ctx.fillStyle = COLORS.text;
    
    // Skygge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillText('Tryk SPACE for at starte', CANVAS_SIZE / 2 + 2, CANVAS_SIZE / 2 + 30 + 2);
    ctx.fillText('Styr med piletaster', CANVAS_SIZE / 2 + 2, CANVAS_SIZE / 2 + 70 + 2);
    
    ctx.fillStyle = COLORS.text;
    ctx.fillText('Tryk SPACE for at starte', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);
    ctx.fillText('Styr med piletaster', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 70);
    
    // Tegn en lille sheriff-badge
    drawSheriffBadge(CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 120);
}

function drawMenuBackground() {
    // Tegn nogle subtile western-elementer (træplanker)
    ctx.strokeStyle = 'rgba(139, 69, 19, 0.15)';
    ctx.lineWidth = 1;
    
    // Horisontale linjer (som træplanker)
    for (let i = 1; i < GRID_SIZE; i += 3) {
        const y = i * CELL_SIZE;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_SIZE, y);
        ctx.stroke();
    }
    
    // Lodrette linjer
    for (let i = 1; i < GRID_SIZE; i += 4) {
        const x = i * CELL_SIZE;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_SIZE);
        ctx.stroke();
    }
}

function drawSheriffBadge(x, y) {
    // Tegn en lille sheriff-badge (stjerne)
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    
    const size = 20;
    const centerX = x;
    const centerY = y;
    
    // Tegn en 5-takket stjerne
    for (let i = 0; i < 5; i++) {
        const angle1 = (i * 4 * Math.PI / 5) - Math.PI / 2;
        const angle2 = ((i + 1) * 4 * Math.PI / 5) - Math.PI / 2;
        
        const x1 = centerX + Math.cos(angle1) * size;
        const y1 = centerY + Math.sin(angle1) * size;
        const x2 = centerX + Math.cos(angle2) * size * 0.4;
        const y2 = centerY + Math.sin(angle2) * size * 0.4;
        
        if (i === 0) {
            ctx.moveTo(x1, y1);
        }
        ctx.lineTo(x2, y2);
        ctx.lineTo(x1, y1);
    }
    
    ctx.closePath();
    ctx.fill();
    
    // Tegn kant
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawGameOver() {
    // Tegn baggrund
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Tegn tekst
    ctx.fillStyle = '#FF0000';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 50);
    
    ctx.fillStyle = COLORS.text;
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.fillText('Tryk R for at prøve igen', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 60);
}

function drawWin() {
    // Tegn baggrund
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Tegn tekst
    ctx.fillStyle = '#FFD700';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('DU VANDT!', CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 50);
    
    ctx.fillStyle = COLORS.text;
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    ctx.fillText('Tryk SPACE for at fortsætte', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 60);
}

// ============================================
// INPUT HÅNDTERING
// ============================================

function handleInput(e) {
    switch (gameState) {
        case GAME_STATES.MENU:
            if (e.code === 'Space') {
                resetGame();
                gameState = GAME_STATES.PLAYING;
            }
            break;
            
        case GAME_STATES.PLAYING:
            // Piletaster - buffer retningen
            switch (e.code) {
                case 'ArrowUp':
                    if (snake.direction !== 'DOWN') snake.nextDirection = 'UP';
                    break;
                case 'ArrowDown':
                    if (snake.direction !== 'UP') snake.nextDirection = 'DOWN';
                    break;
                case 'ArrowLeft':
                    if (snake.direction !== 'RIGHT') snake.nextDirection = 'LEFT';
                    break;
                case 'ArrowRight':
                    if (snake.direction !== 'LEFT') snake.nextDirection = 'RIGHT';
                    break;
            }
            break;
            
        case GAME_STATES.GAME_OVER:
            if (e.code === 'KeyR') {
                resetGame();
                gameState = GAME_STATES.PLAYING;
            }
            break;
            
        case GAME_STATES.WIN:
            if (e.code === 'Space') {
                resetGame();
                gameState = GAME_STATES.MENU;
            }
            break;
    }
}

function resetGame() {
    snake = {
        body: [{ x: 10, y: 10 }],
        direction: 'RIGHT',
        nextDirection: 'RIGHT'
    };
    score = 0;
    
    // Reset guldbarrer
    level1.goldBars = [
        { x: 8, y: 1 },
        { x: 5, y: 5 },
        { x: 15, y: 5 },
        { x: 3, y: 10 },
        { x: 17, y: 10 },
        { x: 10, y: 15 }
    ];
    spawnGoldBar();
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('keydown', handleInput);

// ============================================
// START SPIL
// ============================================

init();
