const questions = [
    {
        question: "Which is the largest animal in the world ?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "Which is the smallest country in the world ?",
        answer: [
            { text: "Varican City", correct: true },
            { text: "Bhutan", correct: false },
            { text: "Nepal", correct: false },
            { text: "Shri Lanka", correct: false },
        ]
    },
    {
        question: "Which is the largest desert in the world ?",
        answer: [
            { text: "Kalahari", correct: false },
            { text: "Gobi", correct: false },
            { text: "Sahara", correct: false },
            { text: "Antarctica", correct: true },
        ]
    },
    {
        question: "Which is the smallest continent in the world ?",
        answer: [
            { text: "Asia", correct: false },
            { text: "Australia", correct: true },
            { text: "Antarctica", correct: false },
            { text: "Africa", correct: false },
        ]
    },
    {
        question: "Which is the National Club of India ?",
        answer: [
            { text: "Mohun Bagan", correct: true },
            { text: "Mumbai City FC", correct: false },
            { text: "Kerala Blaster", correct: false },
            { text: "Bengaluru FC", correct: false },
        ]
    }
]

const questionName = document.getElementById("question");
const answerButtons = document.getElementById("ansr-bttns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionName.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach((answer) => {
        const ansrBttn = document.createElement("button");
        ansrBttn.innerHTML = answer.text;
        ansrBttn.classList.add("btn");
        answerButtons.appendChild(ansrBttn);

        if(answer.correct) {
            ansrBttn.dataset.correct = answer.correct;
        }

        ansrBttn.addEventListener("click", selectAnswer);
    })
}

function selectAnswer(e) {
    const selectButton = e.target;
    const isCorrect = selectButton.dataset.correct === "true";
    if(isCorrect) {
        selectButton.classList.add("correct");
        score++;
    }
    else {
        selectButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function resetState() {
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();
    questionName.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();