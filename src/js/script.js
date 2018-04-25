const checkbox = document.querySelectorAll(".checkbox");
const registerButton = document.querySelector(".register_button");
const checkboxHidden = document.querySelectorAll(".checkbox__input-hidden");

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].lastElementChild.addEventListener("click", function(e){
        e.preventDefault();
    });
}

for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener("click", function(e){
        console.log(e);
        const input = this.firstElementChild;
        const checkboxHidden = input.firstElementChild;
        input.classList.toggle("click");
        if(input.classList.contains("click")) {
            input.attributes["aria-checked"].value = "true";
            checkboxHidden.checked = true;
        } else {
            input.attributes["aria-checked"].value = "false";
            checkboxHidden.checked = false;
        }
    });

    checkboxHidden[i].addEventListener("focus", function(e){
        const parent = this.parentNode;
        parent.classList.add("checkbox__input--focus");
    });
    checkboxHidden[i].addEventListener("blur", function(e){
        const parent = this.parentNode;
        parent.classList.remove("checkbox__input--focus");
    });
}
registerButton.addEventListener("submit", function(){
    console.log("submit");
});

