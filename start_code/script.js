const countriesList = document.querySelector("#countriesList");
const form = document.querySelector("#formCountries");
const input = document.querySelector("#inputCountry");

let countriesData;
let filteredCountries;

// fetch restCountries API data

const fetchData = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const jsonData = await response.json();
  return jsonData;
};

// initial setUp

const setUp = async () => {
  countriesData = await fetchData();
  populateList(countriesData);
};

setUp();

// populate list with country name and population data

const populateList = (countries) => {
  countriesList.innerHTML = "";

  countries.forEach((country) => {
    const name = document.createElement("li");
    name.textContent = country.name.common;
    countriesList.appendChild(name);
    const population = document.createElement("li");
    population.textContent = country.population;
    countriesList.appendChild(population);
  });
};

// click button event listener
// filter the country inputed on click

form.addEventListener("click", () => {
  filter(input.value);
});

// filter country info by searched country and populate empty list

const filter = (query) => {
  const filteredCountries = countriesData.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  countriesList.innerHTML = "";
  populateList(filteredCountries);
};
