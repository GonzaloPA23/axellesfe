const button = document.querySelector("#menu-button");
const menu = document.querySelector("#menu-list");
const icon = document.querySelector("#icon-change");

button.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  icon.classList.contains("fa-xmark")
    ? icon.classList.replace("fa-xmark", "fa-bars")
    : icon.classList.replace("fa-bars", "fa-xmark");
});