const includeHTML = function (callback) {
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
};

export default includeHTML;
