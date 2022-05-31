let musicIcon = document.querySelector(".music-icon"),
    audio = document.getElementById("audio"),
    fixedMaskMusic = document.querySelector(".fixed-mask"),
    modalMusic = document.querySelector(".modal-music"),
    musicClose = document.querySelector(".music-close"),
    musicCover = document.querySelector(".music-cover"),
    authors = document.querySelector(".author"),
    names = document.querySelector(".name"),
    memories = document.querySelector(".memories"),
    musicList = document.querySelector(".music-list"),
    musicCon = document.querySelector(".music-con"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    nextSong = document.querySelector(".next-song"),
    prevSong = document.querySelector(".prev-song"),
    playPause = document.querySelector(".play-pause");

let musicNum = 0;
let musicArr = [
    {
        id: 0,
        name: "霓虹",
        author: "PO8",
        src: "music/PO8 - 霓虹.mp3",
        imgs: "images/霓虹.png"
    },
    {
        id: 1,
        name: "It Ain't Me",
        author: "Kygo,Selena Gomez",
        src: "music/Kygo,Selena Gomez - It Ain't Me.mp3",
        imgs: "images/It Ain't Me.png"
    },
    {
        id: 2,
        name: "Oxygen",
        author: "Colbie Caillat",
        src: "music/Colbie Caillat - Oxygen.mp3",
        imgs: "images/Oxygen.png"
    }
]
initPlayer(musicNum);
audioHandle();
createMusic();

musicIcon.addEventListener("click", () => {
    fixedMaskMusic.style.display = "block";
    modalMusic.style.display = "block";
    // initMemories();
})

musicClose.addEventListener("click", () => {
    fixedMaskMusic.style.display = "none";
    modalMusic.style.display = "none";
})

// next play
next.addEventListener("click", nextHandle);
// prev play
prev.addEventListener("click", prevHandle);
// next play
nextSong.addEventListener("click", nextHandle);
// prev play
prevSong.addEventListener("click", prevHandle);
// memories
// memories.addEventListener("click", initMemories);

// Tap play / pause audio
playPause.addEventListener('click', () => {
    if (!audio.paused) {
        playPause.src = 'images/play.png'
        audio.pause();
    } else {
        playPause.src = 'images/zanting.png'
        audio.play();
    }
})

let progressBars, progresss, currentAudio;
// 拖动音频
document.addEventListener('mousedown', (e) => {
    if (e.target.className.includes('progress-dragger')) {
        progressBars = e.target.parentNode
        progresss = progressBars.parentNode
        currentAudio = audio;
        document.addEventListener('mousemove', dragHandler)
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', dragHandler)
        })
    }
})
const dragHandler = (e) => {
    const progressClinetW = progresss.clientWidth;
    const startPos = progresss.getBoundingClientRect().left;
    const endPos = progresss.getBoundingClientRect().right;
    const pageX = e.pageX;
    const width = Math.max(startPos, Math.min(pageX, endPos)) - startPos;
    progressBars.style.width = width + 'px';
    const currentTime = width / progressClinetW * currentAudio.duration;
    currentAudio.currentTime = currentTime;
}

function initPlayer(musicNum) {
    let { imgs, author, name, src } = musicArr[musicNum];
    musicCover.src = imgs;
    authors.innerHTML = author;
    names.innerHTML = name;
    audio.src = src; //music audio
}

function createMusic() {
    musicCon.innerHTML = "";
    if (musicArr.length > 0) {
        musicArr.forEach(v => {
            let { id, name, author, imgs } = v;
            let _li = document.createElement("li");
            if (musicNum == id) _li.classList.add("active");
            _li.setAttribute("onclick", "changeMusic(" + id + ")");
            let _img = document.createElement("img");
            _img.src = imgs;
            let _div = document.createElement("div");
            _div.classList.add("music-list-content");
            let _p1 = document.createElement("p");
            _p1.classList.add("title");
            _p1.innerHTML = name;
            let _p2 = document.createElement("p");
            _p2.classList.add("author");
            _p2.innerHTML = author;
            _div.appendChild(_p1);
            _div.appendChild(_p2);
            _li.appendChild(_img);
            _li.appendChild(_div);
            musicCon.appendChild(_li);
        })
        memories.innerHTML = musicArr[musicNum == (musicArr.length - 1) ? 0 : musicNum + 1].name;
    }
}

function changeMusic(id) {
    initPlayer(id);
    document.querySelectorAll(".music-con li").forEach((v, i) => {
        v.classList.remove("active");
        if (id == i) {
            v.classList.add("active");
        }
    })
}

function nextHandle() {
    musicNum++;
    if (musicNum == musicArr.length) musicNum = 0;
    initPlayer(musicNum);
    audio.pause();
    playPause.src = 'images/bofang.png';
    createMusic();
}

function prevHandle() {
    musicNum--;
    if (musicNum < 0) musicNum = musicArr.length - 1;
    initPlayer(musicNum);
    audio.pause();
    playPause.src = 'images/bofang.png';
    createMusic();
}

// function initMemories() {
//     if (memories.classList == "memories") {
//         memories.classList.add("active");
//         modalMusic.style.height = "100vh";
//         musicList.style.display = "block";
//     } else {
//         memories.classList.remove("active");
//         modalMusic.style.height = "calc(100% - 50%)";
//         musicList.style.display = "none";
//     }
//     createMusic();
// }

function audioHandle() {
    const duration = document.querySelector('.duration');
    let totalTime = 0;
    audio.addEventListener('canplay', function () {
        totalTime = this.duration
        duration.innerText = secondsToMS(totalTime);
    })

    const currentDuration = document.querySelector('.current-time')
    const progressBars = document.querySelector('.progress-bar')
    audio.addEventListener('timeupdate', function () {
        const currentTime = this.currentTime;
        currentDuration.innerText = secondsToMS(currentTime);
        progressBars.style.width = (currentTime / totalTime * 100) + '%';
    })
    audio.addEventListener('ended', function () {
        playPause.src = 'images/play.png'
    })
}

// Time conversion
const secondsToMS = (seconds) => {
    const mm = (parseInt(seconds / 60) + '').padStart(2, '0');
    const ss = (parseInt(seconds % 60) + '').padStart(2, '0');
    return `${mm}:${ss}`
}

