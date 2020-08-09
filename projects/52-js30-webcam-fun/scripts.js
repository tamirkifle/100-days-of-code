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



function videoToCanvas() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // pixels = redEffect(pixels);
        // pixels = hulkEffect(pixels);
        // pixels = rgbSplit(pixels);
        // pixels = nightMode(pixels);
        // ctx.globalAlpha = 0.1;

        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}


function takePhoto() {
    let photoURI = canvas.toDataURL('image/jpeg');
    snap.currentTime = 0;
    snap.play();
    let link = document.createElement("a");
    link.innerHTML = `<img src=${photoURI} alt="Snapshot"></img>`;
    // link.innerText = "Photo";
    link.setAttribute("download", "IMG_SNAP");
    link.href = photoURI;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] += 100; //r
        pixels.data[i + 1] -= 100; //g
        pixels.data[i + 2] *= 0.5; //b
    }
    return pixels;
}

function hulkEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 30]; //r
        pixels.data[i + 1] = pixels.data[i + 40]; //g
        pixels.data[i + 2] = pixels.data[i + 50]; //b
    }
    return pixels;
}

function nightMode(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 100]; //r
        pixels.data[i + 1] = pixels.data[i + 100]; //g
        pixels.data[i + 2] = pixels.data[i + 100]; //b
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; //r
        pixels.data[i + 100] = pixels.data[i + 1]; //g
        pixels.data[i - 150] = pixels.data[i + 2]; //b
    }
    return pixels;
}


function greenScreen(pixels) {
    let levels = {};
    document.querySelectorAll(".rgb input").forEach(input => levels[input.name] = input.value);
    console.log(pixels.data);
    for (let i = 0; i < pixels.data.length; i += 4) {
        if (pixels.data[i + 0] >= levels.rmin && pixels.data[i + 0] <= levels.rmax
            && pixels.data[i + 1] >= levels.gmin && pixels.data[i + 1] <= levels.gmax
            && pixels.data[i + 2] >= levels.bmin && pixels.data[i + 2] <= levels.bmax) {
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}
getVideo()
    .then(videoToCanvas);