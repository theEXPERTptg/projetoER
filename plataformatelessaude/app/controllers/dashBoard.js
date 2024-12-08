var currentDate = new Date();
var currentDay = currentDate.getDay();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

var init = true;

function highlightCurrentDay() {

    clearAllHighlights();

    var today = new Date();
    var todayDay = today.getDate();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();

    if (currentMonth === todayMonth && currentYear === todayYear) {
        var rows = [$.row1, $.row2, $.row3, $.row4, $.row5];

        // Loop through each row and each day cell to find today's date
        rows.forEach(row => {
            row.children.forEach(dayCell => {
                var label = dayCell.children[0].children[0]; 
                // .calendarDayNumber -> .calendarDayLabel

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
    $.schedule.visible=false;
    $.HomeBtn.backgroundColor = "#B7D8D6" ;
    $.ScheduleBtn.backgroundColor = "#B7D8D6";
    $.HealthBtn.backgroundColor = "#789E9E";
}

// Called when user taps the previous month arrow
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    populateCalendar(currentMonth, currentYear);
    highlightCurrentDay();
}

// Called when user taps the next month arrow
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    populateCalendar(currentMonth, currentYear);
    highlightCurrentDay();
}
function newAppointment(){
    alert("NOT IMPLEMENTED - newAppointment")
}

function appointmentHistory(){
    alert("NOT IMPLEMENTED - appointmentHistory")
}

function selectDay(e) {
    var allRows = $.scheduleCalendar.children.filter((element) => 
        element.id && element.id.includes("row")
    );
    allRows.forEach(row => {
        row.children.forEach(dayView => {
            dayView.backgroundColor = "#B7D8D6"; // reset background
        });
    });

    var dayUI = e.source.parent; 
    if (e.source instanceof Ti.UI.Label) {
        // if the event source is the label, the calendarDay view is a parent of a parent
        dayUI = e.source.parent.parent;
    }

    // Re-highlight today's date if on the current month and year
    highlightCurrentDay();

    // Highlight the selected day
    dayUI.backgroundColor = '#789E9E';

    // Get the selected day's number
    var label = dayUI.children[0].children[0];
    var selectedDay = label.text;

    if (selectedDay) {
        var selectedDate = new Date(currentYear, currentMonth, selectedDay);
        var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        var weekdayName = weekdays[selectedDate.getDay()];

        $.consultationListDateLabel.text = selectedDay + " " + getMonthName(currentMonth) + " - " + weekdayName;
    }
}



/**
 * Dynamically populate the calendar for a given month and year.
 * month: 0-based index (0 = January, 11 = December)
 * year: full year (e.g. 2024)
 */
function populateCalendar(month, year) {
    // Get the first day of the month (0 = Sunday)
    var firstDay = new Date(year, month, 1).getDay();
    // Get total days in month
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    // Rows
    var rows = [$.row1, $.row2, $.row3, $.row4, $.row5];

    var currentDay = 1;
    for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        var dayCells = row.children; // Each of these is a .calendarDay view
        for (var c = 0; c < dayCells.length; c++) {
            var dayCell = dayCells[c];
            var label = dayCell.children[0].children[0]; 
            // children[0] is .calendarDayNumber, children[0].children[0] is the Label .calendarDayLabel

            var cellIndex = r * 7 + c; // index in the full 5-row * 7-cols grid
            if (cellIndex < firstDay || currentDay > daysInMonth) {
                label.text = "";
            } else {
                label.text = currentDay;
                currentDay++;
            }
        }
    }

    // Update the month/year label
    $.currentMonthAndYear.children[0].text = getMonthName(month) + " " + year;
    if (init ){
        updateConsultationDateLabel(new Date());
        init = false;
    }
}

function getMonthName(monthIndex) {
    var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return monthNames[monthIndex];
}
function updateConsultationDateLabel(date) {
    var selectedDay = date.getDate();
    var selectedMonth = date.getMonth();
    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var weekdayName = weekdays[date.getDay()];

    // Update the label with the correct date and weekday
    $.consultationListDateLabel.text = selectedDay + " " + getMonthName(selectedMonth) + " - " + weekdayName;
}

populateCalendar(currentMonth, currentYear);
highlightCurrentDay();



showSchedule();


