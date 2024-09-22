const data = {
  music: [
    {
      image: "assets/img/one.jpg",
      audio: "assets/audio/Luverance - Душа моя.mp3",
      author: "Luverance",
      name: "Душа моя",
      duration: "02:55",
    },
    {
      image: "assets/img/two.jpg",
      audio: "assets/audio/The Hatters, TRITIA - Где-то там.mp3",
      author: "TRITIA",
      name: "Где-то там",
      duration: "02:58",
    },
    {
      image: "assets/img/three.jpg",
      audio: "assets/audio/Порнофильмы - Я так соскучился.mp3",
      author: "Порнофильмы",
      name: "Я так соскучился",
      duration: "06:49",
    },
    {
      image: "assets/img/four.jpg",
      audio: "assets/audio/Luverance Там где.mp3",
      author: "Luverance",
      name: "Там где",
      duration: "03:17",
    },
    {
      image: "assets/img/five.jpg",
      audio: "assets/audio/TRITIA-Города.mp3",
      author: "TRITIA",
      name: "Города",
      duration: "02:49",
    },
  ],
};

const audio = document.getElementById("song");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const currentTimeC = document.querySelector(".currentTime");
const durationTimeC = document.querySelector(".durationTime");
const cover = document.querySelector(".cover");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

let currentTrack = 0;
let isPlaying = false;

function loadTrack(track) {
  audio.src = data.music[track].audio;
  cover.src = data.music[track].image;
  trackTitle.textContent = data.music[track].name;
  trackArtist.textContent = data.music[track].author;
  durationTimeC.textContent = data.music[track].duration;
}

function playPauseTrack() {
  if (isPlaying) {
    audio.pause();
      play.src = 'assets/icon/play.png';
  } else {
    audio.play();
      play.src = 'assets/icon/stop.png';
  }
  isPlaying = !isPlaying;
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % data.music.length;
  loadTrack(currentTrack);
  if (isPlaying) {
    audio.play();
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + data.music.length) % data.music.length;
  loadTrack(currentTrack);
  if (isPlaying) {
    audio.play();
  }
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audio.addEventListener("timeupdate", () => {
  const { duration, currentTime } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;
  currentTimeC.textContent = formatTime(currentTime);
});

progressBar.addEventListener("input", () => {
  const { duration } = audio;
  const time = (progressBar.value * duration) / 100;
  audio.currentTime = time;
});

playBtn.addEventListener("click", playPauseTrack);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

loadTrack(currentTrack);
