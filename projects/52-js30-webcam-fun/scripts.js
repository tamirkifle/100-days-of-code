const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo() {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => video.srcObject = stream)
        .then(() => video.play())
        .catch((error) => console.error(error));
}


getVideo()
    .then(videoToCanvas);

function videoToCanvas() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }, 16);
}


function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    let photoURI = canvas.toDataURL('image/jpeg');
    let link = document.createElement("a");
    link.innerHTML = `<img src=${photoURI} alt="Snapshot"></img>`;
    // link.innerText = "Photo";
    link.setAttribute("download", "IMG_SNAP");
    link.href = photoURI;
    strip.insertBefore(link, strip.firstChild);

}