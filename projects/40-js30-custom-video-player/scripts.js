
const video = document.querySelector(".player__video");


video.addEventListener("play", () => playBtn.innerText = "❚❚");
video.addEventListener("pause", () => playBtn.innerText = "►");

const playBtn = document.querySelector(".player__button");



playBtn.addEventListener("click", () => video.paused ? video.play() : video.pause());

