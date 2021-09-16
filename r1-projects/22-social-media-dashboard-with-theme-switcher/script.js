function toggle(e) {
    if (!e.target.checked) {
        document.body.classList.add("dark");
    }
    else {
        document.body.classList = "";
    }
}

const checkbox = document.querySelector("#darkmode");
checkbox.addEventListener("change", toggle);