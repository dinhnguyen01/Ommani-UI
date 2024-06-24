// document.addEventListener("DOMContentLoaded", function () {
//   const optionMenu = document.querySelector(".select-menu");
//   if (optionMenu) {
//     const selectBtn = optionMenu.querySelector(".select-btn");
//     const iconArrow = selectBtn.querySelector(".bi-chevron-down");
//     const options = optionMenu.querySelectorAll(".option");
//     const sBtn_text = selectBtn.querySelector(".sBtn-text");

//     selectBtn.addEventListener("click", () =>
//       optionMenu.classList.toggle("active")
//     );

//     options.forEach((option) => {
//       option.addEventListener("click", () => {
//         let selectedOption = option.querySelector(".option-text").innerText;
//         sBtn_text.innerText = selectedOption;
//         optionMenu.classList.remove("active");
//         iconArrow.style.display = "none";
//       });
//     });
//   } else {
//     console.error("Could not find element with class 'select-menu'");
//   }
// });

function includeHTML(callback) {
  let elements = document.querySelectorAll("[data-include-html]");
  let promises = [];

  elements.forEach((el) => {
    let file = el.getAttribute("data-include-html");
    if (file) {
      let promise = fetch(file)
        .then((response) => response.text())
        .then((data) => {
          let parser = new DOMParser();
          let doc = parser.parseFromString(data, "text/html");
          let scripts = doc.body.querySelectorAll("script");
          scripts.forEach((script) => script.remove());
          let bodyContent = doc.body.innerHTML;
          el.innerHTML = bodyContent;
          el.removeAttribute("data-include-html");
        })
        .catch((err) => console.error("Error loading HTML:", err));

      promises.push(promise);
    }
  });

  Promise.all(promises).then(() => {
    if (typeof callback === "function") {
      callback();
    }
  });
}

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
