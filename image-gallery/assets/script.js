let currentX;
let currentWidth = localStorage.getItem("scalable-width") || getScalableWidth();

document.querySelector(".scalable").style.width = `${currentWidth}px`;
document.querySelector(".separator").addEventListener("pointerdown", startDrag);

function startDrag(e) {
  currentX = e.clientX;
  currentWidth = getScalableWidth();

  document.documentElement.addEventListener("pointermove", onDrag);
  document.documentElement.addEventListener("pointerup", stopDrag);
}

function onDrag(e) {
  let newWidth = currentWidth + e.clientX - currentX;
  document.querySelector(".scalable").style.width = `${newWidth}px`;
}

function stopDrag(e) {
  localStorage.setItem("scalable-width", getScalableWidth());

  document.documentElement.removeEventListener("pointermove", onDrag);
  document.documentElement.removeEventListener("pointerup", startDrag);
}

function getScalableWidth() {
  return document.querySelector(".scalable").offsetWidth;
}
