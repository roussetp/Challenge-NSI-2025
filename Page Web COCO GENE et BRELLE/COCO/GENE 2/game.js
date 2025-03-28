// Initialisation du jeu
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const timerElement = document.getElementById('timer');
const speedElement = document.getElementById('speed');
const gameOverElement = document.getElementById('game-over');
const finalTimeElement = document.getElementById('final-time');
let timer = 0;
let speed = 0;
let isGameOver = false;
let boat = { x: 50, y: canvas.height / 2, width: 60, height: 30, speed: 5 };

// Dimensions du canvas
canvas.width = 800;
canvas.height = 400;

// Obstacles
let obstacles = [];

// Mise à jour du temps et de la vitesse
function updateGameStats() {
  timer += 1;
  timerElement.textContent = timer;
  speed = Math.floor(boat.speed * 10);
  speedElement.textContent = speed;
}

// Fonction pour dessiner le bateau
function drawBoat() {
  ctx.fillStyle = '#FF4500'; // Couleur du bateau (orange)
  ctx.fillRect(boat.x, boat.y, boat.width, boat.height);
}

// Fonction pour dessiner les obstacles
function drawObstacles() {
  ctx.fillStyle = '#228B22'; // Couleur des obstacles (vert)
  obstacles.forEach(obstacle => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

// Générer des obstacles
function generateObstacle() {
  const obstacleHeight = Math.random() * 50 + 30;
  const obstacleWidth = 30;
  const obstacleY = Math.random() * (canvas.height - obstacleHeight);
  obstacles.push({ x: canvas.width, y: obstacleY, width: obstacleWidth, height: obstacleHeight });
}

// Détecter les collisions
function detectCollisions() {
  for (let i = 0; i < obstacles.length; i++) {
    if (
      boat.x + boat.width > obstacles[i].x &&
      boat.x < obstacles[i].x + obstacles[i].width &&
      boat.y + boat.height > obstacles[i].y &&
      boat.y < obstacles[i].y + obstacles[i].height
    ) {
      gameOver();
      return true;
    }
  }
  return false;
}

// Mettre à jour la position du bateau et des obstacles
function updateGame() {
  if (isGameOver) return;

  // Effacer le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mettre à jour le bateau et obstacles
  obstacles.forEach(obstacle => {
    obstacle.x -= 2; // Vitesse des obstacles
  });

  // Supprimer les obstacles qui sont sortis de l'écran
  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

  // Générer des obstacles
  if (Math.random() < 0.02) {
    generateObstacle();
  }

  // Dessiner bateau et obstacles
  drawBoat();
  drawObstacles();

  // Vérifier les collisions
  if (detectCollisions()) return;

  // Mettre à jour les stats
  updateGameStats();

  // Redemander l'animation
  requestAnimationFrame(updateGame);
}

// Démarrer la partie
function startGame() {
  timer = 0;
  speed = 0;
  boat.y = canvas.height / 2;
  obstacles = [];
  isGameOver = false;
  gameOverElement.classList.add('hidden');
  updateGame();
}

// Fin de la partie
function gameOver() {
  isGameOver = true;
  finalTimeElement.textContent = timer;
  gameOverElement.classList.remove('hidden');
}

// Rejouer
function restartGame() {
  startGame();
}

// Contrôles du jeu
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && boat.y > 0) {
    boat.y -= 10; // Monter
  } else if (e.key === 'ArrowDown' && boat.y + boat.height < canvas.height) {
    boat.y += 10; // Descendre
  }
});

// Lancer le jeu
startGame();
