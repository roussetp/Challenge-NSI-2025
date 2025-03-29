// Liste des images disponibles pour la carte (images de Zelda avec différentes zones)
const images = [
    "Photo1.jpg",
    "Photo2.jpg",
    "Photo3.jpg" 
];

// Exemple de coordonnées pour des lieux spécifiques sur les cartes (en pixels)
const correctPositions = [
    { image: "Photo1.jpg", x: 940, y: 345.8 },
    { image: "Photo2.jpg", x: 1108, y: 414.8 },
    { image: "Photo3.jpg", x: 545, y: 145.8 }   
];

let score = 0;
let userPosition = { x: 0, y: 0 };
let correctPosition = null;
let mapImage = document.getElementById("map-container");
let submitButton = document.getElementById("submit");
let resultMessage = document.getElementById("result-message");
let scoreDisplay = document.getElementById("score");
let coordinatesDisplay = document.getElementById("coordinates");

// Fonction pour charger une image de manière aléatoire
function loadRandomMap() {
    // Sélectionner une image aléatoire de la liste
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];

    // Afficher l'image sélectionnée
    mapImage.src = selectedImage;

    // Trouver la position correcte pour cette image
    correctPosition = correctPositions.find(position => position.image === selectedImage);
}

// Gestion du clic sur la carte
mapImage.addEventListener("click", function (event) {
    const rect = mapImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    coordinatesDisplay.textContent = `Vous avez cliqué à X: ${x}, Y: ${y}`;
    userPosition = { x, y };
});

// Gestion du clic sur le bouton de soumission
submitButton.addEventListener("click", function () {
    // Vérification que l'utilisateur a cliqué sur la carte avant de soumettre
    if (userPosition.x === 0 && userPosition.y === 0) {
        resultMessage.textContent = "Veuillez d'abord cliquer sur la carte !";
        return;
    }

    if (userPosition === correctPositions) {
        resultMessage.textContent = "suivant!";
        return;
    }

    // Calcul de la distance entre la position correcte et celle de l'utilisateur
    const distance = Math.sqrt(
        Math.pow(userPosition.x - correctPosition.x, 2) + Math.pow(userPosition.y - correctPosition.y, 2)
    );

    // Calcul des points en fonction de la distance
    let points = Math.max(0, 50 - Math.round(distance / 5));
    score += points;

    resultMessage.textContent = `Vous avez obtenu ${points} points !`;
    scoreDisplay.textContent = `Score total : ${score} points`;
    
});

// Charger une image aléatoire au début
loadRandomMap();
