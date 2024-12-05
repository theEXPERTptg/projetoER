


// Show the Register Form
function showRegisterFormPage1() {
    $.loginForm.visible = false;  // Hide login form
    $.registerFormPage1.visible = true; // Show register form
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = false;
    $.registerFormPage4.visible = false;
}

function showRegisterFormPage2(){
    $.registerFormPage1.visible = false;
    $.registerFormPage2.visible = true;
    $.registerFormPage3.visible = false;
}

function showRegisterFormPage3(){
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = true;
    $.registerFormPage4.visible = false;
}

function showRegisterFormPage4(){
    $.loginForm.visible = false; 
    $.registerFormPage1.visible = false;
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = false;
    $.registerFormPage4.visible = true;
}

function register(){
    $.loginForm.visible = false; 
    $.registerFormPage1.visible = false;
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = false;
    $.registerFormPage4.visible = false; 
    //TODO REGISTER PROCESS
    showLoginForm();
}


// Show the Login Form
function showLoginForm() {
    $.registerFormPage1.visible = false;  // Hide register form
    $.registerFormPage4.visible = false;
    $.loginForm.visible = true; // Show login form
}

// Handle Login Submission
function submitLogin() {
    var username = $.loginUsername.value;
    var password = $.loginPassword.value;

    //TODO FOR TESTING ONLY
    alert("fake login");
    Alloy.createController("dashBoard").getView().open();
    return;



    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }


    // Simulated login process
    if (username === "test" && password === "1234") {
        alert("Login successful!");
        var dashBoard = Alloy.createController("dashBoard").getView();
        dashBoard.open();
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

function forgotPassword(){

}

function generateOtpCode(){

}
// Open the main window
$.mainWindow.open();
submitLogin();