const textToType =
  "Make in advance a playlist for your Celebration of Life.\n\nDo not take risk having bad songs on your last ride!\n\n";

const typingElement = document.querySelector(".content__img");

function typeText(text, index) {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    if (text.charAt(index) === "\n") {
      typingElement.innerHTML += "<br>";
    }
    setTimeout(() => typeText(text, index + 1), 100);
  }
}

window.addEventListener("load", () => {
  typeText(textToType, 0);
});

const headerBtn = document.querySelector(".header__button");
headerBtn.addEventListener("click", () => {
  window.location.href = "start.html";
});
