const featureBtns = document.querySelectorAll(".features_menu_item");
const featureItems = document.querySelectorAll(".features_item");
featureBtns.forEach(fBtn => fBtn.addEventListener("click", makeSelected));

function makeSelected(e) {
    const clickedBtn = e.currentTarget;
    let index = 0;
    if (clickedBtn.classList.contains("selected")) {
        return;
    }

    featureBtns.forEach((btn, i) => {
        btn.classList.remove("selected");
        if (btn === clickedBtn) {
            index = i;
        }
    });
    clickedBtn.classList.add("selected");
    featureItems.forEach((item) => item.classList.remove("selected"));
    featureItems[index].classList.add("selected");
}

const faqs = document.querySelectorAll(".faq_qns_item");
faqs.forEach(qn => qn.addEventListener("click", toggleQuestion));

function toggleQuestion(e) {
    const clickedFAQ = e.currentTarget;

    if (clickedFAQ.classList.contains("closed")) {// If Question is closed, expand it
        clickedFAQ.classList.remove("closed");
    }
    else {// If Question is open, close it
        clickedFAQ.classList.add("closed");
    }
}


const contactBtn = document.querySelector(".contact_form_btn");
const contactInput = document.querySelector(".contact_form_input");
const contactForm = document.querySelector(".contact_form");

contactInput.addEventListener("change", e => { e.preventDefault(); handleInput(e); });
contactForm.addEventListener("submit", e => { e.preventDefault(); });
contactInput.addEventListener("invalid", e => e.preventDefault());
contactBtn.addEventListener("click", handleInput);



function handleInput(e) {
    removeError();
    let inputValid = true;
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(contactInput.value) == false && contactInput.value) {
        inputValid = false;
    }
    if (!inputValid) {
        showError();
    }
    else if (inputValid) {
        if (e.currentTarget === contactBtn) {
            if (contactInput.value) {
                contactForm.submit();
            }
            else {
                showError("Whoops, Make sure it's not empty");
            }
        }
    }
    contactBtn.addEventListener("blur", () => {console.log("blur");if(!contactInput.value)removeError();});
    function showError(errorText = "Whoops, make sure it's an email") {
        if (!document.querySelector(".form_error_view")) {
            const formErrorView = document.createElement("div");
            formErrorView.classList.add("form_error_view");
            formErrorView.style.backgroundColor = "hsl(0, 94%, 66%)";
            formErrorView.innerText = errorText;
            formErrorView.style.display = "block";
            contactInput.style.border = "2px solid hsl(0, 94%, 66%)";
            contactInput.style.marginBottom = "0";
            contactInput.style.borderBottomLeftRadius = "0"
            contactInput.style.borderBottomRightRadius = "0"
            contactInput.after(formErrorView);
        }
    }
    function removeError(){
        if(document.querySelector(".form_error_view")){
            document.querySelector(".form_error_view").remove();
            contactInput.style.border = "none";
            contactInput.style.marginBottom = "1rem";
            contactInput.style.borderBottomLeftRadius = "5px"
            contactInput.style.borderBottomRightRadius = "5px"
        }
    }
}





