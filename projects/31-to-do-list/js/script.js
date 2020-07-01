document.getElementsByClassName("add-item-btn")[0].addEventListener("click", addItemToList);


function addItemToList(e) {
    let inputText = document.getElementsByClassName("add-item-input")[0].value;
    if (inputText) {
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
        toDoText.innerText = inputText;
        toDo.appendChild(toDoText);
        document.getElementsByClassName("to-dos")[0].appendChild(toDo);
    }
}

