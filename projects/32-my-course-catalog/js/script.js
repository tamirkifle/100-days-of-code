class Course {
    constructor(id, name, author, type, category, moreInfo = "") {
        this.id = id;
        this.name = name;
        this.author = author;
        this.type = type;
        this.category = category;
        this.moreInfo = moreInfo;
    }
}
let courseWindow = document.querySelector(".course-window");
let overlay = document.querySelector(".overlay");
let headerDict = { id: "ID", name: "Name", author: "Author", type: "Type", category: "Category", moreInfo: "More Info" };


let idCounter = 0;
loadStored();
document.querySelector(".clear-btn").addEventListener("click", () => document.querySelectorAll(".add-course-form input").forEach(element => element.value = ""));

document.querySelector(".add-course-btn").addEventListener("click", addCourse);
function addCourse(e) {
    if (confirm(`Are you sure you want to save this course?\nCourse Name: ${document.querySelector("#course-name").value}\nCourse Author: ${document.querySelector("#course-author").value}\nCourse Type: ${document.querySelector("#course-type").value}\nCourse Category: ${document.querySelector("#course-category").value}\n`)) {
        let course = new Course(++idCounter, document.querySelector("#course-name").value, document.querySelector("#course-author").value, document.querySelector("#course-type").value, document.querySelector("#course-category").value);
        document.querySelectorAll(".add-course-form input").forEach(element => element.value = "");
        displayCourse(course);
        storeCourse(course);
    }
}

function loadStored() {
    if (localStorage.getItem("courses") != null) {
        JSON.parse(localStorage.getItem("courses")).forEach(course => displayCourse(course));
    }
}


function createCourseDiv(course) {
    let courseItem = document.createElement("div");
    courseItem.classList.add("course");
    // courseItem.style.cursor = "pointer";
    courseIDSpan = document.createElement("span");
    courseIDSpan.innerText = course.id;
    courseIDSpan.classList.add("course-id");
    idCounter = course.id;
    courseNameSpan = document.createElement("span");
    courseNameSpan.innerText = course.name;
    courseNameSpan.classList.add("course-name");
    courseAuthorSpan = document.createElement("span");
    courseAuthorSpan.innerText = course.author;
    courseAuthorSpan.classList.add("course-author");
    courseTypeSpan = document.createElement("span");
    courseTypeSpan.innerText = course.type;
    courseTypeSpan.classList.add("course-type");
    courseCategorySpan = document.createElement("span");
    courseCategorySpan.innerText = course.category;
    courseCategorySpan.classList.add("course-category");
    courseRemoveSpan = document.createElement("span");
    courseRemoveSpan.innerText = "❌";
    courseRemoveSpan.classList.add("remove-btn");

    courseRemoveSpan.addEventListener("click", removeCourse);

    courseEditSpan = document.createElement("span");
    courseEditSpan.innerText = "✎";
    courseEditSpan.classList.add("edit-btn");
    courseEditSpan.addEventListener("click", activateEdit);



    courseItem.appendChild(courseIDSpan);
    courseItem.appendChild(courseNameSpan);
    courseItem.appendChild(courseAuthorSpan);
    courseItem.appendChild(courseTypeSpan);
    courseItem.appendChild(courseCategorySpan);
    courseItem.appendChild(courseRemoveSpan);
    courseItem.appendChild(courseEditSpan);

    [courseIDSpan, courseNameSpan, courseAuthorSpan, courseTypeSpan, courseCategorySpan].forEach(courseSpan => {
        courseSpan.addEventListener("click", popupCourseInfo);
        courseSpan.style.cursor = "pointer";
    });
    return courseItem;
}

function courseFromCourseDiv(courseDiv) {
    return new Course(courseDiv.querySelector(".course-id").innerText, courseDiv.querySelector(".course-name").innerText, courseDiv.querySelector(".course-author").innerText, courseDiv.querySelector(".course-type").innerText, courseDiv.querySelector(".course-category").innerText);
}

function displayCourse(course) {
    document.querySelector(".course-list").appendChild(createCourseDiv(course));

}

function storeCourse(course) {
    let courses;
    if (localStorage.getItem("courses") == null) {
        courses = [];
    }
    else {
        courses = JSON.parse(localStorage.getItem("courses"));
    }
    courses.push(course);
    if (courses[courses.length - 1] && courses[courses.length - 2]) {
        if (courses[courses.length - 1].id < courses[courses.length - 2].id) {
            courses.sort((a, b) => {
                return a.id - b.id;
            });
        }
    }
    localStorage.setItem("courses", JSON.stringify(courses));

}


function removeCourse(e) {
    if (confirm("Are you sure you want to delete this course?")) {
        e.target.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.querySelector(".course-id").innerText);
    }
}
function removeFromLocalStorage(idno) {
    let removedCourse;
    let courses = JSON.parse(localStorage.getItem("courses"));
    courses.forEach((course, index) => {
        if (idno == course.id) {
            removedCourse = courses.splice(index, 1);
            localStorage.setItem("courses", JSON.stringify(courses));
            return true;
        }
    });
    return removedCourse;
}





function getCourse(idno) {
    let courses = JSON.parse(localStorage.getItem("courses"));
    let returnV;

    courses.some((course, index) => {
        if (idno == course.id) {
            returnV = courses.splice(index, 1)[0];
            return true;
        }

    });
    return returnV;
}

function popupCourseInfo(e) {
    let course = getCourse(e.target.parentElement.querySelector(".course-id").innerText);
    let courseInfo = document.createElement("div");
    courseInfo.classList.add("course-info");
    for (let field in course) {
        if (field == "moreInfo") {
            if (!course[field]) {
                continue;
            }
        }
        let line = document.createElement("div");
        let label = document.createElement("label");
        let content = document.createElement("span");
        label.innerText = `Course ${headerDict[field]}: `;
        content.innerText = course[field];
        line.appendChild(label);
        line.appendChild(content);
        line.style.margin = "1rem 0";
        courseInfo.appendChild(line);
    }
    courseInfo.style.color = "white";
    courseInfo.style.fontSize = "2rem";

    courseWindow.appendChild(courseInfo);
    courseWindow.parentElement.setAttribute("style", "left: 0");
    overlay.setAttribute("style", "left: 0");

}


document.querySelectorAll(".overlay, .close-btn").forEach(element => element.addEventListener("click", closePopUp));

function closePopUp() {
    courseWindow.querySelector(".course-info").remove();

    courseWindow.parentElement.setAttribute("style", "left: -9999px");
    overlay.setAttribute("style", "left: -9999px");


}


document.querySelectorAll(".header-item").forEach(item => item.addEventListener("click", (e) => {
    if (!/[A-Za-z]/.test(e.target.textContent)) {
        sortBasedOn(e.target.parentElement.textContent);
    }
    else {
        sortBasedOn(e.target.textContent);
    }
}));

let multiplier = -1;
function sortBasedOn(headerText) {
    if (!/[A-Za-z]/.test(Array.from(headerText).splice(-1)[0])) {
        headerText = headerText.split(Array.from(headerText).splice(-1)[0])[0];
    }
    let courses;
    if (courses = JSON.parse(localStorage.getItem("courses"))) {
        document.querySelectorAll(".course").forEach(course => course.remove());
        if (headerText == "ID") {
            courses.sort((a, b) => {
                return multiplier * (a.id - b.id);
            }).forEach(course => displayCourse(course));

        }
        else if (headerText == "Course") {
            courses.sort((a, b) => {
                return multiplier * (a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }
        else if (headerText == "Author") {
            courses.sort((a, b) => {
                return multiplier * (a.author.toLowerCase() > b.author.toLowerCase() ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }
        else if (headerText == "Type") {
            courses.sort((a, b) => {
                return multiplier * (a.type.toLowerCase() > b.type.toLowerCase() ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }
        else if (headerText == "Category") {
            courses.sort((a, b) => {
                return multiplier * (a.category.toLowerCase() > b.category.toLowerCase() ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }


        if (multiplier === -1) {
            multiplier = 1;
            if (headerText == "ID")
                addArrow("descending", headerText);
            else
                addArrow("ascending", headerText);

        }
        else {
            multiplier = -1;
            if (headerText == "ID")
                addArrow("ascending", headerText);
            else
                addArrow("descending", headerText);

        }
    }

    function addArrow(direction, headerText) {

        let arrow = document.createElement("span");
        arrow.classList.add("sort-arrow");
        if (direction == "descending") {
            arrow.innerText = "🔺";
        }
        else if (direction == "ascending") {
            arrow.innerText = "🔻";
        }
        document.querySelectorAll(".header-item").forEach(header => {
            if (header.querySelector(".sort-arrow")) {
                header.querySelector(".sort-arrow").remove();
            }
        });

        document.querySelector(`.header-${headerText.toLowerCase()}`).appendChild(arrow);

    }



}


document.querySelector("#search-input").addEventListener("keyup", filterCourses);

function filterCourses(e) {
    let searchText = e.target.value.toLowerCase();
    let visible = false;
    let courses;
    document.querySelectorAll(".course").forEach(course => {
        if (courses == undefined) {
            courses = [];
        }
        courses.push(courseFromCourseDiv(course));
    });
    if (courses) {
        courses.forEach(course => {
            visible = false;
            for (let field in course) {
                if (String(course[field]).toLowerCase().indexOf(searchText) != -1) {
                    visible = true;
                    break;
                }

            }
            if (!visible) {
                document.querySelectorAll(".course").forEach(item => {
                    if (item.querySelector(".course-id").innerText == course.id) {
                        item.style.display = "none";
                    }


                });

            }
            else if (visible) {
                document.querySelectorAll(".course").forEach(item => {
                    if (item.querySelector(".course-id").innerText == course.id) {
                        item.style.display = "flex";
                    }


                });

            }
        });
    }
}





function activateEdit(e) {
    let currentCourse = e.target.parentElement;
    let course = courseFromCourseDiv(currentCourse);

    function createElement(elementType, fieldText) {
        let element = document.createElement(elementType);
        element.style.type = "text";
        element.value = fieldText;
        return element;
    }

    currentCourse.querySelectorAll(".course-name, .course-author, .course-type, .course-category").forEach(field => {
        let input = createElement("input", field.innerText);
        field.innerText = "";
        field.appendChild(input);
    }
    );

    let editBtn = currentCourse.querySelector(".edit-btn");
    editBtn.remove();
    removeBtn = currentCourse.querySelector(".remove-btn")
    removeBtn.remove();
    editMoreSpan = document.createElement("span");
    editMoreSpan.classList.add("edit-more-btn");
    editMoreSpan.innerText = " ⃛";
    editMoreSpan.addEventListener("click", popUpEditMore);


    courseSaveSpan = document.createElement("span");
    courseSaveSpan.classList.add("save-btn");
    courseSaveSpan.innerText = "💾";
    courseSaveSpan.addEventListener("click", saveEditedCourse);

    currentCourse.appendChild(editMoreSpan);
    currentCourse.appendChild(courseSaveSpan);

    currentCourse.querySelectorAll(".course-id, .course-name, .course-author, .course-type, .course-category").forEach(courseSpan => {
        courseSpan.removeEventListener("click", popupCourseInfo);
        courseSpan.style.cursor = "default";
    });

    let cancelEditOverlay = document.createElement("div");
    cancelEditOverlay.classList.add("cancel-edit-overlay");
    cancelEditOverlay.style.position = "fixed";
    cancelEditOverlay.style.top = 0;
    cancelEditOverlay.style.width = "100vw";
    cancelEditOverlay.style.height = "100vh";
    cancelEditOverlay.style.zIndex = "1002";
    cancelEditOverlay.addEventListener("click", cancelEditing);
    document.body.appendChild(cancelEditOverlay);
    currentCourse.style.position = "relative";
    currentCourse.style.zIndex = "1003";

    function cancelEditing() {
        cancelEditOverlay.remove();
        currentCourse.style.position = "static";
        currentCourse.querySelectorAll("input").forEach(input => input.remove());
        currentCourse.querySelectorAll(".course-id, .course-name, .course-author, .course-type, .course-category").forEach((courseSpan, index) => {
            courseSpan.addEventListener("click", popupCourseInfo);
            courseSpan.style.cursor = "pointer";
            switch (index) {
                case 1: {
                    courseSpan.innerText = course.name;
                    break;
                }
                case 2: {
                    courseSpan.innerText = course.author;
                    break;
                }
                case 3: {
                    courseSpan.innerText = course.type;
                    break;
                }
                case 4: {
                    courseSpan.innerText = course.category;
                    break;
                }
            }
        });
        editMoreSpan.remove();
        courseSaveSpan.remove();
        currentCourse.appendChild(removeBtn);
        currentCourse.appendChild(editBtn);
    }

    function popUpEditMore(e) {
        cancelEditing();
        let courseEditor = document.createElement("div");
        courseEditor.classList.add("course-info");
        for (let field in course) {
            let line = document.createElement("div");
            let label = document.createElement("label");
            label.innerText = `Course ${headerDict[field]}: `;
            let input;
            if (field == "moreInfo") {
                input = document.createElement("textarea");
            }
            else {
                input = document.createElement("input");
            }
            input.classList.add(`${field}-input`);
            input.value = course[field];
            input.style.fontSize = "1.5rem";
            line.appendChild(label);
            line.appendChild(input);
            line.style.margin = "1rem 0";
            courseEditor.appendChild(line);
        }
        let saveBtn = document.createElement("button");
        saveBtn.innerText = "Save Course";
        saveBtn.style.padding = "0.5rem";
        saveBtn.style.marginRight = "1rem";
        saveBtn.addEventListener("click", savePopUpEdit);

        courseEditor.appendChild(saveBtn);

        let cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.style.padding = "0.5rem";
        cancelBtn.addEventListener("click", cancelPopUpEdit);

        courseEditor.appendChild(cancelBtn);

        courseEditor.style.color = "white";
        courseEditor.style.fontSize = "2rem";
        courseEditor.style.textAlign = "center";

        courseWindow.appendChild(courseEditor);
        courseWindow.parentElement.setAttribute("style", "left: 0");
        courseWindow.style.height = "600px";
        overlay.setAttribute("style", "left: 0");


        function savePopUpEdit() {

        }

        function cancelPopUpEdit() {

        }
    }
    function saveEditedCourse(e) {
        if (confirm(`Are you sure you want to overwrite course #${course.id} as follows?\nCourse Name: ${course.name}\nCourse Author: ${course.author}\nCourse Type: ${course.type}\nCourse Category: ${course.category}\n`)) {
            removeFromLocalStorage(course.id);
            storeCourse(course);
            currentCourse.querySelectorAll("input").forEach(field => {
                field.parentElement.innerText = field.value;
                field.remove();
            }
            );
            editMoreSpan.remove();
            courseSaveSpan.remove();
            currentCourse.appendChild(removeBtn);
            currentCourse.appendChild(editBtn);


        }
    }
}


