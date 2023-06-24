"use strict";

const homeBtn = document.querySelector(".home__button");

homeBtn.addEventListener("click", () => {
  window.location.href = "start.html";
});

setInterval(function () {
  window.location.load();
});
