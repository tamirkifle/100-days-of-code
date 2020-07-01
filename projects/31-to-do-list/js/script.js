document.getElementsByClassName("add-item-btn")[0].addEventListener("click", addItemToList);


function addItemToList(e) {
    let addItemInput = document.getElementsByClassName("add-item-input")[0];
    if (addItemInput.value) {
        let toDo = document.createElement("div");
        toDo.classList.add("to-do");
        let toDoStatus = document.createElement("input");
        toDoStatus.classList.add("to-do-status");
        toDoStatus.id = "tag-1";
        toDoStatus.name = "tag-1";
        toDoStatus.type = "checkbox";
        toDo.appendChild(toDoStatus);
        let toDoText = document.createElement("span");
        toDoText.classList.add("to-do-desc");
        toDoText.innerText = addItemInput.value;
        toDo.appendChild(toDoText);
        toDoRemove = document.createElement("span");
        toDoRemove.classList.add("remove");
        toDoRemove.innerText = "−";
        toDoRemove.addEventListener("click", removeParent);
        toDoStatus.addEventListener("change", checkedToDo)
        toDo.appendChild(toDoRemove);
        document.getElementsByClassName("to-dos")[0].appendChild(toDo);
        addItemInput.value = "";
    }
}



Array.from(document.getElementsByClassName("remove")).forEach(element => element.addEventListener("click", removeParent));


function removeParent(e) {
    e.target.parentElement.remove();


}

Array.from(document.getElementsByClassName("to-do-status")).forEach(element => element.addEventListener("change", checkedToDo));

function checkedToDo(e) {
    if (e.target.checked) {
        e.target.parentElement.getElementsByClassName("to-do-desc")[0].style.textDecoration = "line-through";
    }
    else {
        e.target.parentElement.getElementsByClassName("to-do-desc")[0].style.textDecoration = "none";
    }
}