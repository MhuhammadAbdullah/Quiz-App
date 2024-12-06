// Switch between forms
var showLogin = document.getElementById('show-login');
var showSignup = document.getElementById('show-signup');
var signupFormContainer = document.getElementById('signup-form-container');
var loginFormContainer = document.getElementById('login-form-container');

showLogin.addEventListener('click', () => {
    signupFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
});

showSignup.addEventListener('click', () => {
    loginFormContainer.style.display = 'none';
    signupFormContainer.style.display = 'block';
});

// Sign Up Form Submission
var signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('signup-username').value;
    var email = document.getElementById('signup-email').value;
    var password = document.getElementById('signup-password').value;

    // Save user details in localStorage
    localStorage.setItem('user', JSON.stringify({ username, email, password }));

    Swal.fire({
        icon: 'success',
        title: 'Sign up successful!',
        text: 'You can now log in.',
        confirmButtonText: 'OK'
    }).then(() => {
        signupForm.reset();
        showLogin.click();
    });
});

// Toggle Password Visibility for Sign Up
document.getElementById('toggle-password-signup').addEventListener('click', function () {
    var passwordInput = document.getElementById('signup-password');
    var icon = this.querySelector('i');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');
});

// Log In Form Submission
var loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;

    // Retrieve user details from localStorage
    var user = JSON.parse(localStorage.getItem('user'));

    if (user && user.username === username && user.password === password) {
        Swal.fire({
            icon: 'success',
            title: 'Login successful!',
            text: 'Welcome back!',
            confirmButtonText: 'Proceed'
        }).then(() => {
            localStorage.setItem('loggedInUser', username); // Optional: Store logged-in user info
            window.location.href = 'home/home.html'; // Redirect to home.html in "home" folder
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid credentials',
            text: 'Please check your username and password.',
            confirmButtonText: 'Try Again'
        });
    }
});

// Toggle Password Visibility for Login
document.getElementById('toggle-password-login').addEventListener('click', function () {
    var passwordInput = document.getElementById('login-password');
    var icon = this.querySelector('i');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');
});