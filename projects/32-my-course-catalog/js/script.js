class Course {
    constructor(id, name, author, type, category) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.type = type;
        this.category = category;
    }
}

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
function displayCourse(course) {
    let courseItem = document.createElement("li");
    courseItem.classList.add("course");
    courseIDSpan = document.createElement("span");
    courseIDSpan.innerText = course.id;
    courseIDSpan.classList.add("course-id");

    idCounter = course.id;
    courseNameSpan = document.createElement("span");
    courseNameSpan.innerText = course.name;
    courseAuthorSpan = document.createElement("span");
    courseAuthorSpan.innerText = course.author;
    courseTypeSpan = document.createElement("span");
    courseTypeSpan.innerText = course.type;
    courseCategorySpan = document.createElement("span");
    courseCategorySpan.innerText = course.category;
    courseRemoveSpan = document.createElement("span");
    courseRemoveSpan.innerText = "❌";
    courseRemoveSpan.classList.add("remove-btn");


    courseItem.appendChild(courseIDSpan);
    courseItem.appendChild(courseNameSpan);
    courseItem.appendChild(courseAuthorSpan);
    courseItem.appendChild(courseTypeSpan);
    courseItem.appendChild(courseCategorySpan);
    courseItem.appendChild(courseRemoveSpan);

    document.querySelector(".course-list").appendChild(courseItem);

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
    localStorage.setItem("courses", JSON.stringify(courses));
}


document.querySelectorAll(".remove-btn").forEach(btn => btn.addEventListener("click", removeCourse));
function removeCourse(e) {
    if (confirm("Are you sure?")) {
        e.target.parentElement.remove();
        let courses = JSON.parse(localStorage.getItem("courses"));
        courses.forEach((course, index) => {
            if (e.target.parentElement.querySelector(".course-id").innerText == course.id) {
                courses.splice(index, 1);
                localStorage.setItem("courses", JSON.stringify(courses));
                return true;
            }
        }
        );
    }
}


