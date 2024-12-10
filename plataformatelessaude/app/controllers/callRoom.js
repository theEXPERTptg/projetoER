
function enterWaitingRoom(){
    $.waitingRoom.visible = true;
    $.callScreen.visible = false;
    $.textScreen.visible = false;
}

function enterCallRoom(){
    $.waitingRoom.visible = false;
    $.callScreen.visible = true;
    $.textScreen.visible = false;
}

function enterTextRoom(){
    $.waitingRoom.visible = false;
    $.callScreen.visible = false;
    $.textScreen.visible = true;

}

function backToDashboard(){
    $.waitingRoom.visible = true;
    $.callScreen.visible = false;
    $.textScreen.visible = false;
    //inserir função de volta ao dasboard
}