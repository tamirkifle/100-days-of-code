const testimonials = document.getElementsByClassName("testimonial");
const leftBtns = document.getElementsByClassName("left-btn");
const rightBtns = document.getElementsByClassName("right-btn");


for (let button of leftBtns) {
    button.addEventListener("click", () => move(-1));
}
for (let button of rightBtns) {
    button.addEventListener("click", () => move(1));
}


function move(step) {

    function getIndex(step, index, collection) {
        if (index + step >= collection.length) {
            return (index + step - collection.length);
        }
        if (index + step < 0) {
            return (collection.length + step);
        }
        return (index + step);
    }

    for (let index = 0, done = 0; index < testimonials.length && !done; index++) {
        if (testimonials[index].classList.contains("visible")) {
            testimonials[index].classList.remove("visible");
            let nextIndex = getIndex(step, index, testimonials);
            testimonials[nextIndex].classList.add("visible");
            done = 1;
        }

    }


}   
