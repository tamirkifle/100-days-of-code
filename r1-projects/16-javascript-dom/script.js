function styleButton(btn){
        btn.style.backgroundColor = "red";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.padding = "1rem";
        btn.style.fontSize = "1.5rem";
        btn.style.marginRight = "1rem";
}
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

    Array.from(document.getElementsByTagName("button")).forEach(styleButton);

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

function startHangman() {
    const triesAllowed = 6;
    const words = ["javascript", "html", "cascading", "vscode", "document", "electron", "angular", "react", "node"];
    const processedLetters = [];
    let triesRemaining = triesAllowed; 
    let lettersRemaining = -1;    
    let theWord = "";
    const wordSpace = document.createElement("p"); 
    const lettersGuessed = document.createElement("p");
    const score = document.createElement("p");
    const resetBtn = document.createElement("button");

    wordSpace.style.fontSize = "5rem";
    score.style.fontSize = "2rem";
    resetBtn.innerText = "Reset";
    styleButton(resetBtn);

    function getNewWordfrom(array){
        return array[Math.floor(Math.random()*words.length)];
    }

    function renderGame() {
        document.body.innerHTML = "";
        wordSpace.innerHTML = "";
        lettersGuessed.innerHTML = "";
        theWord = getNewWordfrom(words);
        lettersRemaining = theWord.length;
        triesRemaining = triesAllowed;
        score.innerText = `Tries Remaining: ${triesRemaining} out of ${triesAllowed}\nLetters Remaining: ${lettersRemaining}`;
        for (let index = 0; index < theWord.length; index++) {
            wordSpace.appendChild(generateSpanWith("_", "5rem"));
        
        }
        document.body.appendChild(wordSpace);
        document.body.appendChild(lettersGuessed);
        document.body.appendChild(score);
        document.body.appendChild(resetBtn);
    }
    renderGame();
    resetBtn.addEventListener("click", renderGame);
    document.addEventListener("keyup", (event) => {
        if(triesRemaining!==0 && lettersRemaining!==0)
            checkAndUpdate(event);
        });


    function updateScore() {
        score.innerText = `Tries Remaining: ${triesRemaining} out of ${triesAllowed}\nLetters Remaining: ${lettersRemaining}`;
    }
    
    function generateSpanWith(str, fontSize = "", border = ""){
        let element = document.createElement("span");
        element.innerText = str;
        element.style.fontSize = fontSize;
        element.style.display = "inline-block";
        element.style.padding = "0.5rem";
        element.style.border = border;

        return element;
    }
    function checkAndUpdate(event){
        let correct = 0;
        let character = String.fromCharCode(event.keyCode);
        if(/[a-zA-Z]/.test(character) && !processedLetters.includes(character)){
            [...theWord].forEach((letter,index) => {     //check if letter is in word       
                if(event.code == `Key${letter.toUpperCase()}`){
                    wordSpace.getElementsByTagName("span")[index].innerText = letter;
                    lettersRemaining--;
                    updateScore();
                    correct = 1;
                }
            });
        
            if(!correct){
                lettersGuessed.appendChild(generateSpanWith(character, "2rem", "2px solid orange")); 
                --triesRemaining;
            }
            processedLetters.push(character);
            updateScore();
            if(triesRemaining === 0){
                wordSpace.innerHTML = "";
                score.innerText = "";
                wordSpace.innerText = "Game Over";
                let lose = document.createElement("p");
                lose.style.fontSize = "2rem";
                lose.innerText = `The word was ${theWord}`;
                wordSpace.appendChild(lose);
            }
            else if(lettersRemaining === 0){
                let win = document.createElement("p");
                win.style.fontSize = "2rem";

                win.innerText = "You Win";
                wordSpace.appendChild(win);

            }
        }
    }
    

}
document.addEventListener("DOMContentLoaded", startHangman);

