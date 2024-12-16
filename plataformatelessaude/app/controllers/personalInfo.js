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
    var name = $.name.value;
    var gender = $.gender.value;
    var birthDate = $.birthDate.value;
    var nifNumber = $.NifNumber.value;
    var phoneNumber = $.phoneNumber.value;
    var email = $.email.value;
    var emergencyName = $.emergencyName.value;
    var emergencyPhoneNumber = $.emergencyPhoneNumber.value
    var relationship = $.relationship.value

    if(!$.name.value){
        goToProfile();
        $.name.value = loggedInAccount.name;
        alert(`O campo nome foi deixado em branco. A reverter alteração para o nome anterior: ${loggedInAccount.name}` )
        return false;
    } else if($.name.value){
        loggedInAccount.name = $.name.value;
        // accounts.accounts.name = $.name.value; ver isto se consigo alterar
        goToProfile();
        return true;
    }


}

showValues()
updateValues()