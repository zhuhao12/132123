let timerIcon = document.querySelector(".timer-icon"),
    showTime = document.querySelector(".showTime"),
    fixedMaskTimer = document.querySelector(".fixed-mask"),
    modalTimer = document.querySelector(".modal-timer"),
    timerClose = document.querySelector(".timer-close"),
    timerTitleSet = document.querySelector(".timer-title-set"),
    savetimeMacReduce = document.querySelector(".savetimeMac-reduce"),
    savetimeMacTime = document.querySelector(".savetimeMac-time"),
    savetimeMacAdd = document.querySelector(".savetimeMac-add"),
    quickSet = document.querySelector(".quickSet"),
    savetimeMacQuickSet = document.querySelector(".savetimeMac-quickSet"),
    savetimeMacStart = document.querySelector(".savetimeMac-start"),
    savetimeMacFinish = document.querySelector(".savetimeMac-finish"),
    savetimeMacBegin = document.querySelector(".savetimeMac-begin"),
    progessMain = document.querySelector("#progess-main"),
    progessPercent = document.querySelector("#progess-percent")
    changeTimer = document.querySelector(".change-timer"),
    savetimeMac = document.querySelector(".savetimeMac"),
    stopwatch = document.querySelector(".stopwatch"),
    stopwatchh = document.querySelector(".stopwatch-h"),
    stopwatchs = document.querySelector(".stopwatch-s"),
    stopwatchm = document.querySelector(".stopwatch-m"),
    stopwatchStart = document.querySelector(".stopwatch-start"),
    stopwatchStop = document.querySelector(".stopwatch-stop"),
    stopwatchReset = document.querySelector(".stopwatch-reset"),
    stopwatchP1 = document.querySelector(".stopwatch-p1"),
    stopwatchP2 = document.querySelector(".stopwatch-p2");

let flag = 0;  //0:SavetimeMAC 1:Stopwatch
let startFlag = false; //Start or not
let savetime = 30;
let timer = null;
let savetimeSession = savetime * 60;
let progessMainWidth;  // progess width

let stopwatchH = 0;
let stopwatchM = 0;
let stopwatchS = 0;

if(flag == 0) {
    savetimeMac.style.display = "block";
    stopwatch.style.display = "none";
    timerTitleSet.innerHTML = "SavetimeMAC"
} else {
    savetimeMac.style.display = "none";
    stopwatch.style.display = "block";
    timerTitleSet.innerHTML = 'Stopwatch Timer';
}

timerIcon.addEventListener("click", ()=> {
    fixedMaskTimer.style.display = "block";
    modalTimer.style.display = "block";
})

timerClose.addEventListener("click", () => {
    fixedMaskTimer.style.display = "none";
    modalTimer.style.display = "none";
})

savetimeMacReduce.addEventListener("click", () => {
    if (savetime == 0) return;
    savetime = parseInt(savetime) - 5;
    savetimeSession = parseInt(savetime) * 60;
    savetime < 10 ? savetime = `0${savetime}` : `${savetime}`;
    savetimeMacTime.innerHTML = `${savetime}:00`
})

savetimeMacAdd.addEventListener("click", () => {
    savetime = parseInt(savetime) + 5;
    savetimeSession = parseInt(savetime) * 60;
    savetime < 10 ? savetime = `0${savetime}` : `${savetime}`;
    savetimeMacTime.innerHTML = `${savetime}:00`;
})

savetimeMacQuickSet.addEventListener("click", () => {
    savetime = 30;
    savetimeSession = parseInt(savetime) * 60;
    savetimeMacTime.innerHTML = `${savetime}:00`;
})

savetimeMacStart.addEventListener("click", () => {
    startFlag = true;
    savetimeMacStart.style.display = "none";
    savetimeMacReduce.style.display = "none";
    savetimeMacAdd.style.display = "none";
    quickSet.style.display = "none";
    savetimeMacFinish.style.display = "inline-block";
    savetimeMacBegin.style.display = "block";
    timer = setInterval("countDownSavetimeMac()", 1000);
    progessMainWidth = progessMain.offsetWidth;
})

savetimeMacFinish.addEventListener("click", () => {
    startFlag = false;
    clearInterval(timer);
    savetime = 30;
    savetimeMacTime.innerHTML = "30:00";
    showTime.innerHTML = "30:00";
    savetimeMacStart.style.display = "inline-block";
    savetimeMacReduce.style.display = "block";
    savetimeMacAdd.style.display = "block";
    quickSet.style.display = "block";
    savetimeMacFinish.style.display = "none";
    savetimeMacBegin.style.display = "none";
})

changeTimer.addEventListener("click", () => {
    if(startFlag) {
        let val = confirm(`Cancel ${flag == 0 ? 'SavetimeMAC' : 'Stopwatch'} task`)
        if(val) changeTimerHandle();
    } else {
        changeTimerHandle()
    }
})

function changeTimerHandle() {
    startFlag = false;
    if(flag == 0) {
        flag = 1;
        timerTitleSet.innerHTML = 'Stopwatch Timer';
        savetimeMac.style.display = "none";
        stopwatch.style.display = "block";
        showTime.innerHTML = "00:00:00";
        stopwatchh.innerHTML = "00";
        stopwatchs.innerHTML = "00";
        stopwatchm.innerHTML = "00";
        stopwatchH = 0;
        stopwatchM = 0;
        stopwatchS = 0;
        stopwatchStart.style.display = "inline-block";
        stopwatchStop.style.display = "none";
        stopwatchReset.style.display = "none";
        stopwatchP1.style.display = "block";
        stopwatchP2.style.display = "none";
    } else {
        flag = 0;
        timerTitleSet.innerHTML = "SavetimeMAC";
        savetimeMac.style.display = "block";
        stopwatch.style.display = "none";
        showTime.innerHTML = "30:00";
        savetime = 30;
        savetimeMacTime.innerHTML = "30:00";
        showTime.innerHTML = "30:00";
        savetimeMacStart.style.display = "inline-block";
        savetimeMacReduce.style.display = "block";
        savetimeMacAdd.style.display = "block";
        quickSet.style.display = "block";
        savetimeMacFinish.style.display = "none";
        savetimeMacBegin.style.display = "none";
    }
    clearInterval(timer);
}

stopwatchStart.addEventListener("click", () => {
    startFlag = true;
    stopwatchStart.style.display = "none";
    stopwatchStop.style.display = "inline-block";
    stopwatchReset.style.display = "inline-block";
    stopwatchP1.style.display = "none";
    stopwatchP2.style.display = "block";
    timer = setInterval(() => {
        let sec = stopwatchS, min = stopwatchM, hour = stopwatchH;
        if ( stopwatchS < 10) sec = "0" + stopwatchS;
        if ( stopwatchM < 10 ) min = "0" + stopwatchM;
        if ( stopwatchH < 10 )  hour = "0" + stopwatchH;
        stopwatchh.innerHTML = `${hour}`;
        stopwatchs.innerHTML = `${min}`;
        stopwatchm.innerHTML = `${sec}`;
        showTime.innerHTML = `${hour}:${min}:${sec}`;
        stopwatchS++;
        if (stopwatchS > 59){
            stopwatchS = 0;
            stopwatchM++;
        }
        if (stopwatchM > 59) {
            stopwatchS = 0;
            stopwatchM = 0;
            stopwatchH++;
        } 
    }, 1000);
});

stopwatchStop.addEventListener("click", () => {
    startFlag = false;
    clearInterval(timer);
    stopwatchStart.style.display = "inline-block";
    stopwatchStop.style.display = "none";
    stopwatchReset.style.display = "inline-block";
});

stopwatchReset.addEventListener("click", () => {
    if(startFlag || (stopwatchH > 0 || stopwatchM > 0 || stopwatchS > 0)) {
        let val = confirm("Reset required?");
        if(val) {
            startFlag = false;
            clearInterval(timer);
            stopwatchH = 0;
            stopwatchM = 0;
            stopwatchS = 0;
            showTime.innerHTML = "00:00:00";
            stopwatchStart.style.display = "inline-block";
            stopwatchStop.style.display = "none";
            stopwatchReset.style.display = "none";
            stopwatchP1.style.display = "block";
            stopwatchP2.style.display = "none";
            stopwatchh.innerHTML = "00";
            stopwatchs.innerHTML = "00";
            stopwatchm.innerHTML = "00";
        }
    }
})

function countDownSavetimeMac() {
    if (savetimeSession >= 0) {
        let minutes = Math.floor(savetimeSession / 60);
        let seconds = Math.floor(savetimeSession % 60);
        minutes < 10 ? minutes = `0${minutes}` : `${minutes}`;
        seconds < 10 ? seconds = `0${seconds}` : `${seconds}`;
        savetimeMacTime.innerHTML = `${minutes}:${seconds}`;
        showTime.innerHTML = `${minutes}:${seconds}`;
        --savetimeSession;
        progessPercent.style.width = (savetime * 60 - (parseInt(minutes) * 60 + parseInt(seconds))) / (savetime * 60) * 100 + '%';
    } else {
        clearInterval(timer);
    }
}