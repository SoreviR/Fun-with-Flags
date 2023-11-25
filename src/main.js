const urlAll = "https://restcountries.com/v3.1/all";
const urlFields =
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,subregion,borders,continents,tld,currency,languages";

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
//-------------------------------- Data ready to use ------------------------------------
const datos = await getData(urlAll);

//------------------------------- Search input logic ----------------------------------
const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", () => {
  const searchInput = document.querySelector("#search-input");
  const filter = searchInput.value.toLowerCase();
  const listCards = document.querySelectorAll(".country-name");

  listCards.forEach((item) => {
    const parent = item.parentNode;
    const parentParent = parent.parentNode;

    let text = item.textContent;

    if (text.toLowerCase().includes(filter)) {
      parentParent.style.display = "";
    } else {
      parentParent.style.display = "none";
    }
  });
});

//--------------------------------------- Create cards ---------------------------------------
const countryCard = (data) => {
  data.forEach((country) => {
    const sectionCards = document.querySelector("section");

    sectionCards.classList =
      "flex w-screen flex-wrap p-10 gap-10 justify-center";

    sectionCards.innerHTML += `<div class="country-card border rounded-md flex flex-col gap-6 w-80">
        <img class="h-60 rounded-t-md" src="${country.flags.svg}">
        <div class="p-4 font-semibold text-black dark:text-white">
            <p class="country-name">${country.name.common}</p>
            <p>Population: ${country.population}</p>
            <p class="country-region" >Region: ${country.region}</p>
            <p>Capital: ${country.capital}</p>
        </div>
    </div>`;
  });
};
countryCard(datos);

//-------------- Add event to each card. When is clicked create an object with values and save the object in local storage ------------
const cardsWithEvent = document.querySelectorAll(".country-card");
cardsWithEvent.forEach((card, index) => {
  card.addEventListener("click", () => {
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
    } = datos[index];

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

    localStorage.setItem("country", JSON.stringify(countryInfo));

    location.replace(
      "http://127.0.0.1:5500/Fun-with-Flags/src/singleflag.html"
    );
  });
});

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

//-------------------------------------- Select logic ---------------------------------------

const selectOption = document.querySelector("select");

// const regionSelected = selectOption.value.toLowerCase();

const listCardRegion = document.querySelectorAll(".country-region");

selectOption.addEventListener("change", () => {
  const selectOption = document.querySelector("select");

  const regionSelected = selectOption.value.toLowerCase();

  listCardRegion.forEach((item) => {
    const parent = item.parentNode;
    const parentParent = parent.parentNode;

    let text = item.textContent;

    if (text.toLowerCase().includes(regionSelected)) {
      parentParent.style.display = "";
    } else if (regionSelected === "all" || regionSelected === "select") {
      parentParent.style.display = "";
    } else {
      parentParent.style.display = "none";
    }
  });
});
