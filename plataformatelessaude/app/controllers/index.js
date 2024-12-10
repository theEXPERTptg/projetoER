
// Show the Register Form

function validatePage1() {
    var name = $.name.value;
    var nif = $.NifNumber.value;
    var gender = $.gender.value;
    var birthDate = $.birthDate.value;
    
    function validarDataNascimento(dataNascimento) {
        const dataAtual = new Date(2024, 11, 7); // 07/12/2024 (mês é zero-based internamente)
        // Regex to validate format DD/MM/YYYY
        const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = dataNascimento.match(regexData);
        if (!match) {
            alert("A data de nascimento inserida não está correta.")
            return false;
        }
        const [_, diaStr, mesStr, anoStr] = match;
        const dia = parseInt(diaStr, 10);
        const mes = parseInt(mesStr, 10); // Aqui o mês é 1-based (1 = Janeiro, 12 = Dezembro)
        const ano = parseInt(anoStr, 10);
        // Validar o ano
        if (ano < 1900) {
            alert("O ano inserido não é válido. Apenas datas após o ano 1900 são permitidas.")
            return false;
        }
        // Validar o mês (1 a 12)
        if (mes < 1 || mes > 12) {
            alert("O mês inserido não é válido. Por favor insira um valor entre 01, para Janeiro, e 12 para Dezembro.")
            return false;
        }
        // Verificar validade dos dias para cada mês
        const diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (dia < 1 || dia > diasNoMes[mes - 1]) { // Ajustar o mês para índice do array (zero-based)
            alert("O dia inserido não é válido. Por favor confira se inseriu o valor correto. Para datas antes do dia 10 use um 0 no início, por exemplo, dia 4 escreva 04.")
            return false;
        }
        // Criar objeto Date com a data fornecida
        const data = new Date(ano, mes - 1, dia); // Subtrair 1 do mês para criar o objeto Date
        // Verificar se a data é no futuro
        if (data > dataAtual) {
            alert("Por favor insira uma data válida. A data de nascimento inserida está no futuro.")
            return false;
        }
        return true;
    }

    function validateNIF(value) {
    const nif = typeof value === 'string' ? value : value.toString();
    const validationSets = {
        one: ['1', '2', '3', '5', '6', '8'],
        two: ['45', '70', '71', '72', '74', '75', '77', '79', '90', '91', '98', '99']
    };
    if (nif.length !== 9) return false;
    if (!validationSets.one.includes(nif.substr(0, 1)) && !validationSets.two.includes(nif.substr(0, 2))) return false;
    const total = nif[0] * 9 + nif[1] * 8 + nif[2] * 7 + nif[3] * 6 + nif[4] * 5 + nif[5] * 4 + nif[6] * 3 + nif[7] * 2;
    const modulo11 = (Number(total) % 11);
    const checkDigit = modulo11 < 2 ? 0 : 11 - modulo11;
    return checkDigit === Number(nif[8]);
    }   

    //Below the logic for the form, validation of values and to go to the next page

    if (!name && !nif && !gender && !birthDate) {
        alert("Não foram inseridos dados. Insira a informação necessária.");
        return false; 
    } else if (!name){
        alert("Nenhum nome foi inserido. Insira a informação necessária.")
        return false;
    } else if (!nif){
        alert("Nenhum NIF foi inserido. Insira a informação necessária.")
        return false;
    } else if (validateNIF(nif) === false){
        alert("O NIF inserido está incorreto. Insira um NIF valido.")
        return false;
    } else if (!gender){
        alert("Nenhum género foi inserido. Insira a informação necessária.")
        return false;
    } else if (!birthDate){
        alert("Não foi inserida uma data de nascimento. Insira a informação necessária.")
        return false;
    } else if (validarDataNascimento(birthDate) === false){
        return false;
    } else if (validateNIF(nif) === true && validarDataNascimento(birthDate) === true){
        $.registerFormPage1.visible = false;
        $.registerFormPage2.visible = true;
        $.registerFormPage3.visible = false;
        return true;
    }     
}

function validatePage2() {
    var email = $.email.value;
    var phoneNumber = $.phoneNumber.value;
    var password = $.password.value;
    var confirmPassword = $.confirmPassword.value;

    function validatePhoneNumber(phoneNumber){
        const onlyNumbers = /^\d+$/.test(phoneNumber);

        if (!onlyNumbers) {
        alert("O número de telemóvel deve conter apenas números. Insira um número de telemóvel válido.");
            return false;
        }

        if (phoneNumber.length !== 9) {
            alert("O número de telemóvel deve conter exatamente 9 dígitos. Insira um número de telemóvel válido.");
            return false;
        }

        return true;
    }

    function validateEmail(email){
        // Regex para validar email
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        // Verificar se o email é válido
        if (!regexEmail.test(email)) {
        alert("O endereço de email inserido não é valido. Insira um endereço de email válido.");
            return false;
        }

        return true;
    }

    function validatePassword(password){

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

    function validateConfirmPassword(confirmPassword){
        if (password !== confirmPassword) {
            alert("A confirmação de password não é igual à password inserida. Insira a mesma password inserida antes.");
            return false;
        }
        return true;
    }

    if (!email && !phoneNumber && !password && !confirmPassword) {
        alert("Não foram inseridos dados. Insira a informação necessária.");
        return false; 
    } else if (!email){
        alert("Nenhum email foi inserido. Insira a informação necessária.")
        return false;
    } else if (validateEmail(email) === false){
        return false;
    } else if (!phoneNumber){
        alert("Nenhum número de telemóvel foi inserido. Insira a informação necessária.")
        return false;
    } else if (validatePhoneNumber(phoneNumber) === false){
        return false;
    } else if (!password){
        alert("Nenhuma password foi inserida. Insira a informação necessária.")
        return false;
    } else if (validatePassword(password) === false){
        return false;
    } else if (!confirmPassword){
        alert("Não foi inserida a confirmação da password. Insira a informação necessária.")
        return false;
    } else if (validateConfirmPassword(confirmPassword) === false){
        return false;
    } else if (validateEmail(email) === true && validatePhoneNumber(phoneNumber) === true && validatePassword(password) === true &&validateConfirmPassword(confirmPassword) === true){
        $.registerFormPage2.visible = false;
        $.registerFormPage3.visible = true;
        $.registerFormPage4.visible = false;
        return true;
    }
}    

function validatePage3(){
    var emergencyName = $.emergencyName.value;
    var emergencyPhoneNumber = $.emergencyPhoneNumber.value;
    var relationship = $.relationship.value;

    function validateEmergencyPhoneNumber(emergencyPhoneNumber){
        const onlyNumbers = /^\d+$/.test(emergencyPhoneNumber);

        if (!onlyNumbers) {
        alert("O número de telemóvel deve conter apenas números. Insira um número de telemóvel válido.");
            return false;
        }

        if (emergencyPhoneNumber.length !== 9) {
            alert("O número de telemóvel deve conter exatamente 9 dígitos. Insira um número de telemóvel válido.");
            return false;
        }

        return true;
    }

    if (!emergencyName && !emergencyPhoneNumber && !relationship) {
        alert("Não foram inseridos dados. Insira a informação necessária.");
        return false; 
    } else if (!emergencyName){
        alert("Nenhum nome para o contacto de emergência foi inserido. Insira a informação necessária.")
        return false;
    } else if (!emergencyPhoneNumber){
        alert("Nenhum número de telemóvel para o contacto de emergência foi inserido. Insira a informação necessária.")
        return false;
    } else if (validateEmergencyPhoneNumber(emergencyPhoneNumber) === false){
        return false;
    } else if (!relationship){
        alert("Nenhuma relação com o contacto de emergência foi inserida. Insira a informação necessária.");
        return false;
    } else if (emergencyName && validateEmergencyPhoneNumber(emergencyPhoneNumber) === true && relationship){
        $.loginForm.visible = false; 
        $.registerFormPage1.visible = false;
        $.registerFormPage2.visible = false;
        $.registerFormPage3.visible = false;
        $.registerFormPage4.visible = true;
        return true;
    }
}

function validatePage4(){
    const isChecked = $.checkbox1.value;
    if (!isChecked) {
        alert("É necessário aceitar os termos e condições para terminar o registo.");
        return false;
    } else if(isChecked){
        alert("O Registo foi efetuado com sucesso!")
        $.loginForm.visible = false; 
        $.registerFormPage1.visible = false;
        $.registerFormPage2.visible = false;
        $.registerFormPage3.visible = false;
        $.registerFormPage4.visible = false; 
        //TODO REGISTER PROCESS
        showLoginForm();
    }
}



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
    var serverConection = true;
    var serverMaintenance = true;
    
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }


    // Simulated login process
    if (serverConection === true){
        if (username === "test" && password === "1234") {
            alert("Login successful!");
            var dashBoard = Alloy.createController("dashBoard").getView();
            dashBoard.open();
        } else {
            if (username !== "test" && password !== "1234") {
                alert("The username and password are incorrect.");
            } else if (password !== "1234") {
                alert("The password is incorrect.");
            } else {
                alert("This username is incorrect for this password.");
            }
        }
    }else {
        if (serverMaintenance === true){
            alert("The server is currently under maintenance.")
        } else {
            alert("There currently isn't a connection to the server.")
        }
        
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

      //TODO FOR TESTING ONLY
    //alert("fake login");
    Alloy.createController("dashBoard").getView().open();
    return;
}

function generateOtpCode(){
    Alloy.createController("callRoom").getView().open();

}


//DBUGGING APAGAR DEPOIS---------------
// Open the main window
//$.registerFormPage4.visible = false;
//$.registerFormPage2.visible = false;
//$.registerFormPage3.visible = false;
//$.registerFormPage4.visible = true;

//---------------------------------------------


$.mainWindow.open();

//Alloy.createController("dashBoard").getView().open();




var callRoom = Alloy.createController("callRoom").getView();
callRoom.open();

