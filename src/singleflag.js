const countryInfo = JSON.parse(localStorage.getItem("country"));

const sectionCard = document.querySelector(".card-container");

//------------------- Borders Logic Creation---------------------------
const borders = countryInfo.borders;

const createBorderButtons = () => {
  const buttonContainer = document.querySelector(".button-containers");

  borders.forEach((border) => {
    buttonContainer.innerHTML += `<button class="border-button py-2 px-4 w-16 bg-slate-300 rounded">${border}</button>`;
  });
};

//------------------- Card Creation ---------------------------

const renderingCountry = (countryInformation) => {
  //------------------- Searching Currencies ---------------------------
  const currencies = Object.values(
    Object.values(countryInformation.currencies)[0]
  );

  //------------------- Searching Languages ---------------------------
  const languages = Object.values(countryInformation.languages);

  let arrayOfLanguages = "";
  languages.forEach((item) => {
    arrayOfLanguages += " " + item;
  });

  const mainSection = document.createElement("main");
  mainSection.classList = "flex gap-10";

  mainSection.innerHTML = `<main class="flex w-screen p-12 gap-28 dark:text-white">
      <div>
          <img class="w-96" src="${countryInformation.flags.svg}">
      </div>
      <div class="flex flex-col gap-6">
          
          <div class="flex gap-10">
              <div>
                  <p class="font-semibold">${countryInformation.name.common}</p>
                  <p>Native Name: ${countryInformation.name.common}</p>
                  <p>Population: ${countryInformation.population}</p>
                  <p>Region: ${countryInformation.region}</p>
                  <p>Subregion: ${countryInformation.subregion}</p>
                  <p>Capital: ${countryInformation.capital}</p>
              </div>
              <div class="pt-6">
                  <p>Top Level Domain: ${countryInformation.tld[0]}</p>
                  <p>Currencies: ${currencies[0]}</p>
                  <p>Language(s): ${arrayOfLanguages}</p>
              </div>
          </div>
          <div class="flex gap-24">
              <p>Border Countries: </p>
              <div class="button-containers flex gap-4 flex-wrap w-96 "></div>
          </div>
      </div>
  </main>`;

  sectionCard.append(mainSection);
};

renderingCountry(countryInfo);

//----------- Borders creation call -----------
createBorderButtons();

//-------------------------------- Dark mode ------------------------------------------
const darkModeButton = document.querySelector(".dark-mode");

darkModeButton.addEventListener("click", () => {
  const htmlDarkMode = document.querySelector("html");
  htmlDarkMode.classList.toggle("dark");

  const htmlMode = document.querySelector("html");

  if (htmlMode.classList[0] === "dark") {
    darkModeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
</svg>`;
  } else {
    darkModeButton.innerHTML = `<svg viewBox="0 0 24 24" focusable="false" class="">
    <path
      fill="currentColor"
      d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"
    ></path>
  </svg>`;
  }
});

//------------------- Borders Buttons Logic (event) ---------------------------
const borderButtons = document.querySelectorAll(".border-button");

borderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.textContent;

    renderNewCountry(text);
  });
});

//--------------------- Fetching data -----------------------------------
const urlAll = "https://restcountries.com/v3.1/all";
const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
const datos = await getData(urlAll);

const paisesborder = datos.map((pais) => pais.altSpellings[0]);

//--------------------- Rendering New Country -----------------------------------
const renderNewCountry = (text) => {
  const newCountry = datos.filter((country) => country.cca3 === text);

  const {
    name,
    capital,
    population,
    region,
    flags,
    subregion,
    borders,
    continents,
    tld,
    currencies,
    languages,
    altSpellings,
  } = newCountry[0];

  const countryInfo = {
    name,
    capital,
    population,
    region,
    flags,
    subregion,
    borders,
    continents,
    tld,
    currencies,
    languages,
    altSpellings,
  };
  console.log(countryInfo);

  localStorage.setItem("country", JSON.stringify(countryInfo));

  location.reload();
};
