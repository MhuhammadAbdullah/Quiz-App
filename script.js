// // Sign Up Form Submission
// var signupForm = document.getElementById('signup-form');
// if (signupForm) {
//     signupForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         const username = document.getElementById('signup-username').value;
//         const email = document.getElementById('signup-email').value;
//         const password = document.getElementById('signup-password').value;

//         // Save user data in localStorage
//         localStorage.setItem('user', JSON.stringify({ username, email, password }));

//         // SweetAlert for successful sign-up
//         Swal.fire({
//             icon: 'success',
//             title: 'Sign up successful!',
//             text: 'You can now log in.',
//             confirmButtonText: 'OK'
//         }).then(() => {
//             window.location.href = 'login.html'; // Redirect to login page
//         });
//     });
// }
// // Toggle Password Visibility for Sign Up Form
// var togglePasswordSignup = document.getElementById('toggle-password');
// if (togglePasswordSignup) {
//     togglePasswordSignup.addEventListener('click', function () {
//         var passwordInput = document.getElementById('signup-password');
//         var icon = this.querySelector('i');
//         if (passwordInput.type === 'password') {
//             passwordInput.type = 'text';
//             icon.classList.replace('fa-eye', 'fa-eye-slash');
//         } else {
//             passwordInput.type = 'password';
//             icon.classList.replace('fa-eye-slash', 'fa-eye');
//         }
//     });
// }

// // Log In Form Submission
// var loginForm = document.getElementById('login-form');
// if (loginForm) {
//     loginForm.addEventListener('submit', function (event) {
//         event.preventDefault();
//         var username = document.getElementById('login-username').value;
//         var password = document.getElementById('login-password').value;

//         // Retrieve user data from localStorage
//         var user = JSON.parse(localStorage.getItem('user'));

//         // Check credentials
//         if (user && user.username === username && user.password === password) {
//             // SweetAlert for successful login
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Login successful!',
//                 text: 'Welcome back!',
//                 confirmButtonText: 'Proceed'
//             }).then(() => {
//                 localStorage.setItem('loggedInUser', username); // Save logged-in user
//                 window.location.href = 'home.html'; // Redirect to home page
//             });
//         } else {
//             // SweetAlert for invalid credentials
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Invalid credentials',
//                 text: 'Please check your username and password.',
//                 confirmButtonText: 'Try Again'
//             });
//         }
//     });
// }
// // Toggle Password Visibility for Login Form
// var togglePasswordLogin = document.getElementById('toggle-password-login');
// if (togglePasswordLogin) {
//     togglePasswordLogin.addEventListener('click', function () {
//         var passwordInput = document.getElementById('login-password');
//         var icon = this.querySelector('i');
//         if (passwordInput.type === 'password') {
//             passwordInput.type = 'text';
//             icon.classList.replace('fa-eye', 'fa-eye-slash');
//         } else {
//             passwordInput.type = 'password';
//             icon.classList.replace('fa-eye-slash', 'fa-eye');
//         }
//     });
// }
// Switch between forms
const showLogin = document.getElementById('show-login');
const showSignup = document.getElementById('show-signup');
const signupFormContainer = document.getElementById('signup-form-container');
const loginFormContainer = document.getElementById('login-form-container');

showLogin.addEventListener('click', () => {
    signupFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
});

showSignup.addEventListener('click', () => {
    loginFormContainer.style.display = 'none';
    signupFormContainer.style.display = 'block';
});

// Sign Up Form Submission
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

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
    const passwordInput = document.getElementById('signup-password');
    const icon = this.querySelector('i');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');
});

// Log In Form Submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Retrieve user details from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

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
    const passwordInput = document.getElementById('login-password');
    const icon = this.querySelector('i');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    icon.classList.toggle('fa-eye-slash');
    icon.classList.toggle('fa-eye');
});