
const video = document.querySelector(".player__video");


video.addEventListener("play", () => playBtn.innerText = "❚❚");
video.addEventListener("pause", () => playBtn.innerText = "►");

const playBtn = document.querySelector(".player__button");
playBtn.addEventListener("click", () => video.paused ? video.play() : video.pause());


const scrubbers = document.querySelectorAll(".player__slider");
scrubbers.forEach(scrubber => scrubber.addEventListener("change", (e) => video[e.target.name] = e.target.value));
