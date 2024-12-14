var currentDate = new Date();
var currentDay = currentDate.getDay();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

var selectedDate = new Date();
var consultationToReschedule = null;

$.userName.text = "Welcome, "+loggedInAccount.name;

//MONTHS ARE FROM 0 TO 11


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
                    dayCell.backgroundColor = '#FFB74D'; //Today highlight 
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
            dayView.backgroundColor = "#B7D8D6"; //Clear highlight
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


function appointmentHistory() {
    alert("NOT IMPLEMENTED - appointmentHistory");
}

function joinCall() {
    alert("NOT IMPLEMENTED - joinCall");
}



function cancelConsultation(e) {
    var consultationIndex = e.source.consultationIndex;

    if (typeof consultationIndex === 'number') {
        var day = selectedDate.getDate();
        var month = selectedDate.getMonth();
        var year = selectedDate.getFullYear();

        var consultations = getConsultationsByDate(day, month, year);

        if (consultationIndex >= 0 && consultationIndex < consultations.length) {
            var consultationToCancel = consultations[consultationIndex];

            var dialog = Ti.UI.createAlertDialog({
                title: "Cancel Consultation",
                message: "Are you sure you want to cancel the consultation with " + consultationToCancel.doctorName + "?",
                buttonNames: ['Yes', 'No'],
                cancel: 1
            });

            dialog.addEventListener('click', function (event) {
                if (event.index === 0) {
                    var updatedConsultations = loggedInAccount.consultations.filter(function (consultation) {
                        return !(
                            consultation.day === consultationToCancel.day &&
                            consultation.month === consultationToCancel.month &&
                            consultation.year === consultationToCancel.year &&
                            consultation.startTime === consultationToCancel.startTime &&
                            consultation.doctorName === consultationToCancel.doctorName
                        );
                    });

                    loggedInAccount.consultations = updatedConsultations;

                    populateCalendar(currentMonth, currentYear);
                    highlightCurrentDay();
                    updateConsultationList(new Date(year, month, day));

                    Ti.UI.createAlertDialog({
                        title: "Cancellation Successful",
                        message: "Your consultation with " + consultationToCancel.doctorName + " has been successfully canceled.",
                        buttonNames: ['OK']
                    }).show();
                }
            });

            dialog.show();
        } else {
            alert("Unable to find the selected consultation.");
        }
    } else {
        alert("No consultation selected for cancellation.");
    }
}


function selectDay(e) {
    $.scheduleScheduleConsultation.visible = false;

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
        dayUI = e.source.parent.parent;
    }

    highlightCurrentDay();
    dayUI.backgroundColor = '#789E9E';

    var label = dayUI.children[0].children[0];
    var selectedDay = label.text;

    if (selectedDay) {
        selectedDate = new Date(currentYear, currentMonth, selectedDay);
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
    if (init) { //at first load
        updateConsultationDateLabel(new Date());
        updateConsultationList(new Date());
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

function getConsultationsByDate(day, month, year) {
    return loggedInAccount.consultations.filter(function (consultation) {
        return consultation.day === day && consultation.month === month && consultation.year === year;
    });
}

var consultationToReschedule = null;

function updateConsultationList(date) {
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    $.consultationList.removeAllChildren();

    var consultations = getConsultationsByDate(day, month, year);

    consultations.forEach(function (consultation, i) {
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

        timeView.add(empty);
        timeView.add(startTimeLabel);
        timeView.add(dashLabel);
        timeView.add(endTimeLabel);

        var infoView = Ti.UI.createView({
            width: "70%",
            layout: "vertical"
        });

        var infoTextView = Ti.UI.createView({
            height: "50%",
            layout: "horizontal"
        });

        var consultationColor = Ti.UI.createView({
            top: "35%",
            left: "10%",
            width: "5%",
            height: "30%",
            backgroundColor: "blue"	
        });

        var infoTextLabel = Ti.UI.createLabel({
            top: "30%",
            left: "5%",
            color: "black",
            text: consultation.specialisation + " - " + consultation.doctorName
        });

        infoTextView.add(consultationColor);
        infoTextView.add(infoTextLabel);

        var btnsView = Ti.UI.createView({
            width: "70%",
            layout: "horizontal"
        });

        var joinCallBtn = Ti.UI.createButton({
            width: "20%",
            height: "80%",
            top: "10%",
            left: "10%",
            backgroundColor: "green"
        });
        joinCallBtn.addEventListener('click', joinCall);

        var rescheduleBtn = Ti.UI.createButton({
            width: "20%",
            height: "80%",
            top: "10%",
            left: "10%",
            backgroundColor: "yellow"
        });
        rescheduleBtn.consultationIndex = i; 
        rescheduleBtn.addEventListener('click', rescheduleConsultation);

        var cancelBtn = Ti.UI.createButton({
            width: "20%",
            height: "80%",
            top: "10%",
            left: "10%",
            backgroundColor: "red"
        });
        cancelBtn.consultationIndex = i; 
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

function newAppointment() {
    if (!selectedDate) {
        alert("Please select a day on the calendar first.");
        return;
    }
    $.schedulePopup.visible = true;
    $.scheduleScheduleConsultation.visible = false;

}

function cancelPopup() {
    $.schedulePopup.visible = false;
}
function confirmPopup() {
    var selectedTimeRow = $.timePicker.getSelectedRow(0);
    var selectedSpecialtyRow = $.specialtyPicker.getSelectedRow(0);
    var selectedDoctorRow = $.doctorPicker.getSelectedRow(0);

    if (!selectedTimeRow || !selectedSpecialtyRow || !selectedDoctorRow) {
        alert("Please select time, specialty, and doctor.");
        return;
    }

    var selectedTime = selectedTimeRow.title;           
    var selectedSpecialty = selectedSpecialtyRow.title; 
    var selectedDoctor = selectedDoctorRow.title;       

    var day = selectedDate.getDate();
    var month = selectedDate.getMonth();
    var year = selectedDate.getFullYear();

    var newConsultation = {
        "doctorName": selectedDoctor,
        "specialisation": selectedSpecialty,
        "day": day,
        "month": month,
        "year": year,
        "startTime": selectedTime,
        "endTime": getEndTime(selectedTime) 
    };

    loggedInAccount.consultations.push(newConsultation);

    $.schedulePopup.visible = false;

    populateCalendar(currentMonth, currentYear);
    highlightCurrentDay();
    updateConsultationList(selectedDate);
}

function getEndTime(startTime) {
    var parts = startTime.split(":");
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);

    minutes += 30;
    if (minutes >= 60) {
        hours += 1;
        minutes -= 60;
    }

    var endHours = hours < 10 ? "0" + hours : "" + hours;
    var endMinutes = minutes < 10 ? "0" + minutes : "" + minutes;
    return endHours + ":" + endMinutes;
}

function rescheduleConsultation(e) {
    var consultationIndex = e.source.consultationIndex;
    if (typeof consultationIndex === 'number') {
        var day = selectedDate.getDate();
        var month = selectedDate.getMonth();
        var year = selectedDate.getFullYear();
        var consultations = getConsultationsByDate(day, month, year);

        if (consultationIndex >= 0 && consultationIndex < consultations.length) {
            consultationToReschedule = consultations[consultationIndex];
            $.reschedulePopup.visible = true;
        } else {
            alert("Unable to find the selected consultation.");
        }
    } else {
        alert("No consultation selected for rescheduling.");
    }
}

function cancelReschedulePopup() {
    $.reschedulePopup.visible = false;
}

function confirmReschedulePopup() {
    if (!consultationToReschedule) {
        alert("No consultation selected to reschedule.");
        return;
    }

    var selectedDayRow = $.rescheduleDayPicker.getSelectedRow(0);
    var selectedMonthRow = $.rescheduleMonthPicker.getSelectedRow(0);
    var selectedYearRow = $.rescheduleYearPicker.getSelectedRow(0);
    var selectedTimeRow = $.rescheduleTimePicker.getSelectedRow(0);

    if (!selectedDayRow || !selectedMonthRow || !selectedYearRow || !selectedTimeRow) {
        alert("Please select day, month, year, and time.");
        return;
    }

    var newDay = parseInt(selectedDayRow.title, 10);
    var monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
    var newMonth = monthNames.indexOf(selectedMonthRow.title); 
    var newYear = parseInt(selectedYearRow.title, 10);
    var newTime = selectedTimeRow.title;

    consultationToReschedule.day = newDay;
    consultationToReschedule.month = newMonth;
    consultationToReschedule.year = newYear;
    consultationToReschedule.startTime = newTime;
    consultationToReschedule.endTime = getEndTime(newTime);

    $.reschedulePopup.visible = false;

    populateCalendar(currentMonth, currentYear);
    highlightCurrentDay();

    if (selectedDate && selectedDate.getDate() === newDay && selectedDate.getMonth() === newMonth && selectedDate.getFullYear() === newYear) {
        updateConsultationList(new Date(newYear, newMonth, newDay));
    }

    consultationToReschedule = null;
}


// Initial setup
populateCalendar(currentMonth, currentYear);
highlightCurrentDay();
showSchedule();

function goToProfile() {
    var profileController = Alloy.createController('profile');
    var profileWindow = profileController.getView();
    profileWindow.open(); // Abre a nova janela
}

$.userPhoto.addEventListener('click', function () {
    goToProfile();
});

