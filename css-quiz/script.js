// Quiz Data
const questions = [
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: 0
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["&lt;style&gt;", "&lt;css&gt;", "&lt;script&gt;", "&lt;link&gt;"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is the correct syntax for linking an external CSS file?",
        options: ["&lt;link rel='stylesheet' href='styles.css'&gt;", "&lt;style src='styles.css'&gt;", "&lt;css href='styles.css'&gt;", "&lt;stylesheet href='styles.css'&gt;"],
        correctAnswer: 0
    },
    {
        question: "Which property is used to change the background color in CSS?",
        options: ["bgcolor", "background-color", "color", "background"],
        correctAnswer: 1
    },
    {
        question: "Which of the following properties is used to change the font size?",
        options: ["font-size", "text-size", "font-style", "text-font"],
        correctAnswer: 0
    },
    {
        question: "What is the default value of the 'position' property in CSS?",
        options: ["absolute", "relative", "static", "fixed"],
        correctAnswer: 2
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-weight", "font-style"],
        correctAnswer: 0
    },
    {
        question: "How do you make a list in HTML display without bullet points?",
        options: ["list-style-type: none;", "list-style: none;", "list-type: none;", "none: list-style;"],
        correctAnswer: 1
    },
    {
        question: "How do you center a block element in CSS?",
        options: ["margin: 0 auto;", "text-align: center;", "padding: 0 auto;", "align: center;"],
        correctAnswer: 0
    },
    {
        question: "Which property is used to set the space between the lines of text in CSS?",
        options: ["line-height", "letter-spacing", "text-spacing", "line-spacing"],
        correctAnswer: 0
    }
];


let timeLeft = 60;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timerInterval;

// DOM Elements
const timerElement = document.getElementById('timer');
const progressBar = document.getElementById('timer-progress');
const questionContainer = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const questionNumberElement = document.getElementById('question-number');

// Initialize Quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    displayQuestion();
}

// Start Timer
function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        progressBar.style.width = `${(timeLeft / 60) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz('timeUp');
        }
    }, 1000);
}

// Display Question
function displayQuestion() {
    const questionData = questions[currentQuestionIndex];
    questionContainer.textContent = questionData.question;
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, index) => {
        const optionElement = document.createElement('li');
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}"> ${option}
        `;
        optionsContainer.appendChild(optionElement);
    });
    questionNumberElement.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    startTimer();
}

// Handle Next Question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption && parseInt(selectedOption.value) === questions[currentQuestionIndex].correctAnswer) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz('completed');
    }
}

// End Quiz
function endQuiz(status) {
    clearInterval(timerInterval);

    let scorePercentage = ((correctAnswers / questions.length) * 100).toFixed(2);
    if (status === 'timeUp') {
        Swal.fire({
            title: "Time's Up!",
            text: `Your time is up. You answered ${correctAnswers} out of ${questions.length} questions correctly.`,
            icon: 'error',
            confirmButtonText: 'OK',
        }).then(() => {
            showResult(scorePercentage);
        });
    } else if (status === 'completed') {
        Swal.fire({
            title: 'Quiz Completed!',
            // text: `Your score is ${correctAnswers}/${questions.length} (${scorePercentage}%).`,
            icon: 'success',
            confirmButtonText: 'View Result',
        }).then(() => {
            showResult(scorePercentage);
        });
    }
}

// Show Result with Score and Percentage
function showResult(scorePercentage) {
    Swal.fire({
        title: 'Quiz Results',
        text: `You scored ${correctAnswers} out of ${questions.length} (${scorePercentage}%).`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Restart Quiz',
        cancelButtonText: 'Go to Main Page',
    }).then((result) => {
        if (result.isConfirmed) {
            restartQuiz();
        } else {
            window.location.href = '../home.html';  // Redirect to the main page
        }
    });
}

// Restart Quiz
function restartQuiz() {
    initializeQuiz();
    startTimer();
}

// Initialize Quiz on Page Load
initializeQuiz();
