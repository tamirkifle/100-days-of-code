

const randArray = [];
const imgNum = 12;
const gallery = document.querySelector(".gallery");
var item = document.createElement('h1');



function getRand(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
}

// Generate randX until randXSum is 10
let randXSum = 0, randYSum = 0, randX, randY, xdone = 0, ydone = 0;

const maxBoxes = 4, minBoxes = 2;

function imageRowGenerate(width) {
    while (randXSum !== width) {
        if (randXSum >= (width - maxBoxes)) {
            randX = width - randXSum;
            randXSum += randX;
            randY = getRand(minBoxes, maxBoxes);
            randArray.push([randX, randY]);
        }

        if (randXSum > width) {
            randXSum -= randX;
            randX = getRand(minBoxes, maxBoxes);
            randArray[randArray.length - 1][0] = randX;
            randY = getRand(minBoxes, maxBoxes);
            randArray[randArray.length - 1][1] = randY;
            randXSum += randX;

        }
        if (randXSum < width) {
            randX = getRand(minBoxes, maxBoxes);
            randXSum += randX;
            randY = getRand(minBoxes, maxBoxes);
            randArray.push([randX, randY]);
        }

    }
    return randArray;
}

console.log(imageRowGenerate(10));

// Create 12 new Image elements
imgElements = [];
let imgElement = document.createElement('img');
let imageCounter = 0;
while (imageCounter < randArray.length) {
    let imgElement = document.createElement('img');
    imgElement.src = `./img/${Math.floor(Math.random() * imgNum + 1)}.jpg`;
    let imageContainer = document.createElement('div');
    imageContainer.setAttribute("style", `grid-column: span ${randArray[imageCounter][0]}; grid-row: span ${randArray[imageCounter][1]}`);
    imageContainer.setAttribute("width", `${randArray[imageCounter][0] * 100}px`);
    imageContainer.setAttribute("height", `${randArray[imageCounter][1] * 100}px`);

    // imgElement.style.gridColumn = `span ${randArray[imageCounter][0]}`;
    // imgElement.style.gridRow = `span ${randArray[imageCounter][1]}`;
    // imgElement.setAttribute("display", "block");

    imgElement.setAttribute("width", "100%");
    imgElement.setAttribute("height", "100%");
    imgElement.setAttribute("object-fit", "cover");
    imgElement.setAttribute("object-position", "center");

    // imageContainer.setAttribute("overflow", "hidden");
    imageContainer.appendChild(imgElement);
    imgElements.push(imageContainer);
    imageCounter += 1;

}

imgElements.forEach(function (e) { gallery.appendChild(e) });
console.log(imgElements);