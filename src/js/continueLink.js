const options = document.querySelectorAll(".option");
const link = document.getElementById("subscribe-button");

const Options = {
  yearly: { value: "yearly", href: "https://apple.com" },
  weekly: { value: "weekly", href: "https://google.com" },
};

function updateHref() {
  for (let option of options) {
    if (option.checked) {
      const selectedOption = Options[option.value];
      if (selectedOption) {
        link.href = selectedOption.href;
      }
      break;
    }
  }
}

window.onload = function () {
  updateHref();
  for (let option of options) {
    option.addEventListener("change", updateHref);
  }
};
