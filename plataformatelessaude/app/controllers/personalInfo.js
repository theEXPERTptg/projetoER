function goToProfile() {
    var profileController = Alloy.createController('profile');
    var profileWindow = profileController.getView();
    profileWindow.open(); // Abre a nova janela
}

function showValues(){
    $.name.value = loggedInAccount.name;
    $.gender.value = loggedInAccount.gender;
    $.birthDate.value = loggedInAccount.birthDate;
    $.NifNumber.value = loggedInAccount.nif;
    $.phoneNumber.value = loggedInAccount.phoneNumber;
    $.email.value = loggedInAccount.email;
    $.emergencyName.value = loggedInAccount.emergencyName;
    $.emergencyPhoneNumber.value = loggedInAccount.emergencyPhoneNumber;
    $.relationship.value = loggedInAccount.relationship;
}

function updateValues(){
    /* var name = $.name.value;
    var gender = $.gender.value;
    var birthDate = $.birthDate.value;
    var nifNumber = $.NifNumber.value;
    var phoneNumber = $.phoneNumber.value;
    var email = $.email.value;
    var emergencyName = $.emergencyName.value;
    var emergencyPhoneNumber = $.emergencyPhoneNumber.value
    var relationship = $.relationship.value */

    //NAME
    function nameChangeCheck(){
        if($.name.value != loggedInAccount.name){
            goToProfile();
            alert(`O nome foi alterado de ${loggedInAccount.name} para ${$.name.value}.`);
            loggedInAccount.name = $.name.value;
            // accounts.accounts.name = $.name.value; ver isto se consigo alterar
            return true;
        }
    }
    //GENDER
    function genderChangeCheck(){
        if($.gender.value != loggedInAccount.gender){
            goToProfile();
            alert(`O género foi alterado de ${loggedInAccount.gender} para ${$.gender.value}.`);
            loggedInAccount.gender = $.gender.value;
            return true;
        }
    }

    function birthDateChangeCheck(dataNascimento){
        if($.birthDate.value != loggedInAccount.birthDate){
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
            goToProfile();
            alert(`A data de nascimento foi alterada de ${loggedInAccount.birthDate} para ${$.birthDate.value}.`);
            loggedInAccount.birthDate = $.birthDate.value;
            return true;
        }
    }

    function NifNumberChangeCheck(){

    }

    function phoneNumberChangeCheck(){

    }

    function emailChangeCheck(){

    }

    function emergencyNameChangeCheck(){

    }    

    function emergencyPhoneNumberChangeCheck(){

    }

    function relationshipChangeCheck(){

    }



    if(!$.name.value){
        $.name.value = loggedInAccount.name;
        alert(`O nome foi deixado em branco. A reverter alteração para o nome anterior: ${loggedInAccount.name}`);
    }else if(nameChangeCheck()){

    }else if(!$.gender.value){
        $.gender.value = loggedInAccount.gender;
        alert(`O género foi deixado em branco. A reverter alteração para o nome anterior: ${loggedInAccount.gender}`);
        return false;
    }else if(genderChangeCheck()){
        
    }else if(!$.birthDate.value){
        $.birthDate.value = loggedInAccount.birthDate;
        alert(`A data de nascimento foi deixada em branco. A reverter alteração para a data de nascimento anterior: ${loggedInAccount.birthDate}`);
    }else if(birthDateChangeCheck($.birthDate.value)){

    }else if(!$.NifNumber.value){

    }else if(NifNumberChangeCheck()){

    }else if(!$.phoneNumber.value){

    }else if(phoneNumberChangeCheck()){

    }else if(!$.email.value){

    }else if(emailChangeCheck()){

    }else if(!$.emergencyName.value){

    }else if(emergencyNameChangeCheck()){

    }else if(!$.emergencyPhoneNumber.value){

    }else if(emergencyPhoneNumberChangeCheck()){

    }else if(!$.relationship.value){

    }else if(relationshipChangeCheck()){
        
    }
    

}

showValues()
updateValues()