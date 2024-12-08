

function onClick(){
    alert("A tua prima");
}

function showHome(){
    $.schedule.visible=false;
    $.homeContent.visible=true;

    $.HomeBtn.backgroundColor = "#789E9E" ;
    $.ScheduleBtn.backgroundColor = "#B7D8D6";
    $.HealthBtn.backgroundColor = "#B7D8D6";
}

function showSchedule(){
    $.homeContent.visible=false;
    $.schedule.visible=true;
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

function prevMonth(){
    alert("NOT IMPLEMENTED - prevMonth")
}

function nextMonth(){
    alert("NOT IMPLEMENTED - nextMonth")
}

function newAppointment(){
    alert("NOT IMPLEMENTED - newAppointment")
}

function appointmentHistory(){
    alert("NOT IMPLEMENTED - appointmentHistory")
}


function selectDay(e){
    var allDays = $.scheduleCalendar.children;

   
   

    allDays = allDays.filter((element) => element.id.includes( "row"));
    allDays.forEach(element => {
        element.children.forEach(e => e.backgroundColor ="#B7D8D6")
    });

    var dayUI = e.source.parent; 
    if(e.source instanceof Ti.UI.Label){
        dayUI = e.source.parent.parent;
    }

    dayUI.backgroundColor = '#789E9E'; 
}
