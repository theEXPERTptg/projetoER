function goToLogin() {
    var login = Alloy.createController('login').getView();
    login.open();
}

function goToRegister() {
    var register = Alloy.createController('register').getView();
    register.open();
}

$.index.open();
