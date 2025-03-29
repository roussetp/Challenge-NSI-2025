// Types for better code organization
const ImageData = {
    image: '',
    x: 0,
    y: 0,
    description: ''
};

// Configuration du jeu
const GAME_CONFIG = {
    MAX_SCORE: 100,
    MAX_DISTANCE: 500, // Distance maximum en pixels
    NEXT_ROUND_DELAY: 3000, // Délai avant la prochaine manche en ms
    MARKER_SIZE: 10, // Taille des marqueurs en pixels
    ZOOM_INTENSITY: 1.5 // Intensité de l'effet de zoom
};

// Liste des images disponibles avec leurs coordonnées
const imageData = [
    {
        image: "Ghost1.jpg",
        x: 205,
        y: 278,
        description: "Un point remarquable du village"
    },
    {
        image: "Ghost2.jpg",
        x: 1766,
        y: 324,
        description: "Une zone mystérieuse"
    },
    {
        image: "Ghost3.jpg",
        x: 1468,
        y: 358,
        description: "Un endroit secret"
    },
    {
        image: "Ghost4.jpg",
        x: 1236, 
        y: 266,
        description: "Un endroit secret"
    },
    {
        image: "Ghost5.jpg",
        x:901,  
        y:423,
        description: "Un endroit secret"
    }
    
];

class GeoGame {
    constructor() {
        this.currentScore = 0;
        this.currentImage = null;
        this.userClick = null;
        this.usedImages = new Set();
        this.initializeElements();
        this.addEventListeners();
        this.loadRandomImage();
    }

    initializeElements() {
        this.mapContainer = document.getElementById('map-container');
        this.submitButton = document.getElementById('submit');
        this.resultMessage = document.getElementById('result-message');
        this.scoreDisplay = document.getElementById('score');
        this.coordinatesDisplay = document.getElementById('coordinates');
        this.fixedImage = document.querySelector('.image-fixe');
        this.backgroundImage = document.querySelector('.background-image');

        if (!this.mapContainer || !this.submitButton || !this.resultMessage ||
            !this.scoreDisplay || !this.coordinatesDisplay || !this.fixedImage ||
            !this.backgroundImage) {
            throw new Error('Impossible de trouver tous les éléments nécessaires');
        }

        // Style initial pour l'image de fond
        this.backgroundImage.style.transition = 'transform 0.3s ease-out';
        this.backgroundImage.style.width = '100%';
        this.backgroundImage.style.height = '100%';
        this.backgroundImage.style.objectFit = 'cover';
        this.backgroundImage.style.position = 'absolute';
        this.backgroundImage.style.top = '0';
        this.backgroundImage.style.left = '0';
    }

    addEventListeners() {
        this.mapContainer.addEventListener('click', this.handleMapClick.bind(this));
        this.mapContainer.addEventListener('mousemove', this.handleMapZoom.bind(this));
        this.mapContainer.addEventListener('mouseleave', this.resetZoom.bind(this));
        this.submitButton.addEventListener('click', this.handleSubmit.bind(this));
    }

    loadRandomImage() {
        // Réinitialiser la liste des images utilisées si toutes ont été utilisées
        if (this.usedImages.size >= imageData.length) {
            this.usedImages.clear();
        }

        // Sélectionner une image non utilisée
        let availableImages = imageData.filter(img => !this.usedImages.has(img.image));
        const randomIndex = Math.floor(Math.random() * availableImages.length);
        this.currentImage = availableImages[randomIndex];

        // Marquer l'image comme utilisée
        this.usedImages.add(this.currentImage.image);

        // Mettre à jour les deux images
        this.fixedImage.src = this.currentImage.image;

        if (this.usedImages.size === 3) {
            this.showLeavePopup();
        }
        // Au moment où l'utilisateur atteint le dernier niveau
        if (this.usedImages.size === 5) {
            this.showLeavePopup2();  // Affiche le popup et gère la redirection ou la continuité
        }
        this.resetInterface();
    }

    resetInterface() {
        this.resultMessage.textContent = '';
        this.coordinatesDisplay.textContent = 'Cliquez sur la carte pour choisir un emplacement.';
        this.userClick = null;
        this.submitButton.disabled = true;
        this.clearMarkers();
        this.resetZoom();
    }

    resetZoom() {
        this.backgroundImage.style.transform = 'scale(1)';
        this.backgroundImage.style.transformOrigin = '50% 50%';
    }

    clearMarkers() {
        const markers = this.mapContainer.querySelectorAll('.marker, .correct-marker');
        markers.forEach(marker => marker.remove());
    }

    createMarker(x, y, type = 'user') {
        const marker = document.createElement('div');
        marker.className = type === 'user' ? 'marker' : 'correct-marker';
        marker.style.cssText = `
            position: relative;
            left: ${x}px;
            top: ${y}px;
            width: ${GAME_CONFIG.MARKER_SIZE}px;
            height: ${GAME_CONFIG.MARKER_SIZE}px;
            background-color: ${type === 'user' ? 'red' : 'green'};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 0;


        `;
        this.mapContainer.appendChild(marker);
    }

    calculateDistance(point1, point2) {
        return Math.sqrt(
            Math.pow(point1.x - point2.x, 2) +
            Math.pow(point1.y - point2.y, 2)
        );
    }

    calculateScore(distance) {
        return Math.max(0, Math.round(
            GAME_CONFIG.MAX_SCORE * (1 - distance / GAME_CONFIG.MAX_DISTANCE)
        ));
    }

    handleMapClick(e) {
        const rect = this.mapContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.userClick = { x, y };
        this.coordinatesDisplay.textContent =
            `Position sélectionnée - X: ${Math.round(x)}, Y: ${Math.round(y)}`;
        this.submitButton.disabled = false;

        this.clearMarkers();
        this.createMarker(x, y, 'user');
    }

    handleMapZoom(e) {
      
    }

    handleSubmit() {
        if (!this.userClick || !this.currentImage) return;

        const distance = this.calculateDistance(
            this.userClick,
            { x: this.currentImage.x, y: this.currentImage.y }
        );
        const score = this.calculateScore(distance);
        this.currentScore += score;

        this.createMarker(this.currentImage.x, this.currentImage.y, 'correct');
        this.updateGameStatus(distance, score);

        // Désactiver la souris pendant la transition
        this.mapContainer.style.pointerEvents = 'none';

        setTimeout(() => {
            this.prepareNextRound();
            this.mapContainer.style.pointerEvents = 'auto';
        }, GAME_CONFIG.NEXT_ROUND_DELAY);
    }

    updateGameStatus(distance, score) {
        this.resultMessage.textContent =
            `Distance: ${Math.round(distance)} pixels. Vous avez gagné ${score} points!`;
        this.scoreDisplay.textContent = `Score : ${this.currentScore} points`;
        this.submitButton.disabled = true;
    }

    prepareNextRound() {
        this.clearMarkers();
        this.loadRandomImage();
    }

    showLeavePopup() {
        const userChoice = confirm("Vous avez atteint la Troisième niveau! Voulez-vous rester ou quitter?     (clickez sur OK pour rester et Annuler pour quitter");
        if (!userChoice) {
            window.location.href = "indexAcceuil.html"; // Replace with the page you want to redirect to
        }
    }
    showLeavePopup2() {
        const userChoice = confirm("Vous avez atteint le Dernier niveau");
        {
            window.location.href = "indexAcceuil.html"; // Replace with the page you want to redirect to
        }
    }
}

// Style CSS à ajouter
const style = document.createElement('style');
style.textContent = `
    #map-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 110%;
    }

    .background-image {
        transition: transform 0.5s ease-out;
        will-change: transform;
    }

    .image-fixe {
        border: 2px solid #333;
    }
`;
document.head.appendChild(style);

// Initialisation du jeu
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.game = new GeoGame();
    } catch (error) {
        console.error('Erreur lors de l\'initialisation du jeu:', error);
        document.body.innerHTML = 'Une erreur est survenue lors du chargement du jeu.';
    }
});