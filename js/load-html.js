function includeHTML() {
  let elements = document.querySelectorAll("[data-include-html]");
  elements.forEach((el) => {
    let file = el.getAttribute("data-include-html");
    if (file) {
      fetch(file)
        .then((response) => response.text())
        .then((data) => {
          // Parse the fetched HTML content
          let parser = new DOMParser();
          let doc = parser.parseFromString(data, "text/html");

          // Remove all <script> tags from the body
          let scripts = doc.body.querySelectorAll("script");
          scripts.forEach((script) => script.remove());

          // Extract the content within the <body> tag
          let bodyContent = doc.body.innerHTML;

          // Insert the extracted body content into the target element
          el.innerHTML = bodyContent;

          // Remove the attribute to prevent redundant inclusions
          el.removeAttribute("data-include-html");

          // Call includeHTML again to process nested inclusions
          includeHTML();
        })
        .catch((err) => console.error("Error loading HTML:", err));
    }
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
