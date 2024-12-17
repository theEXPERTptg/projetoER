function goBack(){
    Alloy.createController("dashBoard").getView().open();
    return;
}

function openPersonalInfo(){
    Alloy.createController("personalInfo").getView().open();
    return;
}

function openPasswordInfo(){
    Alloy.createController("passwordInfo").getView().open();
    return;
}


function changeVariables(){
    $.userName.text = loggedInAccount.name;
    $.userEmail.text = loggedInAccount.email;
}

changeVariables()