// Register functionality
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    // Get values from the form inputs
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check if all required fields are filled
    if (name && email && password && confirmPassword) {
        // Check if the entered passwords match
        if (password === confirmPassword) {
            // Hash password for security (using base64 encoding as placeholder)
            const hashedPassword = btoa(password); // Not a secure method in real applications

            // Create a user object and store it in localStorage
            const user = { name, email, password: hashedPassword };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Registration successful! You can now log in.");
            // Redirect to the login page after registration
            window.location.href = "login.html"; // Navigate to login page
        } else {
            alert("Passwords do not match. Please try again."); // Show error message if passwords don't match
        }
    } else {
        alert("Please fill all fields correctly."); // Show error message if any field is missing
    }
});

// Login functionality
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission
    // Get login form values
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // Retrieve the stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if the stored user exists and the credentials match
    if (storedUser && storedUser.email === email && storedUser.password === btoa(password)) { // Verify hashed password
        alert(`Welcome, ${storedUser.name}!`); // Welcome message
        // Set a flag to indicate the user is logged in
        localStorage.setItem("loggedIn", "true");
        // Redirect to the user's profile page after successful login
        window.location.href = "profile.html"; // Navigate to profile page
    } else {
        alert("Invalid email or password. Please try again."); // Show error message if credentials are incorrect
    }
});

// Check if the user is logged in before allowing access to the home page or 'Get Started' button
document.getElementById("getStartedButton")?.addEventListener("click", function () {
    // Get the login status from localStorage
    const loggedIn = localStorage.getItem("loggedIn");

    // If the user is logged in, redirect to profile page, otherwise to register page
    if (loggedIn === "true") {
        window.location.href = "profile.html"; // Redirect to profile page if logged in
    } else {
        window.location.href = "register.html"; // Redirect to registration page if not logged in
    }
});

// Check for login status on the homepage
window.addEventListener("load", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    // If the user is logged in, the 'Get Started' button redirects to the profile page
    const getStartedButton = document.querySelector(".hero .btn");
    if (loggedIn === "true" && getStartedButton) {
        getStartedButton.addEventListener("click", function () {
            window.location.href = "profile.html"; // Redirect to profile page if logged in
        });
    }
});

// Join this Skill functionality
document.querySelectorAll(".join-skill-btn").forEach((button) => {
    button.addEventListener("click", function () {
        // Toggle the button text and add/remove a class based on the action
        if (this.textContent === "Join this Skill") {
            this.textContent = "You Joined this Skill"; // Update text to show the user has joined
            this.classList.add("joined"); // Optionally, add a class to style the joined button
        } else {
            this.textContent = "Join this Skill"; // Update text to prompt joining again
            this.classList.remove("joined"); // Remove the joined class when unjoining
        }
    });
});

// Carousel Functionality with Auto-slide and Indicator
let currentIndex = 0; // Track the current index of the carousel slides
const slides = document.querySelectorAll('.carousel-slide'); // Get all the slides
const totalSlides = slides.length; // Get the total number of slides
const nextButton = document.getElementById('nextButton'); // Get the 'next' button
const prevButton = document.getElementById('prevButton'); // Get the 'previous' button

// Function to show the current slide based on the index
function showSlide(index) {
    // Handle edge cases for index (looping through slides)
    if (index >= totalSlides) {
        currentIndex = 0; // If we're at the last image, go back to the first one
    } else if (index < 0) {
        currentIndex = totalSlides - 1; // If we're at the first image, go to the last one
    }

    // Shift the carousel to display the correct slide
    const offset = -currentIndex * 100; // Shift images based on current index
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`; // Apply the transformation

    // Update carousel indicators to highlight the active slide
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, idx) => {
        indicator.classList.remove('active'); // Remove active class from all indicators
        if (idx === currentIndex) {
            indicator.classList.add('active'); // Add active class to the current slide's indicator
        }
    });
}

// Event listeners for carousel navigation (previous and next buttons)
nextButton?.addEventListener('click', () => {
    currentIndex++; // Increment index for next slide
    showSlide(currentIndex); // Display the next slide
});

prevButton?.addEventListener('click', () => {
    currentIndex--; // Decrement index for previous slide
    showSlide(currentIndex); // Display the previous slide
});

// Auto slide functionality (optional)
setInterval(() => {
    currentIndex++; // Automatically increment index
    showSlide(currentIndex); // Show the next slide
}, 3000); // Change slide every 3 seconds

// Show the first image initially
showSlide(currentIndex); // Display the first slide

// Logout functionality (clearing session on logout)
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    // Remove login status from localStorage to log out the user
    localStorage.removeItem("loggedIn"); // Clear login session
    window.location.href = "login.html"; // Redirect to login page
});

// Handle button functionality for joining skills when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to each 'Join Skill' button after the page loads
    document.querySelectorAll(".join-skill-btn").forEach((button) => {
        button.addEventListener("click", function () {
            // Toggle button text and styles based on whether the user has joined
            if (this.textContent.trim() === "Join this Skill") {
                this.textContent = "You Joined this Skill"; // Change text when joining
                this.classList.add("joined"); // Add a 'joined' class for styling
            } else {
                this.textContent = "Join this Skill"; // Change text when unjoining
                this.classList.remove("joined"); // Remove the 'joined' class
            }
        });
    });
});
