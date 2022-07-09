const backgroundImage = document.querySelector(".bg-image");
const musicContainer = document.querySelector(".music-container");
const coverPhoto = document.getElementById("cover-photo");
const musicTitle = document.getElementById("title");
const music = document.getElementById("audio");
const progressBar = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-bar-container");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const playPauseBtn = document.getElementById("play-pause");
const playIcon = playPauseBtn.querySelector("i");
const songDuration = document.getElementById('duration')
const songCurrentTime = document.getElementById('currentTime')

//window.addEventListener('load',()=> music.play())
let songDetails = [
  {
    title: "Sunflower",
    src: "music/sunflower.mp3",
    cover: "images/sunflower.jpg",
  },
  {
    title: "Bad Guy",
    src: "music/bad guy.mp3",
    cover: "images/badguy.jpg",
  },
  {
    title: "Happier",
    src: "music/happier.mp3",
    cover: "images/happier.png",
  },
];

let songIndex = 0;
//console.log(songDetails[songIndex]);
loadSong(songIndex);

function loadSong(index) {
  musicTitle.innerHTML = songDetails[index].title;
  coverPhoto.src = songDetails[index].cover;
  music.src = songDetails[index].src;
  backgroundImage.style.backgroundImage =
    "url(" + songDetails[index].cover + ")";

    //setTime()
}

function playSong() {
  playIcon.classList.contains("fa-play");
  //console.log('yes');
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
  music.play();
  
}

function pauseSong() {
  playIcon.classList.contains("fa-play");
  //console.log('yes');
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  music.pause();
}

function nextSong(n) {
  music.currentTime = 0;
  progressBar.style.width = 0;

  let next = (songIndex += n);
  if (next >= songDetails.length - 1) {
    songIndex = -1;
  }
  loadSong(next);
  if (musicContainer.classList.contains("play")) {
    playSong();
  }
}

function prevSong(n) {
  let next = (songIndex -= n);

  if (next >= songDetails.length - 1) {
    songIndex = n;
  }

  //console.log(next);
  loadSong(next);
  if (musicContainer.classList.contains("play")) {
    playSong();
  }
}

function calcDuration(dur) {
  let minute = Math.floor(dur / 60);
  let seconds = Math.round(dur % 60)
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if(isNaN(minute) || isNaN(seconds)){
    return "-- : --"
  }

  return minute + " : " + seconds;
}

function setPressed(e) {
  let width = this.clientWidth;
  let clickedX = e.offsetX;
  let duration = music.duration;

  music.currentTime = (clickedX / width) * duration;
  //console.log(clickedX);
}

playPauseBtn.addEventListener("click", (e) => {
  let isPlaying = musicContainer.classList.contains("play");
  // console.log(isPlaying)
  if (isPlaying) {
    musicContainer.classList.remove("play");
    pauseSong();
  } else {
    musicContainer.classList.add("play");
    playSong();
  }
});

music.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  songDuration.innerHTML = calcDuration(music.duration)
  songCurrentTime.innerHTML = calcDuration(currentTime)

});

progressContainer.addEventListener("click", setPressed);

music.addEventListener("ended", function () {
  nextSong(1);
  music.play();
});

music.onloadstart = () =>{
    document.querySelector('.loader').style.display = 'block'  
}
music.onloadeddata = () =>{
    //console.log('loader');
    document.querySelector('.loader').style.display = 'none'
   
}