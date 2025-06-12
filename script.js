const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const title = document.getElementById("songTitle");

let playlist = [
  { file: "Bepanah Pyaar(KoshalWorld.Com).mp3", name: "Chill Vibes" },
  { file: "Sona-Lagda-SukhE.mp3", name: "Night Drive" }
  // { file: "Enni_Soni_-_Saaho_128_Kbps.mp3", name: "stylish" }
];

let currentIndex = -1;
let isPlaying = false;

function loadSong(file, name) {
  audio.src = file;
  title.textContent = name;
  isPlaying = false;
  togglePlay();
  currentIndex = playlist.findIndex(s => s.file === file);
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶️";
  } else {
    audio.play();
    playBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}

function playNext() {
  currentIndex = (currentIndex + 1) % playlist.length;
  const song = playlist[currentIndex];
  loadSong(song.file, song.name);
}

function playPrev() {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  const song = playlist[currentIndex];
  loadSong(song.file, song.name);
}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", playNext);
prevBtn.addEventListener("click", playPrev);

audio.addEventListener("ended", playNext);
