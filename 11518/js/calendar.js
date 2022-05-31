let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    momthName = document.querySelector(".momthName"),
    dateList = document.getElementById("dateList"),
    date = document.querySelector(".date"),
    num = 0;  //set current month num

window.onload = function () {
    calender(num);
    date.innerHTML = currentDate();
}

// get current calender
function calender(n) {
    let date = new Date;
    let nowDate = date.getDate(); // Get the date today
    date.setMonth(date.getMonth() + n, 1); // Set the time to the first day of the month represented by the offset of n
    let month = date.getMonth(); // Get current month
    momthName.innerHTML = monthArr[month]; // Set title
    let week = date.getDay(); // What day of the week is the first
    let nowMonth = date.getMonth();
    // How many days are there in this month
    date.setMonth(nowMonth + 1, 0); // Set the date to the 0 day of the next month (the last day of the month)
    let allDays = date.getDate();
    let str = "";
    // Week empty Li
    for (let i = 0; i < week; i++) {
        str += "<li></li>";
    }
    // Alldays Li with date
    for (let j = 1; j <= allDays; j++) {
        // Determine whether the month is current or future
        if (n > 0) {
            // In the following months, you only need to judge the weekend
            if ((week + j) % 7 === 0 || (week + j) % 7 === 1) {
                // Judge weekend
                str += "<li class='sun'><span>" + j + "</span></li>"; // Add the current date to the quantity of blank Li to balance 7
            } else {
                str += "<li><span>" + j + "</span></li>";
            }
        } else if (n < 0) {
            // Previous date, directly add all borders
            str += "<li class='ccc'><span>" + j + "</span></li>";
        } else {
            // Current month
            if (j < nowDate) {
                // Previous date
                str += "<li class='ccc'><span>" + j + "</span></li>";
            } else if (j === nowDate) {
                // today
                str += "<li class='red'><span>" + j + "</span></li>";
            } else if ((week + j) % 7 === 0 || (week + j) % 7 === 1) {
                // Judge weekend
                // Add the current date to the quantity of blank Li to balance 7
                str += "<li class='sun'><span>" + j + "</span></li>";
            } else {
                str += "<li><span>" + j + "</span></li>";
            }
        }
    }
    dateList.innerHTML = str
}

function currentDate() {
    let mydate = new Date();
    let month = mydate.getMonth();
    let day = mydate.getDate();
    day < 10 ? `0${day}` : day;
    return `${day} ${monthArr[month]}`
}