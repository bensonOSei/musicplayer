/**
 * Getting DOM Elements
 */

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
const songDuration = document.getElementById("duration");
const songCurrentTime = document.getElementById("currentTime");
const volumeBar = document.getElementById("volume-bar");
const volumeNumber = document.getElementById("vol-number");
const volumeUp = document.querySelector(".fa-volume-up");
const volumeDown = document.querySelector(".fa-volume-down");
const volumeValue = document.querySelector(".valumevalue");
music.valume = volumeBar.value / 100;

//Get song information
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
    title: "Infinity",
    src: "music/Infinity.mp3",
    cover: "images/carpediem.jpg",
  },
  {
    title: "Happier",
    src: "music/happier.mp3",
    cover: "images/happier.png",
  },
  {
    title: "Loading",
    src: "music/loading.mp3",
    cover: "images/carpediem.jpg",
  },
];

let songIndex = 0; //This controls the songs in [songDetails]
loadSong(songIndex); //Load song on window load


/**
 * Functions to control app
 */

function loadSong(index) {
  musicTitle.innerHTML = songDetails[index].title;
  coverPhoto.src = songDetails[index].cover;
  music.src = songDetails[index].src;
  backgroundImage.style.backgroundImage =
    "url(" + songDetails[index].cover + ")";

}

function playSong() {
  playIcon.classList.contains("fa-play");
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
  music.play();
}

function pauseSong() {
  playIcon.classList.contains("fa-play");
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

  loadSong(next);
  if (musicContainer.classList.contains("play")) {
    playSong();
  }
}

function calcDuration(dur) {
  let minute = Math.floor(dur / 60);
  let seconds = Math.round(dur % 60);
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (isNaN(minute) || isNaN(seconds)) {
    return "-- : --";
  }

  return minute + " : " + seconds;
}

function setPressed(e) {
  let width = this.clientWidth;
  let clickedX = e.offsetX;
  let duration = music.duration;

  music.currentTime = (clickedX / width) * duration;
}

function volumeValueAppear() {
  volumeValue.style.animation = "fadeIn .1s ease-in";
  volumeValue.style.opacity = "1";
  volumeValue.innerHTML = volumeBar.value;
}

function volumeValueVanish() {
  volumeValue.style.animation = "fadeOut .1s ease-Out";
  volumeValue.style.opacity = "0";
}


/**
 * Event listiners
 */
playPauseBtn.addEventListener("click", (e) => {
  let isPlaying = musicContainer.classList.contains("play");
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
  songDuration.innerHTML = calcDuration(music.duration);
  songCurrentTime.innerHTML = calcDuration(currentTime);
});

progressContainer.addEventListener("click", setPressed);

music.addEventListener("ended", function () {
  nextSong(1);
  music.play();
});

music.onloadstart = () => {
  document.querySelector(".loader").style.display = "flex";
};
music.onloadeddata = () => {
  document.querySelector(".loader").style.display = "none";
};

volumeBar.oninput = function () {
  music.volume = volumeBar.value / 100;
  volumeValue.innerHTML = volumeBar.value;
  volumeValueAppear();
};

volumeBar.addEventListener("mouseleave", () => {
  volumeValueVanish();
});

volumeUp.addEventListener("click", () => {
  volumeBar.value++;
  music.volume = volumeBar.value / 100;
  volumeValueAppear();
});

volumeUp.addEventListener("mouseleave", () => {
  volumeValueVanish();
});
volumeDown.addEventListener("click", () => {
  volumeBar.value--;
  music.volume = volumeBar.value / 100;
  volumeValueAppear();
});

volumeDown.addEventListener("mouseleave", () => {
  volumeValueVanish();
});

/**
 * Keyboard events
 */

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      prevSong(-1);
      break;
    case "ArrowRight":
      nextSong(1);
      break;
    case " ":
      let isPlaying = musicContainer.classList.contains("play");
      if (isPlaying) {
        musicContainer.classList.remove("play");
        pauseSong();
      } else {
        musicContainer.classList.add("play");
        playSong();
      }
      break;
    case "ArrowDown":
      volumeBar.value--;
      music.volume = volumeBar.value / 100;
      volumeValueAppear()
      break;
    case "ArrowUp":
      volumeBar.value++;
      music.volume = volumeBar.value / 100;
      volumeValueAppear()
      break;
  }
});

document.addEventListener('keyup',()=>{
  setTimeout(volumeValueVanish,1500)
})
