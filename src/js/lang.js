function getLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lang = urlParams.get("lang") || navigator.language.slice(0, 2);

  return lang ? lang : "en";
}

async function fetchLanguageData(lang) {
  const URL = `https://raw.githubusercontent.com/Sergey-Chernushevich/banner/lang/i18n/${lang}.json`;
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function updateContent(langData, userPreferredLanguage) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.setAttribute("data-lang", userPreferredLanguage);
    if (key.includes("{{price}}")) {
      const price = element.getAttribute("data-price");

      element.innerHTML = langData[key].replace("{{price}}", price);
    } else {
      element.innerHTML = langData[key];
    }
  });
}

async function changeLanguage(lang) {
  const langData = await fetchLanguageData(lang);
  updateContent(langData);

  toggleArabicStylesheet(lang);
}

window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = getLanguage();
  document
    .getElementById("banner")
    .setAttribute("data-lang", userPreferredLanguage);
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData, userPreferredLanguage);
});
