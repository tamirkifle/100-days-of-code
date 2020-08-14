
const filtersContainer = document.createElement("div");
filtersContainer.classList.add("filters-container");
const jobsList = document.querySelector(".jobs-list");
jobsList.insertBefore(filtersContainer, jobsList.firstChild);

const filtersArray = [];
const jobCards = document.querySelectorAll(".job-card");

document.querySelectorAll(".job-tag").forEach(jobTag => jobTag.addEventListener("click", addFilter));

function isFilterActive(str) {
    let duplicate = false;
    filtersContainer.querySelectorAll(".filter-tablet").forEach(tablet => {
        if (str === tablet.innerText) {
            duplicate = true;
        }
    });
    return duplicate;
}
function filterResults(array) {

    jobCards.forEach(jobCard => {
        const jobCardTags = Array.from(jobCard.querySelectorAll(".job-tag")).map(tagElement => tagElement.innerText);
        jobCard.style.display = "flex";
        array.some(tag => {
            if (!jobCardTags.includes(tag)) {
                jobCard.style.display = "none";
                return true;
            }
        });
    });

}
function addFilter(e) {
    if (!isFilterActive(e.target.innerText)) {
        console.log("Add Filter " + e.target.innerText);
        filtersContainer.appendChild(createFilterItem(e.target.innerText));
        filtersArray.push(e.target.innerText);
        filterResults(filtersArray);
        filtersContainer.style.visibility = "visible";
    }
}
function removeFilter(e) {
    filtersArray.splice(filtersArray.indexOf(e.target.parentElement.firstChild.innerText), 1);
    filterResults(filtersArray);
    e.target.parentElement.remove();
    if (filtersArray.length == 0) {
        filtersContainer.style.visibility = "hidden";
    }

}
function createFilterItem(str) {
    const filterItem = document.createElement("div");
    filterItem.classList.add("filter-item");

    const filterTablet = document.createElement("div");
    filterTablet.classList.add("filter-tablet");
    filterTablet.innerText = str;

    const filterCancel = document.createElement("div");
    filterCancel.classList.add("filter-cancel");
    filterCancel.innerText = "✕";
    filterCancel.addEventListener("click", removeFilter);
    filterItem.appendChild(filterTablet);
    filterItem.appendChild(filterCancel);

    return filterItem;
}