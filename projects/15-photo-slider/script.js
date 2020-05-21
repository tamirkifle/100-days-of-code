const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

const images = document.getElementsByTagName("img");
// console.log(images[0]);



function slideImage(direction){

    if(direction === "left"){
        document.querySelector(".to-right").classList = "";

        document.querySelector(".current").classList.add("to-right");
        document.querySelector(".current").classList.remove("current");

        document.querySelector(".to-left").classList.add("current");
        document.querySelector(".to-left").classList.remove("to-left");

        let i = (function() {
            let previousIndex = images.length-1;
            for (let index=0; index<images.length; index++){
                    if(images[index].classList.contains("current")){
                        if(index!==0)
                            previousIndex = index-1;
                        return previousIndex;
                    }
        }})();
        // images[i].classList.add("on-top");
        images[i].classList.add("to-left");

    }
    if(direction === "right"){
        document.querySelector(".to-left").classList = "";

        document.querySelector(".current").classList.add("to-left");
        document.querySelector(".current").classList.remove("current");

        document.querySelector(".to-right").classList.add("current");
        document.querySelector(".to-right").classList.remove("to-right");

        let j = (function() {
            let nextIndex = 0;
            for (let index=images.length-1; index>0; index--){
                    if(images[index].classList.contains("current")){
                        if(index!==images.length-1)
                            nextIndex = index+1;
                        return nextIndex;
                    }
        }})();
        images[j].classList.add("on-top");
        images[j].classList.add("to-right");
    }
    // for (let index=0; index<images.length; index++){
    //     if(images[index].className === "current"){
    //         currentIndex = index;
            
    //     }
    //     images[index].removeAttribute("class");

    // }
    // if(num > 0) {
    //     images[currentIndex].className = "to-left";
    // }
    // else if(num < 0) {
    //     images[currentIndex].className = "to-right";
    // }
    //     if(currentIndex+num >= images.length){
    //         images[0].className = "current";
    //     }
    //     else if(currentIndex+num < 0){
    //         images[images.length-1].className = "current";
    //     }
    //     else {
    //     images[currentIndex+num].className = "current";
    //     }
    //     return;
    

}
leftArrow.addEventListener("click",function() {slideImage("left");});
rightArrow.addEventListener("click",function() {slideImage("right");});