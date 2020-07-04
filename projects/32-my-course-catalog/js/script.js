class Course {
    constructor(name, author, type, category) {
        this.name = name;
        this.author = author;
        this.type = type;
        this.category = category;
    }

}
loadStored();
document.querySelector(".add-course-btn").addEventListener("click", addCourse);

function addCourse(e) {
    let course = new Course(document.querySelector("#course-name").value, document.querySelector("#course-author").value, document.querySelector("#course-type").value, document.querySelector("#course-category").value);
    console.log(course);
    document.querySelectorAll(".add-course-form input").forEach(element => element.value = "");
    displayCourse(course);
    storeCourse(course);
}

function loadStored() {
    if (localStorage.getItem("courses") != null) {
        JSON.parse(localStorage.getItem("courses")).forEach(course => displayCourse(course));
    }
}
function displayCourse(course) {
    let courseItem = document.createElement("li");
    courseItem.classList.add("course");
    courseNameSpan = document.createElement("span");
    courseNameSpan.innerText = course.name;
    courseAuthorSpan = document.createElement("span");
    courseAuthorSpan.innerText = course.author;
    courseTypeSpan = document.createElement("span");
    courseTypeSpan.innerText = course.type;
    courseCategorySpan = document.createElement("span");
    courseCategorySpan.innerText = course.category;

    courseItem.appendChild(courseNameSpan);
    courseItem.appendChild(courseAuthorSpan);
    courseItem.appendChild(courseTypeSpan);
    courseItem.appendChild(courseCategorySpan);
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
    console.log(courses);
}