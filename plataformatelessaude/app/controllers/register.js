function submitRegister() {
    var username = $.username.value;
    var password = $.password.value;
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

function goBack() {
    $.register.close();
}