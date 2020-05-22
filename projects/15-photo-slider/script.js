const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

const images = document.getElementsByTagName("figure");



function startSlideShow(images){
    Array.from(images).some((image,index) =>  
        {
            if(image.classList.contains("current")){
                images[indexStep(-1,index,images)].classList.add("to-left");
                images[indexStep(1,index,images)].classList.add("to-right");
                return true;
            }
            else{
                images[0].classList.add("on-top","current");
                images[images.length-1].classList.add("to-left");
                images[1].classList.add("to-right");
                return true;
            }
        });
}

startSlideShow(images);

function clearClasses(collection){
    Array.from(collection).forEach((item,index) =>  item.classList = "" );
}

function indexStep(step, index, collection){
    if(index+step < 0)
        return collection.length+(index+step);
    else if(index+step > collection.length-1)
        return (index+step)- collection.length;
    else 
        return index+step;
}

function left(){
    Array.from(images).some((image,index) =>  
        {
            if(image.classList.contains("current")){
                clearClasses(images);
                images[index].classList.add("on-top","to-right");
                images[indexStep(-1,index,images)].classList.add("on-top","current");
                images[indexStep(-2, index,images)].classList.add("to-left");
                return true;
            }
        }
    );

}

function right(){

    Array.from(images).some((image,index) =>  
        {
            if(image.classList.contains("current")){
                clearClasses(images);
                images[index].classList.add("on-top","to-left");
                images[indexStep(1,index,images)].classList.add("on-top","current");
                images[indexStep(2, index,images)].classList.add("to-right");
                return true;
            }
        }
    );

}
leftArrow.addEventListener("click",left);
rightArrow.addEventListener("click",right);