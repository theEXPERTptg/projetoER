

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


function selectDay(e){
    var allDays = $.scheduleCalendar.children.filter(child => child.class == "dayRow")

    allDays.forEach(element => {
        element.backgroundColor = "#F00";
    });

    var dayUI = e.source; 
    dayUI.backgroundColor = '#FFD700'; 
}