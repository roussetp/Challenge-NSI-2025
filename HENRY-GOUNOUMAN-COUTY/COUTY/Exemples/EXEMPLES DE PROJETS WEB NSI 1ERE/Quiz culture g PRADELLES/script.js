// Sélection des éléments HTML
const startBtn = document.querySelector('.start-btn'); // Bouton de démarrage
const popupInfo = document.querySelector('.popup-info'); // Fenêtre contextuelle d'information
const exitBtn = document.querySelector('.exit-btn'); // Bouton de sortie
const main = document.querySelector('.main'); // Section principale
const continueBtn = document.querySelector('.continue-btn'); // Bouton de continuer
const quizSection = document.querySelector('.quiz-section'); // Section du quiz
const quizBox = document.querySelector('.quiz-box'); // Conteneur du quiz
const resultBox = document.querySelector('.result-box'); // Conteneur du résultat
const tryAgainBtn = document.querySelector('.tryAgain-btn'); // Bouton de recommencer
const goHomeBtn = document.querySelector('.goHome-btn'); // Bouton de retour à la page d'accueil

// Gestion des événements lors du clic sur les boutons
startBtn.onclick = () => {
    popupInfo.classList.add('active'); // Ajoute la classe 'active' à la fenêtre contextuelle d'information
    main.classList.add('active'); // Ajoute la classe 'active' à la section principale
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active'); // Supprime la classe 'active' de la fenêtre contextuelle d'information
    main.classList.remove('active'); // Supprime la classe 'active' de la section principale
}

continueBtn.onclick = () => {
    quizSection.classList.add('active'); // Ajoute la classe 'active' à la section du quiz
    popupInfo.classList.remove('active'); // Supprime la classe 'active' de la fenêtre contextuelle d'information
    main.classList.remove('active'); // Supprime la classe 'active' de la section principale
    quizBox.classList.add('active'); // Ajoute la classe 'active' au conteneur du quiz

    showQuestions(0); // Affiche la première question
    questionCounter(1); // Affiche le numéro de la première question
    headerScore(); // Affiche le score initial
}

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active'); // Ajoute la classe 'active' au conteneur du quiz
    nextBtn.classList.remove('active'); // Supprime la classe 'active' du bouton 'Suivant'
    resultBox.classList.remove('active'); // Supprime la classe 'active' du conteneur du résultat

    // Réinitialisation des compteurs et du score
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount); // Affiche la première question
    questionCounter(questionNumb); // Affiche le numéro de la première question

    headerScore(); // Réinitialise le score affiché
}

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active'); // Supprime la classe 'active' de la section du quiz
    nextBtn.classList.remove('active'); // Supprime la classe 'active' du bouton 'Suivant'
    resultBox.classList.remove('active'); // Supprime la classe 'active' du conteneur du résultat

    // Réinitialisation des compteurs et du score
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount); // Affiche la première question
    questionCounter(questionNumb); // Affiche le numéro de la première question
}

// Variables de suivi des questions, du numéro de question et du score
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn'); // Bouton 'Suivant'

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++; // Incrémente le compteur de questions
        showQuestions(questionCount); // Affiche la question suivante

        questionNumb++; // Incrémente le numéro de la question
        questionCounter(questionNumb); // Affiche le nouveau numéro de question

        nextBtn.classList.remove('active'); // Supprime la classe 'active' du bouton 'Suivant'
    } else {
        showResultBox(); // Affiche le résultat final lorsque toutes les questions ont été répondues
    }
}

const optionList = document.querySelector('.option-list'); // Liste des options de réponse

// Affiche les questions et les options à partir d'un tableau
function showQuestions(index) {
    const questionText = document.querySelector('.question-text'); // Élément HTML contenant le texte de la question
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`; // Affiche le texte de la question

    let optionTag = `<div class='option'><span>${questions[index].options[0]}</span></div>
        <div class='option'><span>${questions[index].options[1]}</span></div>
        <div class='option'><span>${questions[index].options[2]}</span></div>
        <div class='option'><span>${questions[index].options[3]}</span></div>`; // Génère les balises HTML pour les options de réponse

    optionList.innerHTML = optionTag; // Affiche les options de réponse dans la liste

    const option = document.querySelectorAll('.option'); // Sélectionne toutes les options de réponse
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)'); // Ajoute un gestionnaire d'événement aux options de réponse
    }
}

function optionSelected(answer) {
    let userAnswer = answer.textContent; // Récupère la réponse sélectionnée par l'utilisateur
    let correctAnswer = questions[questionCount].answer; // Récupère la réponse correcte pour la question actuelle
    let allOptions = optionList.children.length; // Nombre total d'options de réponse

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct'); // Ajoute la classe 'correct' à la réponse sélectionnée
        userScore += 1; // Incrémente le score de l'utilisateur
        headerScore(); // Met à jour le score affiché
    } else {
        answer.classList.add('incorrect'); // Ajoute la classe 'incorrect' à la réponse sélectionnée

        // Si la réponse est incorrecte, sélectionne automatiquement la réponse correcte
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct'); // Ajoute la classe 'correct' à la réponse correcte
            }
        }
    }

    // Désactive toutes les options de réponse une fois que l'utilisateur a sélectionné une réponse
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled'); // Ajoute la classe 'disabled' aux options de réponse
    }

    nextBtn.classList.add('active'); // Active le bouton 'Suivant'
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total'); // Élément HTML affichant le nombre total de questions
    questionTotal.textContent = `Question ${index} sur ${questions.length}`; // Affiche le numéro de la question actuelle et le nombre total de questions
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score'); // Élément HTML affichant le score
    headerScoreText.textContent = `Score : ${userScore} / ${questions.length}`; // Affiche le score actuel et le nombre total de questions
}

function showResultBox() {
    quizBox.classList.remove('active'); // Supprime la classe 'active' du conteneur du quiz
    resultBox.classList.add('active'); // Ajoute la classe 'active' au conteneur du résultat

    const scoreText = document.querySelector('.score-text'); // Élément HTML affichant le texte du score
    scoreText.textContent = `Votre score : ${userScore} sur ${questions.length}`; // Affiche le score final

    const circularProgress = document.querySelector('.circular-progress'); // Élément HTML de la progression circulaire
    const progressValue = document.querySelector('.progress-value'); // Élément HTML affichant la valeur de progression
    let progressStartValue = -1; // Valeur de départ de la progression
    let progressEndValue = (userScore / questions.length) * 100; // Valeur finale de la progression (pourcentage)
    let speed = 20; // Vitesse de la progression

    let progress = setInterval(() => {
        progressStartValue++; // Incrémente la valeur de progression

        progressValue.textContent = `${progressStartValue}%`; // Affiche la valeur de progression
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`; // Met à jour la progression circulaire

        if (progressStartValue == progressEndValue) {
            clearInterval(progress); // Arrête la progression une fois atteinte la valeur finale
        }
    }, speed);
}
