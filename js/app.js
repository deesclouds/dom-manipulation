/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

// Selects the navbar
const menu = document.querySelector("#navbar__list");

// Gets section elements from the DOM
const sections = document.querySelectorAll("section");

// Builds the nav

/*
@description Loops through the sections to create menu items
@param {HTML Element} section
*/

// Loops through the sections to create menu items

sections.forEach((section) => {
  // Creates list item for each section
  const menuItem = document.createElement("li");

  // Creates link for each section
  const menuLink = document.createElement("a");

  // Adds attributes to each section's link
  menuItem.setAttribute("data-nav", `${section.dataset.nav}`);
  menuLink.setAttribute("href", `#${section.id}`);
  menuLink.setAttribute("class", `menu__link`);

  // Adds section heading to nav link
  menuLink.textContent = section.querySelector("h2").textContent;

  // Adds link to nav item
  menuItem.appendChild(menuLink);

  // Adds link to navbar
  menu.appendChild(menuItem);
});

// Selects all links with class .menu__link
const menuLinks = document.querySelectorAll(".menu__link");

// Sets each section's class and nav links to active based on if section is visible within the viewport.

const setActive = () => {
  sections.forEach((section) => {
    // Adds active class on section each element
    isInViewport(section)
      ? // If section is in viewport add if not remove active class
        section.classList.add("active")
      : section.classList.remove("active");

    // Adds active class on anchor tag targeting data-nav from section element
    const menuLink = document.querySelector(
      `li[data-nav='${section.dataset.nav}'] .menu__link`
    );

    isInViewport(section)
      ? // If link is in viewport and if not remove active class
        menuLink.classList.add("active")
      : menuLink.classList.remove("active");
  });
};

// Checks if section is in viewport with .getBoundingClientRect()
const isInViewport = (section) => {
  const watching = section.getBoundingClientRect();
  return (
    watching.top <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    watching.bottom >= 0 &&
    watching.bottom - watching.height / 2 >=
      (window.innerHeight || document.documentElement.clientHeight) / 2
  );
};

// Listens for scroll within window and adds the active class to section elements
window.addEventListener("scroll", setActive);

// Listens for click on menu links
menuLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    // Prevents link's default behavior
    e.preventDefault();
    // Selects section elements based on menu links' href and scrolls matching section into view
    document.querySelector(e.target.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "start",
    });
  })
);
