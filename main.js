// dening an array of questions (? Is there a better way? It's very annoying if defining like this!)
const questions = [
    {
        question: "Mougey Fine Gifts is known for its large range of ___ goods",
        answers: [
            { text: "regional", correct: true },
            { text: "regionally", correct: false },
            { text: "region", correct: false },
            { text: "regions", correct: false },
        ]
    },
    {
        question: "Income level are rising in the ___ and surrounding areas.",
        answers: [
            { text: "family", correct: false },
            { text: "world", correct: false },
            { text: "company", correct: false },
            { text: "city", correct: true },
        ]
    },
    {
        question: "Since we had a recent rate change, expect ___ next electricity bill to be slightly lower.",
        answers: [
            { text: "you", correct: false },
            { text: "yours", correct: false },
            { text: "yourself", correct: false },
            { text: "your", correct: true },
        ]
    },
    {
        question: "Hotel guests have a lovely view of the ocean ___ the south-facing windows.",
        answers: [
            { text: "up", correct: false },
            { text: "except", correct: false },
            { text: "onto", correct: false },
            { text: "through", correct: true },
        ]
    },
    {
        question: "Mr.KIm would like ___ a meeting about the Jasper account as soon as possible.",
        answers: [
            { text: "to arrange", correct: true },
            { text: "arranging", correct: false },
            { text: "having arranged", correct: false },
            { text: "arrangement", correct: false },
        ]
    },
    {
        question: "The factory is ___ located near the train station.",
        answers: [
            { text: "regularly", correct: false },
            { text: "conveniently", correct: true },
            { text: "brightly", correct: false },
            { text: "collectively", correct: false },
        ]
    },
    {
        question: "Because of transportation ___ due to winter weather, some conference participants may arrive late.",
        answers: [
            { text: "are delayed", correct: false },
            { text: "to delay", correct: false },
            { text: "delays", correct: true },
            { text: "had delayed", correct: false },
        ]
    },
    {
        question: "Proper maintenance of your heating equipment ensures that small issues can be fixed ___ they become big ones.",
        answers: [
            { text: "as a result", correct: false },
            { text: "in addition", correct: false },
            { text: "although", correct: false },
            { text: "before", correct: true },
        ]
    },
    {
        question: "The information on the Web site of Croyell Decorators is ___ organized.",
        answers: [
            { text: "clear", correct: false },
            { text: "clearing", correct: false },
            { text: "clearest", correct: false },
            { text: "clearly", correct: true },
        ]
    },
    {
        question: "The Copley Corporation is frequently ___ as a company that employs workers from all over the world.",
        answers: [
            { text: "recognized", correct: true },
            { text: "permitted", correct: false },
            { text: "prepared", correct: false },
            { text: "controlled", correct: false },
        ]
    }
];

// seting up variables and elements (question element, answer buttons, and a next button) to interact with the HTML document
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// initializing the quiz by resetting the question index and score
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next Question";
    showQuestion();
}

// displaying the first question or displays the current question and its answer choices
function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// clearing the previous question's state, hides the next button, and removes all answer buttons
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// selecAnswer function is called when the user selects an answer. It checks if the selected answer is correct -> updates the score, and applies visual feedback to the selected button. 
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Disabling all answer buttons to prevent multiple selections.
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// displaying the scores after users finishing the quiz
function showScore() {
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}

// showing the next question or displays the final score and allows the user to play again
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// event listeners are added to the "Next Question" button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// the quiz is started
startQuiz();
// displaying the first question with showQuestion().
showQuestion();
