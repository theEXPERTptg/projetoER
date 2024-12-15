function goToProfile() {
    var profileController = Alloy.createController('profile');
    var profileWindow = profileController.getView();
    profileWindow.open(); // Abre a nova janela
}

function showValues(){
    $.name.value = loggedInAccount.name;
    $.gender.value = loggedInAccount.gender;
    $.birthDate.value = loggedInAccount.birthDate;
    $.NifNumber.value = loggedInAccount.NifNumber;
    $.phoneNumber.value = loggedInAccount.phoneNumber;
    $.email.value = loggedInAccount.email;
    $.emergencyName = loggedInAccount.emergencyName;
    $.emergencyPhoneNumber = loggedInAccount.emergencyPhoneNumber;
    $.relationship = loggedInAccount.relationship;
}

function updateValues(){

}
showValues()