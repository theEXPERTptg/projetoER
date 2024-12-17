function goToProfile() {
    var profileController = Alloy.createController('profile');
    var profileWindow = profileController.getView();
    profileWindow.open(); // Abre a nova janela
}


function updateValues(){
    var password = $.password.value;
    var confirmPassword = $.confirmPassword.value;
    function passwordChangeCheck(password){
        if (password.length < 7) {
            alert("A password inserida é curta. Insira uma password que tenha pelo menos 7 caracteres.");
            return false;
        }

        const temLetra = /[a-zA-Z]/.test(password); // Verifica letras (a-z, A-Z)
        const temDigito = /\d/.test(password);      // Verifica dígitos (0-9)
        const temSimbolo = /[\W_]/.test(password);  // Verifica símbolos (\W ou _)

        if (!temLetra || !temDigito || !temSimbolo) {
            alert("Uma password segura deve conter pelo menos 1 letra, 1 dígito e 1 símbolo. Insira uma password valida.");
            return false;
        }
        return true;
    }

    function confirmPasswordChangeCheck(confirmPassword){
        if (password !== confirmPassword) {
            alert("A confirmação de password não é igual à password inserida. Insira a mesma password inserida no campo anterior.");
            return false;
        }
        return true;
    }

    if(password == $.password.value && confirmPassword == $.confirmPassword.value){
        alert(`Não existem dados inseridos. Não houveram alterações guardadas. Se deseja voltar atrás clique na opção "Voltar".`)
        return false;
    }else if(passwordChangeCheck(password) && confirmPasswordChangeCheck(confirmPassword) ){
        goToProfile();
        return true;
    }
    return true;
}
