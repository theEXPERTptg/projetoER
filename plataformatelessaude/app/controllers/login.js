function submitLogin() {
    var username = $.username.value;
    var password = $.password.value;

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

function goBack() {
    $.login.close();
}