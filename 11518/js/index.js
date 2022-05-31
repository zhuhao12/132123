// task add / edit dom
let title = document.getElementById("title"),
    taskCard = document.getElementById("taskCard"),
    dueDay = document.getElementById("dueDay"),
    time = document.getElementById("time"),
    content = document.getElementById("content"),
    priority = document.querySelectorAll(".priority span"),
    indexAdd = document.querySelector(".index-add"),
    indexCancel = document.querySelector(".index-cancel"),
    indexClose = document.querySelector(".index-close"),
    indexContentTitle = document.querySelector(".index-content-title"),
    modal = document.querySelector(".modal"),
    mask = document.querySelector(".mask");
// task list dom
let main = document.getElementById("main");

let monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


window.onload = function () {
    // get localStorage taskInfo
    let taskInfo = localStorage.getItem("taskInfo");
    if (taskInfo == null) {
        let taskInfoArr = [
            {
                id: 0,
                name: "daily1",
                data: []
            },
            {
                id: 1,
                name: "daily2",
                data: []
            },
            {
                id: 2,
                name: "daily3",
                data: []
            },
            {
                id: 3,
                name: "daily4",
                data: []
            }
        ];
        localStorage.setItem("taskInfo", JSON.stringify(taskInfoArr));
    }
    createTask(taskInfo);
    taskCardOption();
}

function createTask(params) {
    let taskInfo = params ? JSON.parse(params) : JSON.parse(localStorage.getItem("taskInfo"));
    main.innerHTML = "";
    if (taskInfo.length > 0) {
        taskInfo.forEach((v, i) => {
            let { name, data, id } = v;
            let mainCon = document.createElement("div");
            mainCon.classList.add("main-con");
            let mainConHead = document.createElement("div");
            mainConHead.classList.add("main-con-head");
            let _span1 = document.createElement("span");
            _span1.innerHTML = name;
            let _span2 = document.createElement("span");
            _span2.innerHTML = (i + 1);
            mainConHead.appendChild(_span1);
            mainConHead.appendChild(_span2);
            mainCon.appendChild(mainConHead);
            if (data.length > 0) {
                data.forEach((vItem, iIndex) => {
                    let { aid, title, priority, content, time, dueDay } = vItem;
                    let _item = document.createElement("div");
                    _item.classList.add("item");
                    _item.setAttribute("onclick", "editTaskInfo(" + id + ", " + aid + ")");
                    let itemHead = document.createElement("div");
                    itemHead.classList.add("item-head");
                    let _span3 = document.createElement("span");
                    _span3.classList.add("item-title");
                    _span3.innerHTML = title;
                    let _span4 = document.createElement("span");
                    _span4.classList.add("item-tag");
                    _span4.classList.add(priority);
                    _span4.innerHTML = priority;
                    itemHead.appendChild(_span3);
                    itemHead.appendChild(_span4);
                    let _span5 = document.createElement("span");
                    _span5.classList.add("item-desc");
                    _span5.innerHTML = content;
                    let itemFooter = document.createElement("div");
                    itemFooter.classList.add("item-footer");
                    let _span6 = document.createElement("span");
                    _span6.classList.add("item-time");
                    if(time.length > 0)  _span6.classList.add("active");
                    _span6.innerHTML = time;
                    let _span7 = document.createElement("span");
                    _span7.classList.add("due");
                    let days = dueDay.split("-")[2];
                    isToday(dueDay) ? _span7.innerHTML = `Today: ${monthText(dueDay)} ${days}` : _span7.innerHTML = `${name}: ${monthText(dueDay)} ${days}`;
                    itemFooter.appendChild(_span6);
                    itemFooter.appendChild(_span7);
                    _item.appendChild(itemHead);
                    _item.appendChild(_span5);
                    _item.appendChild(itemFooter);
                    mainCon.appendChild(_item);
                })
            }
            let taskAdd = document.createElement("div");
            taskAdd.classList.add("task-add");
            let _img = document.createElement("img");
            _img.src = "images/task-add.png";
            _img.setAttribute("onclick", "taskModal('block', " + id + ",'add')");
            taskAdd.appendChild(_img);
            mainCon.appendChild(taskAdd);
            main.appendChild(mainCon);
        })
    }
}

// priority forEach addClass
priorityChange();
function priorityChange() {
    priority.forEach(v => {
        v.onclick = function () {
            priority.forEach(item => item.classList.remove("active"));
            if (v.classList == "") {
                v.classList.add("active");
            }
        }
    })
}

function taskModal(params, id, status) {
    modal.style.display = params;
    if (id) {
        let taskInfo = JSON.parse(localStorage.getItem("taskInfo"));
        let optVal = taskInfo.filter(v => v.id == id);
        if (optVal.length > 0) {
            taskCard.value = optVal[0].name;
        }
    }
    if (status == "add") {
        indexContentTitle.innerHTML = "Add Task";
        indexAdd.innerHTML = "Add";
    } else {
        indexContentTitle.innerHTML = "Edit Task";
        indexAdd.innerHTML = "Edit";
    }
}

// modal task create taskCard
function taskCardOption() {
    let taskInfo = JSON.parse(localStorage.getItem("taskInfo"));
    taskInfo.forEach(v => {
        let opt = document.createElement("option");
        opt.innerHTML = v.name;
        opt.setAttribute("value", v.name);
        taskCard.appendChild(opt);
    })
}

// modal task reset form
function indexReset() {
    title.value = "";
    taskCard.value = document.querySelectorAll("#taskCard option")[0].value;
    dueDay.value = "";
    time.value = "";
    content.value = "";
    priority.forEach(item => item.classList.remove("active"));
    priority[0].classList.add("active");
    taskModal('none');
}

let modalId, modalAid;

function editTaskInfo(id, aid) {
    modalId = id;
    modalAid = aid;
    let taskInfo = JSON.parse(localStorage.getItem("taskInfo"));
    title.value = taskInfo[id].data[aid].title;
    taskCard.value = taskInfo[id].name;
    dueDay.value = taskInfo[id].data[aid].dueDay;
    time.value = taskInfo[id].data[aid].time;
    content.value = taskInfo[id].data[aid].content;
    priority.forEach(item => {
        item.classList.remove("active");
        if (item.innerHTML == taskInfo[id].data[aid].priority) {
            item.classList.add("active")
        }
    });
    taskModal('block', '', 'edit');
    console.log(id, aid)
}

// task add / edit
indexAdd.addEventListener("click", () => {
    let priorityVal;
    let taskInfo = JSON.parse(localStorage.getItem("taskInfo"));
    // rule
    if (title.value == "") {
        alert("Title muse be enter");
        return;
    }
    if (dueDay.value == "") {
        alert("Due Day muse be choose");
        return;
    }
    if (content.value == "") {
        alert("Content muse be enter");
        return;
    }

    priority.forEach(v => {
        if (v.classList.length > 0) return priorityVal = v.innerHTML;
    })

    if (priorityVal == "") {
        alert("Priority muse be choose");
        return;
    }

    taskInfo.forEach(v => {
        if (v.name == taskCard.value) {
            v.data.push({
                "aid": v.data.length > 0 ? v.data.length : 0,
                "title": title.value,
                "dueDay": dueDay.value,
                "time": time.value,
                "content": content.value,
                "priority": priorityVal,
                "timestamp": Date.parse(new Date())
            })
        }
    })
    // save data
    localStorage.setItem("taskInfo", JSON.stringify(taskInfo));
    taskModal('none');
    indexReset();
    createTask();
})

// task cancel
indexCancel.addEventListener("click", () => {
    indexReset();
})

// task modal close
indexClose.addEventListener("click", () => {
    taskModal('none');
})

// task modal hide
mask.addEventListener("click", () => {
    taskModal('none');
})

// 判断是否是今天
function isToday(val) {
    return new Date().setHours(0, 0, 0, 0) == new Date(val).setHours(0, 0, 0, 0)
}

// get month function
function monthText(val) {
    var tempDate = new Date(val)
    return monthArr[tempDate.getMonth()];
}
