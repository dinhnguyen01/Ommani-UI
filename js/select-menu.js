import includeHTML from "../js/middleware.js";

document.addEventListener("DOMContentLoaded", function () {
  includeHTML(initializeSelectMenu);
});

function initializeSelectMenu() {
  const optionMenu = document.querySelector(".select-menu");
  if (optionMenu) {
    const selectBtn = optionMenu.querySelector(".select-btn");
    const iconArrow = selectBtn.querySelector(".bi-chevron-down");
    const options = optionMenu.querySelectorAll(".option");
    const sBtn_text = selectBtn.querySelector(".sBtn-text");

    selectBtn.addEventListener("click", () =>
      optionMenu.classList.toggle("active")
    );

    options.forEach((option) => {
      option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        optionMenu.classList.remove("active");
        iconArrow.style.display = "none";
      });
    });
  } else {
    console.error("Could not find element with class 'select-menu'");
  }
}
