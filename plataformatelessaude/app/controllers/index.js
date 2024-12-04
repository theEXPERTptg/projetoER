// Show the Register Form
function showRegisterForm() {
    $.loginForm.visible = false;  // Hide login form
    $.registerForm.visible = true; // Show register form
}

// Show the Login Form
function showLoginForm() {
    $.registerForm.visible = false;  // Hide register form
    $.loginForm.visible = true; // Show login form
}

// Handle Login Submission
function submitLogin() {
    var username = $.loginUsername.value;
    var password = $.loginPassword.value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Simulated login process
    if (username === "test" && password === "1234") {
        alert("Login successful!");
    } else {
        alert("Invalid credentials. Try again.");
    }
}

// Handle Registration Submission
function submitRegister() {
    var username = $.registerUsername.value;
    var password = $.registerPassword.value;
    var confirmPassword = $.confirmPassword.value;

    if (!username || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Registration successful!");
}

// Open the main window
$.mainWindow.open();
