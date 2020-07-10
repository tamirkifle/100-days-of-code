class Course {
    constructor(id, name, author, type, category) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.type = type;
        this.category = category;
    }
}
let courseWindow = document.querySelector(".course-window");
let overlay = document.querySelector(".overlay");



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

    if (courses[courses.length - 1].id < courses[courses.length - 2].id) {
        courses.sort((a, b) => {
            return a.id - b.id;
        });
    }
    localStorage.setItem("courses", JSON.stringify(courses));

}


function removeCourse(e) {
    if (confirm("Are you sure?")) {
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
    console.log(getCourse(2));
    let course = getCourse(e.target.parentElement.querySelector(".course-id").innerText);
    console.log(e.target.parentElement.querySelector(".course-id").innerText);
    let courseInfo = document.createElement("div");
    courseInfo.classList.add("course-info");
    courseInfo.innerText = `Course ID: ${course.id}\nCourse Name: ${course.name}\nCourse Author: ${course.author}\nCourse Type: ${course.type}\nCourse Category: ${course.category}\n`;
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
                return multiplier * (a.name > b.name ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }
        else if (headerText == "Author") {
            courses.sort((a, b) => {
                return multiplier * (a.author > b.author ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }
        else if (headerText == "Type") {
            courses.sort((a, b) => {
                return multiplier * (a.type > b.type ? -1 : 1);
            }).forEach(course => displayCourse(course));
        }
        else if (headerText == "Category") {
            courses.sort((a, b) => {
                return multiplier * (a.category > b.category ? -1 : 1);
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
    if (courses = JSON.parse(localStorage.getItem("courses"))) {
        courses.forEach(course => {
            visible = false;
            for (let field in course) {
                if (String(course[field]).toLowerCase().indexOf(searchText) != -1) {
                    visible = true;
                    break;
                }

            }
            console.log(course, visible);
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

    currentCourse.querySelector(".edit-btn").remove();
    courseSaveSpan = document.createElement("span");
    courseSaveSpan.innerText = "✎";
    courseSaveSpan.classList.add("save-btn");
    courseSaveSpan.innerText = "💾";
    courseSaveSpan.addEventListener("click", saveEditedCourse);

    currentCourse.appendChild(courseSaveSpan);

    currentCourse.querySelectorAll(".course-id, .course-name, .course-author, .course-type, .course-category").forEach(courseSpan => {
        courseSpan.removeEventListener("click", popupCourseInfo);
        courseSpan.style.cursor = "default";
    });

    function saveEditedCourse(e) {
        let course = new Course(Number(currentCourse.querySelector(".course-id").innerText), currentCourse.querySelector(".course-name input").value, currentCourse.querySelector(".course-author input").value, currentCourse.querySelector(".course-type input").value, currentCourse.querySelector(".course-category input").value);
        if (confirm(`Are you sure you want to overwrite course #${course.id} as follows?\nCourse Name: ${course.name}\nCourse Author: ${course.author}\nCourse Type: ${course.type}\nCourse Category: ${course.category}\n`)) {
            removeFromLocalStorage(course.id);
            storeCourse(course);
            currentCourse.querySelectorAll("input").forEach(field => {
                field.parentElement.innerText = field.value;
                field.remove();
            }
            );
            currentCourse.querySelector(".save-btn").remove();
            courseEditSpan = document.createElement("span");
            courseEditSpan.innerText = "✎";
            courseEditSpan.classList.add("edit-btn");
            courseEditSpan.addEventListener("click", activateEdit);
            currentCourse.appendChild(courseEditSpan);
            currentCourse.querySelectorAll(".course-id, .course-name, .course-author, .course-type, .course-category").forEach(courseSpan => {
                courseSpan.addEventListener("click", popupCourseInfo);
                courseSpan.style.cursor = "pointer";
            });
        }
    }


}