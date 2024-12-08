var currentDate = new Date();
var currentDay = currentDate.getDay();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

//MONTHS ARE FROM 0 TO 11
var appointments = {
    "consultations": [
        {
            "doctorName": "Dr. John Doe",
            "specialisation": "Cardiology",
            "day": 9,
            "month": 11, // December (0-based)
            "year": 2024,
            "startTime": "13:15",
            "endTime": "14:00"
        },
        {
            "doctorName": "Dr. Jane Smith",
            "specialisation": "Dermatology",
            "day": 8,
            "month": 11, // December (0-based)
            "year": 2024,
            "startTime": "10:00",
            "endTime": "10:30"
        },
        {
            "doctorName": "Dr. Alice Johnson",
            "specialisation": "Pediatrics",
            "day": 6,
            "month": 11,
            "year": 2024,
            "startTime": "14:00",
            "endTime": "14:30"
        },
        {
            "doctorName": "Dr. Sarah Lee",
            "specialisation": "Cardiology",
            "day": 13,
            "month": 11,
            "year": 2024,
            "startTime": "10:30",
            "endTime": "11:00"
        },
        {
            "doctorName": "Dr. Robert Brown",
            "specialisation": "Orthopedics",
            "day": 7,
            "month": 0,
            "year": 2025,
            "startTime": "15:15",
            "endTime": "15:45"
        },
        {
            "doctorName": "Dr. Sarah Lee",
            "specialisation": "Cardiology",
            "day": 26,
            "month": 11,
            "year": 2024,
            "startTime": "11:30",
            "endTime": "12:00"
        },
        {
            "doctorName": "Dr. Alice Johnson",
            "specialisation": "Pediatrics",
            "day": 26,
            "month": 11,
            "year": 2024,
            "startTime": "16:15",
            "endTime": "16:45"
        },
        {
            "doctorName": "Dr. Michael Green",
            "specialisation": "Dermatology",
            "day": 6,
            "month": 0,
            "year": 2025,
            "startTime": "15:30",
            "endTime": "16:00"
        },
        {
            "doctorName": "Dr. Michael Green",
            "specialisation": "Dermatology",
            "day": 15,
            "month": 11,
            "year": 2024,
            "startTime": "14:30",
            "endTime": "15:00"
        },
        {
            "doctorName": "Dr. Michael Green",
            "specialisation": "Dermatology",
            "day": 11,
            "month": 11,
            "year": 2024,
            "startTime": "16:45",
            "endTime": "17:00"
        },
        {
            "doctorName": "Dr. Robert Brown",
            "specialisation": "Orthopedics",
            "day": 11,
            "month": 0,
            "year": 2025,
            "startTime": "16:15",
            "endTime": "16:45"
        },
        {
            "doctorName": "Dr. Alice Johnson",
            "specialisation": "Pediatrics",
            "day": 28,
            "month": 11,
            "year": 2024,
            "startTime": "12:45",
            "endTime": "13:00"
        }
    ]
};

var init = true;

function highlightCurrentDay() {
    clearAllHighlights();

    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();

    if (currentMonth === todayMonth && currentYear === todayYear) {
        var rows = [$.row1, $.row2, $.row3, $.row4, $.row5];
        rows.forEach(row => {
            row.children.forEach(dayCell => {
                var label = dayCell.children[0].children[0];
                if (label.text == todayDay) {
                    dayCell.backgroundColor = '#FFB74D';  // Highlight today's date
                }
            });
        });
    }
}

function clearAllHighlights() {
    var allRows = $.scheduleCalendar.children.filter((element) =>
        element.id && element.id.startsWith("row")
    );

    allRows.forEach(row => {
        row.children.forEach(dayView => {
            dayView.backgroundColor = "#B7D8D6"; // Reset to default background
        });
    });
}

function showHome() {
    $.schedule.visible = false;
    $.homeContent.visible = true;
    $.HomeBtn.backgroundColor = "#789E9E";
    $.ScheduleBtn.backgroundColor = "#B7D8D6";
    $.HealthBtn.backgroundColor = "#B7D8D6";
}

function showSchedule() {
    $.homeContent.visible = false;
    $.schedule.visible = true;
    $.HomeBtn.backgroundColor = "#B7D8D6";
    $.ScheduleBtn.backgroundColor = "#789E9E";
    $.HealthBtn.backgroundColor = "#B7D8D6";
}

function showHealth() {
    $.homeContent.visible = false;
    $.schedule.visible = false;
    $.HomeBtn.backgroundColor = "#B7D8D6";
    $.ScheduleBtn.backgroundColor = "#B7D8D6";
    $.HealthBtn.backgroundColor = "#789E9E";
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    populateCalendar(currentMonth, currentYear);
    highlightCurrentDay();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    populateCalendar(currentMonth, currentYear);
    highlightCurrentDay();
}

function newAppointment() {
    alert("NOT IMPLEMENTED - newAppointment");
    $.consultationList.visible = false;
    $.scheduleScheduleConsultation.visible = true;

}

function appointmentHistory() {
    alert("NOT IMPLEMENTED - appointmentHistory");
}

function joinCall() {
    alert("NOT IMPLEMENTED - joinCall");
}

function rescheduleConsultation() {
    alert("NOT IMPLEMENTED - rescheduleConsultation");
}

function cancelConsultation() {
    alert("NOT IMPLEMENTED - cancelConsultation");
}

function selectDay(e) {
    $.scheduleScheduleConsultation.visible=false;
    var allRows = $.scheduleCalendar.children.filter((element) =>
        element.id && element.id.includes("row")
    );
    allRows.forEach(row => {
        row.children.forEach(dayView => {
            dayView.backgroundColor = "#B7D8D6"; // reset background
        });
    });

    var dayUI = e.source.parent;
    if (e.source instanceof Ti.UI.Label || e.source.backgroundColor === "red") {
        // if the event source is the label, the calendarDay view is a parent of a parent
        dayUI = e.source.parent.parent;
    }

    highlightCurrentDay();
    dayUI.backgroundColor = '#789E9E';

    var label = dayUI.children[0].children[0];
    var selectedDay = label.text;

    if (selectedDay) {
        var selectedDate = new Date(currentYear, currentMonth, selectedDay);
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var weekdayName = weekdays[selectedDate.getDay()];
        $.consultationListDateLabel.text = selectedDay + " " + getMonthName(currentMonth) + " - " + weekdayName;
        updateConsultationList(selectedDate);
    }
}

function populateCalendar(month, year) {
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var rows = [$.row1, $.row2, $.row3, $.row4, $.row5];

    var currentDayCounter = 1;
    for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        var dayCells = row.children;
        for (var c = 0; c < dayCells.length; c++) {
            var dayCell = dayCells[c];
            var label = dayCell.children[0].children[0];
            var eventMarkersContainer = dayCell.children[1];
            eventMarkersContainer.removeAllChildren();
            var cellIndex = r * 7 + c;
            
            if (cellIndex < firstDay || currentDayCounter > daysInMonth) {
                label.text = "";
            } else {
                label.text = currentDayCounter;

                // Check if there are consultations this day and show a dot if so
                var dailyConsultations = getConsultationsByDate(currentDayCounter, month, year);
                if (dailyConsultations.length > 0) {
                    var dot = Ti.UI.createView({
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "red",
                        bottom: 5
                    });
                    eventMarkersContainer.add(dot);
                }

                currentDayCounter++;
            }
        }
    }

    $.currentMonthAndYear.children[0].text = getMonthName(month) + " " + year;
    if (init) {
        updateConsultationDateLabel(new Date());
        updateConsultationList(new Date()); // show current day's consultations at start
        init = false;
    }
}


function getMonthName(monthIndex) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
}

function updateConsultationDateLabel(date) {
    var selectedDay = date.getDate();
    var selectedMonth = date.getMonth();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekdayName = weekdays[date.getDay()];
    $.consultationListDateLabel.text = selectedDay + " " + getMonthName(selectedMonth) + " - " + weekdayName;
}

// Directly filter from local `appointments`
function getConsultationsByDate(day, month, year) {
    return appointments.consultations.filter(function (consultation) {
        return consultation.day === day && consultation.month === month && consultation.year === year;
    });
}

function updateConsultationList(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    // Remove existing consultations
    $.consultationList.removeAllChildren();

    var consultations = getConsultationsByDate(day, month, year);

    consultations.forEach(function (consultation) {
        var consultationView = Ti.UI.createView({
            layout: "horizontal",
            height: "80%",
            borderColor: "black",
            borderWidth: 1
        });

        var timeView = Ti.UI.createView({
            width: "30%",
            layout: 'vertical',
        });

        var empty = Ti.UI.createLabel();
        var startTimeLabel = Ti.UI.createLabel({ text: "[" + consultation.startTime + "]", color: "black" });
        var dashLabel = Ti.UI.createLabel({ text: "-", color: "black" });
        var endTimeLabel = Ti.UI.createLabel({ text: "[" + consultation.endTime + "]", color: "black" });

        timeView.add(empty)
        timeView.add(startTimeLabel);
        timeView.add(dashLabel);
        timeView.add(endTimeLabel);

        var infoView = Ti.UI.createView({
            left_: "30%",
            width: "70%",
            layout: "vertical"
        });

        var infoTextView = Ti.UI.createView({
            height:"50%",
            layout: "horizontal"
        });

        var consultationColor = Ti.UI.createView({
            top: "35%",
            left:"10%",
            width:"5%",
            height:"30%",
            backgroundColor:"blue"	
        });

        var infoTextLabel = Ti.UI.createLabel({
            top:"30%",
            left:"5%",
            color:"black",
            text: consultation.specialisation + " - " + consultation.doctorName
        });

        infoTextView.add(consultationColor);
        infoTextView.add(infoTextLabel);

        var btnsView = Ti.UI.createView({
            width:"70%",
            left:"30%",
            layout: "horizontal"
        });

        var joinCallBtn = Ti.UI.createButton({
            width: "20%",
            height: "80%",
            top:"10%",
            left: "10%",
            right: "0%",
            backgroundColor: "green"
        });
        joinCallBtn.addEventListener('click', joinCall);
        var rescheduleBtn = Ti.UI.createButton({
            width: "20%",
            height: "80%",
            top:"10%",
            left: "10%",
            right: "0%",
            backgroundColor: "yellow"
        });
        rescheduleBtn.addEventListener('click', rescheduleConsultation);
        var cancelBtn = Ti.UI.createButton({
            width: "20%",
            height: "80%",
            top:"10%",
            left: "10%",
            right: "0%",
            backgroundColor: "red"
        });
        cancelBtn.addEventListener('click', cancelConsultation);
        btnsView.add(joinCallBtn);
        btnsView.add(rescheduleBtn);
        btnsView.add(cancelBtn);

        infoView.add(infoTextView);
        infoView.add(btnsView);

        consultationView.add(timeView);
        consultationView.add(infoView);

        $.consultationList.add(consultationView);
    });
}

// Initial setup
populateCalendar(currentMonth, currentYear);
highlightCurrentDay();
showSchedule();


