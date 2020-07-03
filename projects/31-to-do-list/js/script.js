document.getElementsByClassName("add-item-btn")[0].addEventListener("click", processToDoInput);
let list = document.getElementsByClassName("to-dos")[0];
document.getElementsByClassName("search-input")[0].addEventListener("keyup", filterItems);
document.getElementsByClassName("add-item-input")[0].addEventListener("keyup", enterToAdd);


let todos = [];

// let saved = ["Journal", "Code", "Exercise", "Meditate", "Read a Book"];
let saved = JSON.parse(localStorage.getItem("tasks"));
saved.forEach(item => addToDo(item));


function addToDo(item) {
    todos.push(item);
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
    toDoText.innerText = item;
    toDo.appendChild(toDoText);
    toDoRemove = document.createElement("span");
    toDoRemove.classList.add("remove");
    toDoRemove.innerText = "−";
    toDoRemove.addEventListener("click", removeTaskItem);
    toDoStatus.addEventListener("change", checkedToDo);
    toDo.appendChild(toDoRemove);
    document.getElementsByClassName("to-dos")[0].appendChild(toDo);
}

function processToDoInput(e) {
    let addItemInput = document.getElementsByClassName("add-item-input")[0];
    if (addItemInput.value) {
        addToDo(addItemInput.value);
        storeInLocalStorage(addItemInput.value);
        addItemInput.value = "";
        orderList();

    }
}



Array.from(document.getElementsByClassName("remove")).forEach(element => element.addEventListener("click", removeTaskItem));


function removeTaskItem(e) {
    removeFromLocalStorage(e.target.parentElement.querySelector(".to-do-desc").innerText);
    e.target.parentElement.remove();


}

Array.from(document.getElementsByClassName("to-do-status")).forEach(element => element.addEventListener("change", checkedToDo));

function checkedToDo(e) {
    if (e.target.checked) {
        e.target.parentElement.getElementsByClassName("to-do-desc")[0].style.textDecoration = "line-through";
        e.target.parentElement.style.backgroundColor = "rgb(239, 255, 234)";
    }
    else {
        e.target.parentElement.getElementsByClassName("to-do-desc")[0].style.textDecoration = "none";
        e.target.parentElement.style.backgroundColor = "floralwhite";

    }
    orderList();
}

function orderList() {
    Array.from(list.children).forEach(e => {
        let checkbox = e.getElementsByTagName("input")[0];
        if (checkbox)
            if (checkbox.checked) {
                checkbox.parentElement.parentElement.appendChild(checkbox.parentElement);
            }
    });
}



function filterItems(e) {
    let text = e.target.value.toLowerCase();
    document.querySelectorAll(".to-do").forEach(
        function (task) {
            console.log(task.querySelector(".to-do-desc").innerText.toLowerCase());

            if (task.querySelector(".to-do-desc").innerText.toLowerCase().indexOf(text) != -1)
                task.style.display = "block";
            else {
                task.style.display = "none";
            }
        }
    );
}


function storeInLocalStorage(item) {
    let tasks;
    if (localStorage.getItem("tasks") == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(item);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeFromLocalStorage(item) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let index = tasks.indexOf(item);
    if (index != -1) {
        tasks.splice(index, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function enterToAdd(e) {
    if (e.keyCode === 13) {
        processToDoInput(e);
    };
}