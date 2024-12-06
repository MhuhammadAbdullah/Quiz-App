// Quiz Data
var questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks and Text Markup Language", "None of the above"],
        correctAnswer: 0
    },
    {
        question: "Which HTML element is used to display a hyperlink?",
        options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;url&gt;"],
        correctAnswer: 1
    },
    {
        question: "Which of the following HTML tags is used to create a form?",
        options: ["&lt;form&gt;", "&lt;input&gt;", "&lt;textarea&gt;", "&lt;button&gt;"],
        correctAnswer: 0
    },
    {
        question: "What is the correct HTML element for inserting an image?",
        options: ["&lt;image&gt;", "&lt;img&gt;", "&lt;src&gt;", "&lt;picture&gt;"],
        correctAnswer: 1
    },
    {
        question: "Which attribute is used to provide an alternative text for an image?",
        options: ["alt", "title", "desc", "src"],
        correctAnswer: 0
    },
    {
        question: "What is the default value of the 'type' attribute for the &lt;input&gt; tag?",
        options: ["text", "password", "button", "checkbox"],
        correctAnswer: 0
    },
    {
        question: "Which HTML tag is used to define the most important heading?",
        options: ["&lt;h1&gt;", "&lt;h2&gt;", "&lt;h3&gt;", "&lt;h6&gt;"],
        correctAnswer: 0
    },
    {
        question: "What does the &lt;br&gt; tag do in HTML?",
        options: ["Starts a new paragraph", "Inserts a line break", "Creates a new heading", "Inserts an image"],
        correctAnswer: 1
    },
    {
        question: "Which HTML element is used to define an unordered list?",
        options: ["&lt;ol&gt;", "&lt;ul&gt;", "&lt;list&gt;", "&lt;li&gt;"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is the correct syntax for including an external CSS file?",
        options: ["&lt;link rel='stylesheet' href='styles.css'&gt;", "&lt;style src='styles.css'&gt;", "&lt;css link='styles.css'&gt;", "&lt;stylesheet href='styles.css'&gt;"],
        correctAnswer: 0
    }
];


var timeLeft = 60;
var currentQuestionIndex = 0;
var correctAnswers = 0;
var timerInterval;

// DOM Elements
var timerElement = document.getElementById('timer');
var progressBar = document.getElementById('timer-progress');
var questionContainer = document.querySelector('.question');
var optionsContainer = document.querySelector('.options');
var questionNumberElement = document.getElementById('question-number');

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
    var questionData = questions[currentQuestionIndex];
    questionContainer.textContent = questionData.question;
    optionsContainer.innerHTML = '';
    questionData.options.forEach((option, index) => {
        var optionElement = document.createElement('li');
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
    var selectedOption = document.querySelector('input[name="option"]:checked');
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

    var scorePercentage = ((correctAnswers / questions.length) * 100).toFixed(2);
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
            window.location.href = '../home/home.html';  // Redirect to the main page
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
