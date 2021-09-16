
const video = document.querySelector(".player__video");


video.addEventListener("play", () => playBtn.innerText = "❚❚");
video.addEventListener("pause", () => playBtn.innerText = "►");

const playBtn = document.querySelector(".player__button");
playBtn.addEventListener("click", () => video.paused ? video.play() : video.pause());


const scrubbers = document.querySelectorAll(".player__slider");
scrubbers.forEach(scrubber => scrubber.addEventListener("change", (e) => video[e.target.name] = e.target.value));


const skipBtns = document.querySelectorAll("[data-skip]");
skipBtns.forEach(skipBtn => skipBtn.addEventListener("click", (e) => video.currentTime += Number(e.target.getAttribute("data-skip"))));

const progressBar = document.querySelector(".progress__filled");
video.addEventListener("timeupdate", () => moveProgressBar(video.currentTime));

function moveProgressBar(time) {
    console.log("changed");
    progressBar.style.flexBasis = `${time / video.duration * 100}%`;
}

const progressContainer = document.querySelector(".progress");
progressContainer.addEventListener("click", scrub);

function scrub(e) {
    video.currentTime = e.layerX / progressContainer.offsetWidth * video.duration;

}