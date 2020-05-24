function buildClickMe(){
    const text = document.createElement("p");
    text.style = "font-size: 2rem;";
    text.innerText = "Click The Button";
    const clickMeBtn = document.createElement("button");
    const resetBtn = document.createElement("button");

    clickMeBtn.innerText = "Click Me";
    resetBtn.innerText = "Reset";

    document.body.appendChild(text);
    document.body.appendChild(clickMeBtn);
    document.body.appendChild(resetBtn);

    Array.from(document.getElementsByTagName("button")).forEach(element => { 
        element.style.backgroundColor = "red";
        element.style.color = "white";
        element.style.border = "none";
        element.style.padding = "1rem";
        element.style.fontSize = "1.5rem";
        element.style.marginRight = "1rem";

    });

    let counter = 0;
    function btnAction(){
        
    }
    clickMeBtn.addEventListener("click", () => { 
        text.innerText = `You've clicked the button ${++counter} ${counter>1?"times":"time"}`;
    });
    resetBtn.addEventListener("click", () => {
        counter=0;
        text.innerText = "Reset Successful. Now Click The Button";

    });
}


function createPopUp(element) {
    const popUpImage = document.createElement("img");
    const imageContainer = document.createElement("div");
    popUpImage.src=element.src;

    document.querySelector("html").style = "height: 100%;";
    document.querySelector("body").style = "height: 100%;";

    imageContainer.style.width = "100%";
    imageContainer.style.height = "100%";
    imageContainer.style.backgroundColor = "rgba(0,0,0,0.7)"
    imageContainer.style.position = "absolute";
    imageContainer.style.top = "0";
    imageContainer.style.left = "0";
    const figure = document.createElement("figure");
    const background = document.createElement("div");
    background.style.width = "100%";
    background.style.height = "100%";
    background.style.position = "absolute";

    figure.style.width = "500px";
    figure.style.height = "500px";
    figure.style.position = "absolute";
    figure.style.margin = "0";
    figure.style.zIndex = 2;
    figure.style.top = "calc(50% - 250px)";
    figure.style.left = "calc(50% - 250px)";

    closeBtn = document.createElement("button");
    closeBtn.style.cursor = "pointer";
    closeBtn.innerText = "X";
    closeBtn.style.top = "0";
    closeBtn.style.right = "0";
    closeBtn.style.position = "absolute";

    figure.append(popUpImage, closeBtn)
    imageContainer.append(background,figure);
    document.body.appendChild(imageContainer);
    background.addEventListener("click", () => document.body.getElementsByTagName("div")[0].remove());
    closeBtn.addEventListener("click", () => document.body.getElementsByTagName("div")[0].remove());


}

function buildImagePopUp(){
    const image1= document.createElement("img"), image2 = document.createElement("img"), image3 = document.createElement("img"),
    image4 = document.createElement("img"), image5 = document.createElement("img");
    image1.style.width = "100px";
    image2.style.width = "100px";
    image3.style.width = "100px";
    image4.style.width = "100px";
    image5.style.width = "100px";

    image1.src = "./img/1.jpg";
    image2.src = "./img/2.jpg";
    image3.src = "./img/3.jpg";
    image4.src = "./img/4.jpg";
    image5.src = "./img/5.jpg";

    document.body.append(image1, image2, image3, image4, image5);
    Array.from(document.getElementsByTagName("img")).forEach(element => {
        element.style.marginRight = "1rem";
        element.addEventListener("click", () => createPopUp(element))
    });
}

function checkKeyPressed(event){
    

}
function startHangman() {
    const letters = [];
    const wordSpace = document.createElement("p"); 
    console.log(wordSpace);

    wordSpace.style.fontSize = "5rem";

    const words = ["javascript", "html", "cascading", "vscode", "document", "electron", "angular", "react", "node"];
    //chooseRandomWord
    let randomIndex = Math.floor(Math.random()*words.length);
    let theWord = words[randomIndex];
    for (let index = 0; index < theWord.length; index++) {
       let emptySpace = document.createElement("span");
       emptySpace.innerText="_";
       emptySpace.style.display = "inline-block";
       emptySpace.style.margin = "0.5rem";
       wordSpace.appendChild(emptySpace);

    }

    document.body.appendChild(wordSpace);
    document.addEventListener("keyup", function(event){

        [...theWord].forEach((letter,index) => {            
            if(event.code == `Key${letter.toUpperCase()}`){
                wordSpace.getElementsByTagName("span")[index].innerText = letter;}
    });
   });
}
document.addEventListener("DOMContentLoaded", startHangman);

