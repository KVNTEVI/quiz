// Récupérer mes 3 blocks div HTML (le header, la div questions et la div result)
let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");

// Etablir la fonction Quiz permettant d'ajouter des questions et de voir combien de bonnes réponse le user a
function Quiz(){
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    // Ajouts de questions
    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    // Fonction servant à passer à la question suivante s'il y en a une, sinon ça affiche le résultat final 
    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";
        }
    }
}


// Fonction Question permettant de créer les questions avec le titre, les réponses et la réponse correcte
function Question(title, answers, correctAnswers) {
    this.title = title,
    this.answers = answers,
    this.correctAnswers = correctAnswers,

    // Mise en place et structuration du HTML et CSS pour mes questions
    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        // Le append sert à afficher le html (il existe le after et le prepend si on veut afficher au-dessus ou en-dessous)
        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        // Boucle en ForEach pour placer à chaque fois un <li> pour chaque réponse
        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        // Fonction pour voir à combien de question on est sur le total de questions présents
        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => { 
        let answerSelect = e.target;
        if (this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");
            quiz.nbrCorrects++;
        } else {
            answerSelect.classList.add("answersWrong");
            let RightAnswers = this.correctAnswers.map(index => document.getElementById(index));
            RightAnswers.forEach(RightAnswer => {
                RightAnswer.classList.add("answersCorrect");
            });
        }

        // Vérifiez si toutes les bonnes réponses ont été sélectionnées
        const allCorrectAnswersSelected = this.correctAnswers.every(index => {
            return document.getElementById(index).classList.contains("answersCorrect");
        });

        // Si toutes les bonnes réponses ont été sélectionnées, passez à la question suivante
        if (allCorrectAnswersSelected) {
            setTimeout(function() {
                questions_screen.textContent = '';
                quiz.indexCurrentQuestion++;
                quiz.displayCurrentQuestion();
            }, 1100);
        }
    }

    // Si la réponse choisit par le user est égale à la réponse correcte retourner True sinon False
    this.isCorrectAnswer = function(answerUser) {
        return this.correctAnswers.includes(parseInt(answerUser)); // Vérifie si la réponse est dans les réponses correctes
    }
};


// On va récupérer notre fonction Quiz pour implémenter ses données dans ses arguments 
// Partie Création des mes données de Questions :
let quiz = new Quiz();

let question1 = new Question("Qu'est-ce que le Big Data ?", ["Un système d'exploitation", " Un volume massif de données structurées ou non structurées", "Un langage de programmation", "Un type de virus informatique"], [2]);
quiz.addQuestion(question1);

let question2 = new Question("Quel terme désigne l'inégalité d'accès aux technologies numériques ?", ["Blockchain", "Fracture numérique", "Phishing"], [2]);
quiz.addQuestion(question2);

let question3 = new Question("Qu'est-ce qu'un cookie sur le web ?", ["Un virus", "Un pare-feu", "Un fichier stockant des informations sur la navigation d'un utilisateur"], [3]);
quiz.addQuestion(question3);

let question4 = new Question("Le RGPD (Règlement Général sur la Protection des Données) concerne :", ["La vitesse des connexions internet", "La protection des données personnelles dans l'UE", "La création de logiciels libres"], [2]);
quiz.addQuestion(question4);

let question5 = new Question("Qu'est-ce qu'une startup ?", ["Une multinationale établie", "Un logiciel open-source", "Une jeune entreprise innovante à fort potentiel de croissance"], [3]);
quiz.addQuestion(question5);

let question6 = new Question("Quel est l'objectif principal du design thinking ?", ["Optimiser les bases de données", " Sécuriser les réseaux", "Résoudre des problèmes de manière créative et centrée sur l'utilisateur"], [3]);
quiz.addQuestion(question6);

let question7 = new Question("Quelle technologie est associée à la décentralisation des transactions ?", [" Blockchain", "HTML", "CSS"], [1]);
quiz.addQuestion(question7);

let question8 = new Question("L'innovation disruptive désigne :", ["Une innovation qui révolutionne un marché en créant un nouveau modèle", "Une amélioration progressive d'un produit existant", "Une méthode de codage"], [1]);
quiz.addQuestion(question8);

let question9 = new Question("Qu'est-ce qu'une attaque par phishing ?", ["Un piratage de réseau Wi-Fi", "Un virus propagé par clé USB", " Une tentative de tromper l'utilisateur pour voler des données sensibles"], [3]);
quiz.addQuestion(question9);

let question10 = new Question("Quel outil permet de chiffrer les communications sur internet ?", [" HTTP", " HTTPS (SSL/TLS)", "HTML"], [2]);
quiz.addQuestion(question10);

let question11 = new Question("Un ransomware est :", ["Un antivirus", "Un logiciel malveillant qui chiffre les données et demande une rançon", "Un outil de sauvegarde"], [2]);
quiz.addQuestion(question11);

let question12 = new Question("La double authentification (2FA) sert à :", ["Renforcer la sécurité en ajoutant une étape de vérification", "Accélérer la connexion internet", "Crypter les e-mails"], [1]);
quiz.addQuestion(question12);

let question13 = new Question("Quel langage est utilisé pour structurer une page web ?", ["HTML", "Python", "SQL"], [1]);
quiz.addQuestion(question13);

let question14 = new Question("À quoi sert le CSS ?", ["Mettre en forme (style) une page web", "Programmer des fonctionnalités interactives", "Gérer des bases de données"], [1]);
quiz.addQuestion(question14);

let question15 = new Question("Qu'est-ce qu'une API (Application Programming Interface) ?", ["Un système d'exploitation", "Une interface permettant à des logiciels de communiquer entre eux", "Un langage de programmation"], [2]);
quiz.addQuestion(question15);

let question16 = new Question("Quel framework est souvent utilisé pour développer des applications web dynamiques ?", ["React.js ou Angular", "Photoshop", "WordPress"], [1]);
quiz.addQuestion(question16);

let question17 = new Question("Le Dark Web désigne :", ["Un mode d'affichage nocturne", " Une partie du web non indexée, souvent associée à des activités illégales", "Un langage de programmation"], [2]);
quiz.addQuestion(question17);

let question18 = new Question("L'IA (Intelligence Artificielle) repose sur :", ["Le stockage cloud", "L'apprentissage automatique (machine learning) et les algorithmes", "Les requêtes HTTP"], [2]);
quiz.addQuestion(question18);

let question19 = new Question("Un bug en informatique est :", ["Un antivirus", "Une erreur dans un programme causant un dysfonctionnement", "Un composant matériel"], [2]);
quiz.addQuestion(question19);

let question20 = new Question("Quel protocole est utilisé pour envoyer des e-mails ?", ["SMTP", "HTTP", "TCP/IP"], [1]);
quiz.addQuestion(question20);


// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}


// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);

