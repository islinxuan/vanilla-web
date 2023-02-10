const menu = document.querySelector(".menu");
const nav = document.querySelector("nav");

document.querySelector(".toggle").addEventListener("click", () => {
  if (menu.classList.toggle("active")) {
    menu.innerHTML = " close ";
    nav.classList.add("active");
  } else {
    menu.innerHTML = " menu ";
    nav.classList.remove("active");
  }
});
