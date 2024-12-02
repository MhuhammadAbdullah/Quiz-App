// Variable to Track User Authentication
let isAuthenticated = false;

// Open Modal Function
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

// Close Modal Function
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Show Login Modal
document.getElementById('loginBtn').addEventListener('click', function () {
    openModal('loginModal');
});

// Show Signup Modal
document.getElementById('signupBtn').addEventListener('click', function () {
    openModal('signupModal');
});

// Login Form Submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    isAuthenticated = true; // User is now logged in
    Swal.fire({
        title: 'Login Successful!',
        text: 'You are now logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
    closeModal('loginModal');
});

// Signup Form Submission
document.getElementById('signupForm').addEventListener('submit', function (event) {
    event.preventDefault();
    isAuthenticated = true; // User is signed up and logged in
    Swal.fire({
        title: 'Signup Successful!',
        text: 'You can now start the quiz.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
    closeModal('signupModal');
});

// Function to start the quiz
function startQuiz(topic) {
    if (!isAuthenticated) {
        Swal.fire({
            title: 'Please Sign Up',
            text: 'You need to sign up to start the quiz.',
            icon: 'warning',
            confirmButtonText: 'Sign Up',
        }).then(() => {
            openModal('signupModal');
        });
    } else {
        // Proceed to the quiz section
        Swal.fire({
            title: `Starting ${topic} Quiz`,
            text: `You are now starting the ${topic} quiz.`,
            icon: 'success',
            confirmButtonText: 'Start'
        }).then(() => {
            // Redirect to the quiz page for the selected topic
            let url = '';
            switch (topic) {
                case 'HTML':
                    url = '/html-quiz/html-page.html';  // Change the URL according to your file structure
                    break;
                case 'CSS':
                    url = 'css-quiz/css-page.html';   // Change the URL accordingly
                    break;
                case 'JavaScript':
                    url = '/js-quiz/js-page.html';  // Change the URL accordingly
                    break;
                default:
                    url = 'index.html';
            }
            window.location.href = url;  // Redirect to the quiz page
        });
    }
}

// Adding event listeners for quiz buttons (example)
document.getElementById('htmlQuizButton').addEventListener('click', function () {
    startQuiz('HTML');
});

document.getElementById('cssQuizButton').addEventListener('click', function () {
    startQuiz('CSS');
});

document.getElementById('jsQuizButton').addEventListener('click', function () {
    startQuiz('JavaScript');
});