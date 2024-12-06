// Function to start the quiz
function startQuiz(topic) {
    // Show alert to confirm quiz start
    Swal.fire({
        title: `Starting ${topic} Quiz`,
        text: `You are now starting the ${topic} quiz.`,
        icon: 'info',
        confirmButtonText: 'Start'
    }).then(() => {
        // Redirect to the quiz page based on the selected topic
        var url = '';
        switch (topic) {
            case 'HTML':
                url = '/html-quiz/html-page.html';  // Replace with actual URL for HTML quiz
                break;
            case 'CSS':
                url = '/css-quiz/css-page.html';   // Replace with actual URL for CSS quiz
                break;
            case 'JavaScript':
                url = '/js-quiz/js-page.html';    // Replace with actual URL for JavaScript quiz
                break;
            default:
                Swal.fire({
                    title: 'Error',
                    text: 'Quiz not found!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
        }
        // Navigate to the quiz page
        window.location.href = url;
    });
}

// Add functionality for footer links
document.querySelectorAll('.footer-section.links a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Coming Soon!',
            text: `The ${event.target.innerText} section is under construction.`,
            icon: 'info',
            confirmButtonText: 'OK'
        });
    });
});

// Handle social media icons click
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (event) => {
        event.preventDefault();
        Swal.fire({
            title: 'Follow Us',
            text: 'Social media links will be activated soon.',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    });
});
