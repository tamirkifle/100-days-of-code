const featureBtns = document.querySelectorAll(".features_menu_item");
const featureItems = document.querySelectorAll(".features_item");
featureBtns.forEach(fBtn => fBtn.addEventListener("click", makeSelected));

function makeSelected(e){
    const clickedBtn = e.currentTarget;
    let index = 0;
    if(clickedBtn.classList.contains("selected")){
        return;
    }
    
    featureBtns.forEach((btn, i) => {
        btn.classList.remove("selected");
        if(btn === clickedBtn){
            index = i;
        }
    });
    clickedBtn.classList.add("selected");
    featureItems.forEach((item) => item.classList.remove("selected"));
    featureItems[index].classList.add("selected");    
}

const faqs = document.querySelectorAll(".faq_qns_item");
faqs.forEach(qn => qn.addEventListener("click", toggleQuestion));

function toggleQuestion(e){
    const clickedFAQ = e.currentTarget;
    
    if(clickedFAQ.classList.contains("closed")){// If Question is closed, expand it
        clickedFAQ.classList.remove("closed");
    }
    else{// If Question is open, close it
        clickedFAQ.classList.add("closed");
    }
}

