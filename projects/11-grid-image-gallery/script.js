

const imgNum = 12;
const gallery = document.querySelector(".gallery");
var item = document.createElement('h1');
const tasks = [];
let round = 1;
let spanStart = 1;
const galleryWidth = 40;

// const tasks = [];

function getRand(minNumber, maxNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
}

// Generate randX until randXSum is 10
// let randXSum = 0, randYSum = 0, randX, randY, xdone = 0, ydone = 0;

let maxBoxes, minBoxes;

function imageRowGenerate(width) {
    maxBoxes = 4; minBoxes = 2;
    let randXSum = 0, randYSum = 0, randX, randY;
    const randArray = [];
    if (width === 1 || width === 2 || width === 3 || width === 4) {
        randArray.push([width, getRand(minBoxes, maxBoxes)]);
        return randArray;
    }

    // if (width < maxBoxes) {
    //     minBoxes = 1; maxBoxes = width;
    // }
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


function imgElementsFromArray(randArray) {
    const imgElements = [];
    let imageCounter = 0;

    while (randArray.length > 0) {
        let imgElement = document.createElement('img');
        let imageContainer = document.createElement('div');
        imgElement.src = `./img/${Math.floor(Math.random() * imgNum + 1)}.jpg`;
        if (spanStart > galleryWidth) { spanStart = 1; }
        imageContainer.setAttribute("style", `grid-column: ${spanStart} / span ${randArray[0][0]}; grid-row: span ${randArray[0][1]}`);
        spanStart += randArray[0][0];

        imageContainer.setAttribute("width", `${randArray[0][0] * 100}px`);
        imageContainer.setAttribute("height", `${randArray[0][1] * 100}px`);

        imgElement.setAttribute("width", "100%");
        imgElement.setAttribute("height", "100%");
        imgElement.setAttribute("object-fit", "cover");
        imgElement.setAttribute("object-position", "center");

        imageContainer.appendChild(imgElement);
        imgElements.push(imageContainer);
        console.log(`One image element created with dimensions ${randArray.shift()}; Total elements created is: ${imageCounter + 1}`);
        imageCounter += 1;


    }
    return imgElements;

}

function imgArrayToPage(imgElementsArray) {
    imgElementsArray.forEach(function (e) { gallery.appendChild(e); });

}

// // Create Image elements
// const imgElements = [];
// let imgElement = document.createElement('img');
// let imageCounter = 0;
// while (imageCounter < randArray.length) {
//     let imgElement = document.createElement('img');
//     imgElement.src = `./img/${Math.floor(Math.random() * imgNum + 1)}.jpg`;
//     let imageContainer = document.createElement('div');
//     imageContainer.setAttribute("style", `grid-column: span ${randArray[imageCounter][0]}; grid-row: span ${randArray[imageCounter][1]}`);
//     imageContainer.setAttribute("width", `${randArray[imageCounter][0] * 100}px`);
//     imageContainer.setAttribute("height", `${randArray[imageCounter][1] * 100}px`);

//     // imgElement.style.gridColumn = `span ${randArray[imageCounter][0]}`;
//     // imgElement.style.gridRow = `span ${randArray[imageCounter][1]}`;
//     // imgElement.setAttribute("display", "block");

//     imgElement.setAttribute("width", "100%");
//     imgElement.setAttribute("height", "100%");
//     imgElement.setAttribute("object-fit", "cover");
//     imgElement.setAttribute("object-position", "center");

//     // imageContainer.setAttribute("overflow", "hidden");
//     imageContainer.appendChild(imgElement);
//     imgElements.push(imageContainer);
//     imageCounter += 1;

// }
function generateTasksFromRow(rowArray) {
    let generatedTasks = [], sum = 0, resetSum = 0;
    for (let index = 0; index < rowArray.length; index++) {
        if (resetSum) sum = 0;
        if (index != rowArray.length - 1 && rowArray[index][1] === rowArray[index + 1][1]) {
            resetSum = 0;
            sum += rowArray[index][0];
        }
        else {
            resetSum = 1;
            generatedTasks.push(sum + rowArray[index][0]);
        }
    }
    return generatedTasks;
}
console.log("hello", generateTasksFromRow([[3, 4], [3, 2], [4, 2]]));

function addNewTasks(rowsDatas, tasksCounter) {
    let oneRow = [], tasksArray;
    for (let index = rowsDatas.length - tasksCounter; index < rowsDatas.length; index++) {
        oneRow = rowsDatas[index];
        tasksArray = generateTasksFromRow(oneRow);
        tasksArray.forEach(task => tasks.push(task));
        console.log("addNewTasks", tasksArray);

    }
    // let tasksArray = generateTasksFromRow(oneRow);
    // tasksArray.forEach(task => tasks.push(task));
    // console.log("addNewTasks", tasksArray);
}
// addNewTasks([[[2, 3], [2, 3], [4, 3], [2, 4]]], 1);

// function updateHeightLeft(rowDataArray) {
//     let minY = 16;
//     rowDataArray.forEach(coordinate => { if (coordinate[1] < minY) minY = coordinate[1] });
//     heightLeft -= minY;

// }
function fillGallery(galleryWidth) {
    //rowsDatas contain arrays of rowDatas, and rowData is also an array of one row of calculations
    // rowsDatas = {numbers:[], isMinHeight:[]}
    const rowsDatas = [];
    spanStart = 1;

    tasks.push(galleryWidth);
    while (round <= 16 && tasks.length > 0) {
        // spanStart = 0;
        let rowDataArray = [], tasksCounter = 0;
        while (tasks.length > 0) {
            rowDataArray = imageRowGenerate(tasks.shift());
            // updateHeightLeft(rowDataArray);
            rowsDatas.push(rowDataArray);
            tasksCounter++;
        }
        round++;
        if (round <= 16)
            addNewTasks(rowsDatas, tasksCounter);
        while (rowsDatas.length > 0) {
            imgArrayToPage(imgElementsFromArray(rowsDatas.shift()));
        }
    }
    // while (rowsDatas.length > 0) {
    // }
}
// let currentArray = imageRowGenerate(10);
// console.log(currentArray);
// debugger;



// imgArrayToPage(imgElementsFromArray(currentArray));
fillGallery(galleryWidth);
