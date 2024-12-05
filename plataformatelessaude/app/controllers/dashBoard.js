
function onClick(){
    alert("A tua prima");
}

function showHome(){
    $.homeContent.visible=true;
    $.HomeBtn.backgroundColor = "#789E9E" ;
    $.ScheduleBtn.backgroundColor = "#B7D8D6";
    $.HealthBtn.backgroundColor = "#B7D8D6";
}

function showSchedule(){
    $.homeContent.visible=false;
    $.HomeBtn.backgroundColor = "#B7D8D6" ;
    $.ScheduleBtn.backgroundColor = "#789E9E";
    $.HealthBtn.backgroundColor = "#B7D8D6";
}

function showHealth(){
    $.homeContent.visible=false;
    $.HomeBtn.backgroundColor = "#B7D8D6" ;
    $.ScheduleBtn.backgroundColor = "#B7D8D6";
    $.HealthBtn.backgroundColor = "#789E9E";
}

$.mainWindow.open()