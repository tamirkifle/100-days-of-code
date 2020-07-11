
function combo(str) {
    let soln = [];
    if (str.length == 1) {
        soln.push(str);
    }
    else if (str.length == 2) {
        soln.push(str);
        soln.push(str.split("").reverse().join(""));
    }
    else if (str.length > 2) {
        str.split("").map((s, i) => {
            let strLessLetter = str.split("").filter((l, j) => j != i).join("");
            return combo(strLessLetter).map(c => {
                c = c.split("");
                c.unshift(s);
                c = c.join("");
                soln.push(c);
            });
        });

    }
    return soln;

}


function displayResults(word) {
    word = strip(word);
    let array = combo(word);
    document.querySelectorAll(".intro, .container").forEach(item => item.remove());
    let intro = document.createElement("p");
    intro.classList.add("intro");
    let container = document.createElement("div");
    container.classList.add("container");

    document.body.appendChild(intro);
    intro.innerText = `WORD: ${word}\nTOTAL COMBINATIONS: ${array.length}`;
    document.body.appendChild(container);

    array.forEach(combination => {
        let element = document.createElement("span");
        element.innerText = combination;
        element.style.margin = "1rem";
        element.style.padding = "1rem";
        element.style.fontSize = "5rem";
        element.style.border = "1px solid black";
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.flexFlow = "row wrap";
        container.appendChild(element);
    });
}


document.querySelector(".word-input-btn").addEventListener("click", (e) => { displayResults(e.target.parentElement.querySelector("input").value); e.target.parentElement.querySelector("input").value = ""; });




function strip(str) {
    return str.split("").filter(item => /[\w\d-.]/.test(item)).join("");
}