document.getElementsByClassName("add-item-btn")[0].addEventListener("click", addItemToList);


function addItemToList(e) {
    let addItemInput = document.getElementsByClassName("add-item-input")[0];
    if (addItemInput.value) {
        let toDo = document.createElement("div");
        toDo.classList.add("to-do");
        let toDoInput = document.createElement("input");
        toDoInput.classList.add("to-do-status");
        toDoInput.id = "tag-1";
        toDoInput.name = "tag-1";
        toDoInput.type = "checkbox";
        toDo.appendChild(toDoInput);
        let toDoText = document.createElement("span");
        toDoText.classList.add("to-do-desc");
        toDoText.innerText = addItemInput.value;
        toDo.appendChild(toDoText);
        toDoRemove = document.createElement("span");
        toDoRemove.classList.add("remove");
        toDoRemove.innerText = "−";
        toDoRemove.addEventListener("click", removeParent);
        toDo.appendChild(toDoRemove);
        document.getElementsByClassName("to-dos")[0].appendChild(toDo);
        addItemInput.value = "";
    }
}



Array.from(document.getElementsByClassName("remove")).forEach(element => element.addEventListener("click", removeParent));


function removeParent(e) {
    e.target.parentElement.remove();


}