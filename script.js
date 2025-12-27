const songs = [
  {
    name: "Chill Beat",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
  },
  {
    name: "Night Vibes",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
  },
  {
    name: "Relax Flow",
    file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
  }
];

let index = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const album = document.getElementById("album");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const currentEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const toggle = document.getElementById("themeToggle");

/* LOAD SONG */
function loadSong(i) {
  title.textContent = songs[i].name;
  audio.src = songs[i].file;
  album.src = songs[i].cover;
}
loadSong(index);

/* PLAY / PAUSE */
function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸";
    album.style.animationPlayState = "running";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
    album.style.animationPlayState = "paused";
  }
}

/* NEXT / PREV */
function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";
  album.style.animationPlayState = "running";
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  audio.play();
  playBtn.textContent = "⏸";
  album.style.animationPlayState = "running";
}

/* TIME + PROGRESS (FIXED) */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.style.width =
    (audio.currentTime / audio.duration) * 100 + "%";

  currentEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

/* SEEK */
function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  audio.currentTime = (e.offsetX / width) * audio.duration;
}

/* VOLUME */
volume.oninput = () => {
  audio.volume = volume.value;
};

/* THEME */
toggle.onchange = () => {
  document.body.classList.toggle("light");
};

/* FORMAT TIME */
function formatTime(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

/* END */
audio.addEventListener("ended", () => {
  playBtn.textContent = "▶️";
  album.style.animationPlayState = "paused";
});
