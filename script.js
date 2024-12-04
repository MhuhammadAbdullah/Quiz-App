// Sign Up Form Submission
var signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Save user data in localStorage
        localStorage.setItem('user', JSON.stringify({ username, email, password }));

        // SweetAlert for successful sign-up
        Swal.fire({
            icon: 'success',
            title: 'Sign up successful!',
            text: 'You can now log in.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'login.html'; // Redirect to login page
        });
    });
}
// Toggle Password Visibility for Sign Up Form
var togglePasswordSignup = document.getElementById('toggle-password');
if (togglePasswordSignup) {
    togglePasswordSignup.addEventListener('click', function () {
        var passwordInput = document.getElementById('signup-password');
        var icon = this.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
}

// Log In Form Submission
var loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var username = document.getElementById('login-username').value;
        var password = document.getElementById('login-password').value;

        // Retrieve user data from localStorage
        var user = JSON.parse(localStorage.getItem('user'));

        // Check credentials
        if (user && user.username === username && user.password === password) {
            // SweetAlert for successful login
            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                text: 'Welcome back!',
                confirmButtonText: 'Proceed'
            }).then(() => {
                localStorage.setItem('loggedInUser', username); // Save logged-in user
                window.location.href = 'home.html'; // Redirect to home page
            });
        } else {
            // SweetAlert for invalid credentials
            Swal.fire({
                icon: 'error',
                title: 'Invalid credentials',
                text: 'Please check your username and password.',
                confirmButtonText: 'Try Again'
            });
        }
    });
}
// Toggle Password Visibility for Login Form
var togglePasswordLogin = document.getElementById('toggle-password-login');
if (togglePasswordLogin) {
    togglePasswordLogin.addEventListener('click', function () {
        var passwordInput = document.getElementById('login-password');
        var icon = this.querySelector('i');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
}


// Home Page: Redirect if user is not logged in
if (window.location.pathname.includes('home.html')) {
    var user = localStorage.getItem('loggedInUser');
    if (!user) {
        alert('Please log in to access the home page.');
        window.location.href = 'login.html'; // Redirect to login page
    }
}

// Start Quiz Function (Topic-based redirection)
function startQuiz(topic) {
    if (topic === 'html') {
        window.location.href = 'html-quiz.html'; // Redirect to HTML quiz page
    } else if (topic === 'css') {
        window.location.href = 'css-quiz.html'; // Redirect to CSS quiz page
    } else if (topic === 'javascript') {
        window.location.href = 'javascript-quiz.html'; // Redirect to JavaScript quiz page
    }
}
