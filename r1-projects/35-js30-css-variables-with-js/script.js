




document.querySelectorAll(".control input").forEach(input => input.addEventListener("change", updateInput));


function updateInput(e) {
    if (e.target.id == "spacing") {
        document.body.style.setProperty("--spacing", e.target.value + "px");
    }
    else if (e.target.id == "blur") {
        document.body.style.setProperty("--blur", e.target.value + "px");
    }
    else if (e.target.id == "paint") {
        document.body.style.setProperty("--painted-color", e.target.value);
    }
}


