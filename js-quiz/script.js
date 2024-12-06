// Quiz Data
var questions = [
    {
        question: "What does JavaScript stand for?",
        options: ["Java Syntax", "Just Some Basic Text", "Java Standard", "None of the above"],
        correctAnswer: 3
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "Oracle"],
        correctAnswer: 1
    },
    {
        question: "Which of the following is a correct way to declare a variable in JavaScript?",
        options: ["var x;", "let x;", "const x;", "All of the above"],
        correctAnswer: 3
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["//", "#", "/*", "<!--"],
        correctAnswer: 0
    },
    {
        question: "Which of these is a correct JavaScript array?",
        options: ["[1, 2, 3]", "1, 2, 3", "{1, 2, 3}", "(1, 2, 3)"],
        correctAnswer: 0
    },
    {
        question: "What does the 'push()' method do in JavaScript?",
        options: ["Adds an item to the end of the array", "Removes an item from the end of the array", "Adds an item to the start of the array", "Removes an item from the start of the array"],
        correctAnswer: 0
    },
    {
        question: "Which method is used to remove the last element of an array?",
        options: ["pop()", "shift()", "unshift()", "slice()"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Laravel", "Angular", "Both React and Angular"],
        correctAnswer: 3
    },
    {
        question: "What is the output of 'console.log(2 + '2')' in JavaScript?",
        options: ["'22'", "4", "NaN", "undefined"],
        correctAnswer: 0
    },
    {
        question: "Which JavaScript function is used to convert a string to an integer?",
        options: ["parseInt()", "toInt()", "convert()", "parse()"],
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
