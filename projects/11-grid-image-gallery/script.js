
//TO UPGRADE: Task generating should figure out continuous rows to combine, currently only does it when generating for the top.
const imgNum = 12;
const gallery = document.querySelector(".gallery");
const tasks = [];
let round = 1;
let spanStart = 1;
const galleryWidth = 40;
const roundsToGo = galleryWidth/2;

function getRand(minNumber, maxNumber) {
    return (Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber);
}



let maxBoxes, minBoxes;

function imageRowGenerate(width) {
    maxBoxes = 4; minBoxes = 2;
    let randXSum = 0, randX, randY;
    const randArray = [];
    while (randXSum !== width) {
        if (randXSum > width) {
            randXSum -= randX;
            randX = getRand(minBoxes, maxBoxes);
            randArray[randArray.length - 1][0] = randX;
            randXSum += randX;

        }
        else if((width-randXSum)<minBoxes) {
            randX = getRand(1, width-randXSum);
            randXSum += randX;
            randY = getRand(minBoxes, maxBoxes);
            randArray.push([randX, randY]);
        }
        else if((width-randXSum)>=minBoxes && (width-randXSum) < maxBoxes) {
            randX = getRand(minBoxes, (width-randXSum));
            randXSum += randX;
            randY = getRand(minBoxes, maxBoxes);
            randArray.push([randX, randY]);
        }
        else if (randXSum < width) {
            randX = getRand(minBoxes, maxBoxes);
            randXSum += randX;
            randY = getRand(minBoxes, maxBoxes);
            randArray.push([randX, randY]);
        }

    }
    
    
    imgArrayToPage(imgElementsFromArray(randArray));
    return randArray;
}


function imgElementsFromArray(randArray) {
    const imgElements = [];
    let index = 0;

    while (index < randArray.length) {
        let imgElement = document.createElement('img');
        let imageContainer = document.createElement('div');
        imgElement.src = `./img/${Math.floor(Math.random() * imgNum + 1)}.jpg`;
        if (spanStart > galleryWidth) { spanStart = 1; }
        imageContainer.setAttribute("style", `grid-column: ${spanStart} / span ${randArray[index][0]}; grid-row: span ${randArray[index][1]}`);
        spanStart += randArray[index][0];

        imageContainer.setAttribute("width", `${randArray[index][0] * 100}px`);
        imageContainer.setAttribute("height", `${randArray[index][1] * 100}px`);

        imgElement.setAttribute("width", "100%");
        imgElement.setAttribute("height", "100%");
        imgElement.setAttribute("object-fit", "cover");
        imgElement.setAttribute("object-position", "center");

        imageContainer.appendChild(imgElement);
        imgElements.push(imageContainer);
        index += 1;


    }
    return imgElements;

}

function imgArrayToPage(imgElementsArray) {
    imgElementsArray.forEach(function (e) { gallery.appendChild(e); });

}


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
    
}

function fillGallery(galleryWidth) {
    //rowsDatas contain arrays of rowDataArrays, and rowDataArray is also an array of one width of calculations.
    const rowsDatas = [];
    spanStart = 1;

    tasks.push(galleryWidth);
    while (round <= roundsToGo && tasks.length > 0) {
        let rowDataArray = [], tasksCounter = 0;
        while (tasks.length > 0) {
            rowDataArray = imageRowGenerate(tasks.shift());
            rowsDatas.push(rowDataArray);
            tasksCounter++;
        }
        round++;
        if (round <= roundsToGo)
            addNewTasks(rowsDatas, tasksCounter);
        
    }
    
}




fillGallery(galleryWidth);
