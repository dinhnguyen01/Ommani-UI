import includeHTML from "../js/middleware.js";

function handleCollapse() {
  const windowWidth = window.innerWidth;

  const footerTop = document.querySelector(".footer-top_content");
  const columnNotChild = footerTop.querySelectorAll(".column.column-not-child");
  const columnHasChild = footerTop.querySelectorAll(".column.column-has-child");
  columnNotChild.forEach((column, parentIndex) => {
    if (windowWidth < 768) {
      const columnTitles = column.querySelectorAll(".column-title");
      columnTitles.forEach((columnTitle) => {
        columnTitle.setAttribute("data-bs-toggle", "collapse");
        columnTitle.setAttribute(
          "data-bs-target",
          `#collapseParent-${parentIndex}`
        );
        columnTitle.setAttribute("aria-expanded", "false");
        columnTitle.setAttribute(
          "aria-controls",
          `collapseControl-${parentIndex}`
        );
      });
      const contentsParents = column.querySelectorAll(".column-content");
      contentsParents.forEach((content) => {
        content.classList.add("collapse");
        content.setAttribute("id", `collapseParent-${parentIndex}`);
        content.classList.remove("show");
      });
    } else {
      const columnTitles = column.querySelectorAll(".column-title");
      columnTitles.forEach((columnTitle) => {
        columnTitle.removeAttribute("data-bs-toggle");
        columnTitle.removeAttribute("data-bs-target");
        columnTitle.removeAttribute("aria-expanded");
        columnTitle.removeAttribute("aria-controls");
      });

      const contentsParents = column.querySelectorAll(".column-content");
      contentsParents.forEach((content) => {
        content.classList.remove("collapse");
        content.removeAttribute("id");
      });
    }
  });

  columnHasChild.forEach((column, subIndex) => {
    const childColumn = column.querySelectorAll(".child-column");
    childColumn.forEach((child, childIndex) => {
      if (windowWidth < 768) {
        const columnTitles = child.querySelectorAll(".column-title");
        columnTitles.forEach((columnTitle) => {
          columnTitle.setAttribute("data-bs-toggle", "collapse");
          columnTitle.setAttribute(
            "data-bs-target",
            `#collapseChild-${childIndex}-${subIndex}`
          );
          columnTitle.setAttribute("aria-expanded", "false");
          columnTitle.setAttribute(
            "aria-controls",
            `collapseControl-${childIndex}-${subIndex}`
          );
        });
        const contentsChilds = child.querySelectorAll(".column-content");
        contentsChilds.forEach((content) => {
          content.classList.add("collapse");
          content.setAttribute("id", `collapseChild-${childIndex}-${subIndex}`);
          content.classList.remove("show");
        });
      } else {
        const columnTitles = column.querySelectorAll(".column-title");
        columnTitles.forEach((columnTitle) => {
          columnTitle.removeAttribute("data-bs-toggle");
          columnTitle.removeAttribute("data-bs-target");
          columnTitle.removeAttribute("aria-expanded");
          columnTitle.removeAttribute("aria-controls");
        });

        const contentsParents = column.querySelectorAll(".column-content");
        contentsParents.forEach((content) => {
          content.classList.remove("collapse");
          content.removeAttribute("id");
        });
      }
    });
  });
}

function initializeCollapse() {
  window.addEventListener("resize", handleCollapse);
  handleCollapse(); // Ensure collapse is handled on initial load as well
}

document.addEventListener("DOMContentLoaded", function () {
  includeHTML(initializeCollapse);
});
