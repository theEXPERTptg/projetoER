function validatePage1() {
    var name = $.name.value;
    var nif = $.NifNumber.value;
    var gender = $.gender.value;
    var birthDate = $.birthDate.value;

    function validarDataNascimento(dataNascimento) {
        const dataAtual = new Date(); 
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
        
        if (ano < 1900) {
            alert("O ano inserido não é válido. Apenas datas após o ano 1900 são permitidas.")
            return false;
        }

        if (mes < 1 || mes > 12) {
            alert("O mês inserido não é válido. Por favor insira um valor entre 01, para Janeiro, e 12 para Dezembro.")
            return false;
        }
        const diasNoMes = [31, (ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (dia < 1 || dia > diasNoMes[mes - 1]) { // Ajustar o mês para índice do array (0 based)
            alert("O dia inserido não é válido. Por favor confira se inseriu o valor correto. Para datas antes do dia 10 use um 0 no início, por exemplo, dia 4 escreva 04.")
            return false;
        }

        const data = new Date(ano, mes - 1, dia); 
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

    let errorMessage = "";

    if (!name && !nif && !gender && !birthDate) errorMessage = "Não foram inseridos dados. Insira a informação necessária."
    else if (!name) errorMessage = "Nenhum nome foi inserido. Insira a informação necessária."
    else if (!nif) errorMessage = "Nenhum NIF foi inserido. Insira a informação necessária."
    else if (!validateNIF(nif)) errorMessage = "O NIF inserido está incorreto. Insira um NIF valido."
    else if (!gender) errorMessage = "Nenhum género foi inserido. Insira a informação necessária."
    else if (!birthDate) errorMessage = "Não foi inserida uma data de nascimento. Insira a informação necessária."
    else if (!validarDataNascimento(birthDate)) return false;

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }

    else if (validateNIF(nif) && validarDataNascimento(birthDate)) {
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

    function validatePhoneNumber(phoneNumber) {
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

    function validateEmail(email) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!regexEmail.test(email)) {
            alert("O endereço de email inserido não é valido. Insira um endereço de email válido.");
            return false;
        }

        return true;
    }

    function validatePassword(password) {

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

    function validateConfirmPassword(confirmPassword) {
        if (password !== confirmPassword) {
            alert("A confirmação de password não é igual à password inserida. Insira a mesma password inserida antes.");
            return false;
        }
        return true;
    }

    let errorMessage = "";

    if (!email && !phoneNumber && !password && !confirmPassword) errorMessage = "Não foram inseridos dados. Insira a informação necessária.";
    else if (!email) errorMessage = "Nenhum email foi inserido. Insira a informação necessária.";
    else if (!validateEmail(email)) errorMessage = "Email inválido.";
    else if (!phoneNumber) errorMessage = "Nenhum número de telemóvel foi inserido. Insira a informação necessária.";
    else if (!validatePhoneNumber(phoneNumber)) errorMessage = "Número de telemóvel inválido.";
    else if (!password) errorMessage = "Nenhuma password foi inserida. Insira a informação necessária.";
    else if (!validatePassword(password)) errorMessage = "Password inválida.";
    else if (!confirmPassword) errorMessage = "Não foi inserida a confirmação da password. Insira a informação necessária.";
    else if (!validateConfirmPassword(confirmPassword)) errorMessage = "Confirmação da password inválida.";

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }

    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = true;
    $.registerFormPage4.visible = false;
    return true;
}

function validatePage3(){
    var weight = $.weight.value?.trim() || "";
    var height = $.height.value?.trim() || "";

    const regex = /^\d+(\,\d+)?$/;
    let errorMessage = "";

    if (!weight && !height){errorMessage = "Não foram inseridos dados. Insira a informação necessária.";} 
    else if (!weight){errorMessage = "Nenhum valor para o peso foi inserido. Insira a informação necessária.";} 
    else if (!height){errorMessage = "Nenhum valor para a altura foi inserido. Insira a informação necessária.";} 

    if (errorMessage) {
        alert(errorMessage);
        return false;
    }
    if(!regex.test(weight)) {
        alert("O peso deve conter apenas números e, opcionalmente, uma vírgula.");
        return false; // O peso é inválido
    }
    if(!regex.test(height)) {
        alert("A altura deve conter apenas números e, opcionalmente, uma vírgula.");
        return false; // O peso é inválido
    }
    if (weight && height) {
        $.registerFormPage3.visible = false;
        $.registerFormPage4.visible = true;
        $.registerFormPage5.visible = false;
        $.weight.value = weight;
        $.height.value = height;
        return true;
    }
    return false;
}


function validatePage4() {
    var emergencyName = $.emergencyName.value;
    var emergencyPhoneNumber = $.emergencyPhoneNumber.value;
    var relationship = $.relationship.value;

    function validateEmergencyPhoneNumber(emergencyPhoneNumber) {
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
    } else if (!emergencyName) {
        alert("Nenhum nome para o contacto de emergência foi inserido. Insira a informação necessária.")
        return false;
    } else if (!emergencyPhoneNumber) {
        alert("Nenhum número de telemóvel para o contacto de emergência foi inserido. Insira a informação necessária.")
        return false;
    } else if (!validateEmergencyPhoneNumber(emergencyPhoneNumber)) {
        return false;
    } else if (!relationship) {
        alert("Nenhuma relação com o contacto de emergência foi inserida. Insira a informação necessária.");
        return false;
    } else if (emergencyName && validateEmergencyPhoneNumber(emergencyPhoneNumber) && relationship) {
        $.loginForm.visible = false;
        $.registerFormPage1.visible = false;
        $.registerFormPage2.visible = false;
        $.registerFormPage3.visible = false;
        $.registerFormPage4.visible = false;
        $.registerFormPage5.visible = true;
        return true;
    }
}

function validatePage5() {
    if (!$.checkbox1.value) {
        alert("É necessário aceitar os termos e condições para terminar o registo.");
        return false;
    }
    submitRegister();
    showLoginForm();
    return true;
}



function showRegisterFormPage1() {
    $.loginForm.visible = false;
    $.registerFormPage1.visible = true;
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = false;
    $.registerFormPage4.visible = false;
    $.registerFormPage5.visible = false;
}

function showRegisterFormPage2() {
    $.registerFormPage1.visible = false;
    $.registerFormPage2.visible = true;
    $.registerFormPage3.visible = false;
}

function showRegisterFormPage3() {
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = true;
    $.registerFormPage4.visible = false;
}

function showRegisterFormPage4() {
    $.registerFormPage3.visible = false;
    $.registerFormPage4.visible = true;
    $.registerFormPage5.visible = false;
}

function showRegisterFormPage5() {
    $.loginForm.visible = false;
    $.registerFormPage1.visible = false;
    $.registerFormPage2.visible = false;
    $.registerFormPage3.visible = false;
    $.registerFormPage4.visible = false;
    $.registerFormPage5.visible = true;
}

function showLoginForm() {
    $.registerFormPage1.visible = false;
    $.registerFormPage5.visible = false;
    $.loginForm.visible = true;
}

function submitLogin() {
    alert("login"    )
    var username = $.loginUsername.value;
    var password = $.loginPassword.value;
    var serverConnection = true;
    var serverMaintenance = true;

    if (!username || !password) {
        alert("Por favor insere tanto o nome de utilizador como password.");
        return;
    }

    if (!serverConnection) {
        if (serverMaintenance) {
            alert("O servidor está atualmente em manutenção.");
        } else {
            alert("De momento não existe uma conexão com o servidor.");
        }
        return;
    }

    var matchedAccount = accounts.accounts.find(account =>
        account.username === username && account.password === password
    );

    if (matchedAccount) {
        alert("Login com sucesso!");
        loggedInAccount = matchedAccount;
        if (loggedInAccount.pacient) {
            loggedInAccount.consultations = accounts.accounts.find(account => account.username === loggedInAccount.pacient).consultations
        }
        var dashBoard = Alloy.createController("dashBoard").getView();
        dashBoard.open();
    } else {
        var userExists = accounts.accounts.some(account => account.username === username);
        var passwordCorrect = accounts.accounts.some(account => account.password === password);

        if (!userExists && !passwordCorrect) {
            alert("O utilizador e password estão incorretos.");
        } else if (!passwordCorrect) {
            alert("A password está incorreta.");
        } else {
            alert("Este utilizador está errado para está password. (brincadeira)");
        }
    }
}

function submitRegister() {
    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/; // 2 digitos + / + 2 digitos + / + 4 digitos
    const match = $.birthDate.value.match(regexData);
    const [_, diaStr, mesStr, anoStr] = match;
    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10) - 1; // Ajustar mês (0-11)
    const ano = parseInt(anoStr, 10);
    const birthDate = new Date(ano, mes, dia);

    const newAccount = {
        "username": $.name.value,
        "password": $.password.value,
        "name": $.name.value,
        "nif": $.NifNumber.value,
        "gender": $.gender.value,
        "birthDate": $.birthDate.value,
        "email": $.email.value,
        "phoneNumber": $.phoneNumber.value,
        "emergencyName": $.emergencyName.value,
        "emergencyPhoneNumber": $.emergencyPhoneNumber.value,
        "relationship": $.relationship.value,
        "weight": $.weight.value,
        "height": $.height.value,
        "consultations": [

        ]
    };

    accounts.accounts.push(newAccount);
    alert("Conta criada com sucesso!");
    showLoginForm();
}

function forgotPassword() {
    alert("Por implementar - forgotPassword()");
    return;
}

function generateOtpCode() {
    alert("Por implementar - generateOtpCode()")
    return;
}


$.mainWindow.open();

if (OS_ANDROID) {
    var requiredPermissions = [
        'android.permission.CAMERA',
        'android.permission.RECORD_AUDIO',
        "android.permission.MODIFY_AUDIO_SETTINGS",
        "android.permission.INTERNET",
        "android.permission.ACCESS_NETWORK_STATE"
    ];

    var missingPermissions = [];
    for (var i = 0; i < requiredPermissions.length; i++) {
        if (!Ti.Android.hasPermission(requiredPermissions[i])) {
            missingPermissions.push(requiredPermissions[i]);
        }
    }

    if (missingPermissions.length > 0) {
        Ti.Android.requestPermissions(missingPermissions, function (e) {
            if (!e.success) {
                alert("É necessário permissão para utilizar a câmara e o microfone. Por favor ceda permissão indo às definições do dispositivo.");
            }
        });
    }
}






var accounts = {
    accounts: [
        {
            "username": "johndoe",
            "password": "1234",
            "name": "John Doe",
            "nif": "272414522",
            "gender": "Male",
            "birthDate": "10/06/1980",
            "email": "john_doe@gmail.com",
            "phoneNumber": "961010123",
            "emergencyName": "Jane Doe",
            "emergencyPhoneNumber": "960101432",
            "relationship": "Wife",
            "weight": "75",
            "height": "170",
            "consultations": [
                {
                    "doctorName": "Dr. Johnny ",
                    "specialisation": "Cardiology",
                    "day": 9,
                    "month": 11, // December (0-based)
                    "year": 2024,
                    "startTime": "13:15",
                    "endTime": "14:00"
                },
                {
                    "doctorName": "Dr. Carlos",
                    "specialisation": "Dermatology",
                    "day": 8,
                    "month": 11, // December (0-based)
                    "year": 2024,
                    "startTime": "10:00",
                    "endTime": "10:30"
                },
                {
                    "doctorName": "Dr. Francisco",
                    "specialisation": "Pediatrics",
                    "day": 6,
                    "month": 11,
                    "year": 2024,
                    "startTime": "14:00",
                    "endTime": "14:30"
                },
                {
                    "doctorName": "Dr. Helder",
                    "specialisation": "Cardiology",
                    "day": 13,
                    "month": 11,
                    "year": 2024,
                    "startTime": "10:30",
                    "endTime": "11:00"
                },
                {
                    "doctorName": "Dr. Zé",
                    "specialisation": "Orthopedics",
                    "day": 7,
                    "month": 0,
                    "year": 2025,
                    "startTime": "15:15",
                    "endTime": "15:45"
                },
                {
                    "doctorName": "Dr. Otávio",
                    "specialisation": "Cardiology",
                    "day": 26,
                    "month": 11,
                    "year": 2024,
                    "startTime": "11:30",
                    "endTime": "12:00"
                },
                {
                    "doctorName": "Dr. Miguel",
                    "specialisation": "Pediatrics",
                    "day": 26,
                    "month": 11,
                    "year": 2024,
                    "startTime": "16:15",
                    "endTime": "16:45"
                },
                {
                    "doctorName": "Dr. Miguel",
                    "specialisation": "Dermatology",
                    "day": 6,
                    "month": 0,
                    "year": 2025,
                    "startTime": "15:30",
                    "endTime": "16:00"
                },
                {
                    "doctorName": "Dr. Carlos",
                    "specialisation": "Dermatology",
                    "day": 15,
                    "month": 11,
                    "year": 2024,
                    "startTime": "14:30",
                    "endTime": "15:00"
                },
                {
                    "doctorName": "Dr. Carlos",
                    "specialisation": "Dermatology",
                    "day": 11,
                    "month": 11,
                    "year": 2024,
                    "startTime": "16:45",
                    "endTime": "17:00"
                },
                {
                    "doctorName": "Dr. Zé",
                    "specialisation": "Orthopedics",
                    "day": 11,
                    "month": 0,
                    "year": 2025,
                    "startTime": "16:15",
                    "endTime": "16:45"
                },
                {
                    "doctorName": "Dr. Helder",
                    "specialisation": "Pediatrics",
                    "day": 28,
                    "month": 11,
                    "year": 2024,
                    "startTime": "12:45",
                    "endTime": "13:00"
                }
            ]
        },
        {
            "username": "janedoe",
            "password": "1234",
            "name": "Jane Doe",
            "nif": "234168080",
            "gender": "Female",
            "birthDate": "01/12/1983",
            "email": "jone_doe@gmail.com",
            "phoneNumber": "960101432",
            "emergencyName": "John Doe",
            "emergencyPhoneNumber": "960101432",
            "relationship": "Husband",
            "pacient": "johndoe",
            "weight": "65",
            "height": "165",
            "consultations": [
                
            ]
        },
        {
            "username": "skipper",
            "password": "1234",
            "name": "Skipper",
            "nif": "234168080",
            "gender": "Male",
            "birthDate": "01/10/2000",
            "email": "skipper@gmail.com",
            "phoneNumber": "960101432",
            "emergencyName": "N/A",
            "emergencyPhoneNumber": "960101432",
            "relationship": "N/A",
            "consultations": [
                
            ]
        }

    ]
};

