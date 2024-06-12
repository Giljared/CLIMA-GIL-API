//CHAVES AQUI

const apiKey = "c7e33444c632a45a8829bdbf1c7fe46b";
//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=
//c7e33444c632a45a8829bdbf1c7fe46b
//https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c7e33444c632a45a8829bdbf1c7fe46b


// API = BANDEIRA AQUI
const apiCountryURL = "https://flagsapi.com/BR/shiny/64.png";


const apiCountryImage = document.createElement('img');
apiCountryImage.src = apiCountryURL;
apiCountryImage.alt = "Bandeira";

// Get the target div
const weatherDataDiv = document.querySelector("#weather-data");

// Get the element where you want to insert the image (assuming after the city name)
const citySpan = weatherDataDiv.querySelector("#city");

// Insert the image after the city span
citySpan.parentNode.insertBefore(apiCountryImage, citySpan.nextSibling);


// OUTRAS FORMAS AQUI
// const apiCountryImage = document.createElement('img');
// apiCountryImage.src = apiCountryURL;
// apiCountryImage.alt = "Bandeira";
// document.body.appendChild(apiCountryImage);



const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");


// EVENTOS BOTÃO CLIQUE AQUI
searchBtn.addEventListener("click",(e)=>{

  e.preventDefault();

  const city = cityInput.value;

  // showWeatherData(city); --- TESTANDO
  // console.log(city); --- TESTANDO
  // console.log("city"); --- TESTANDO
  // console.log("teste"); --- TESTANDO
});

// BANDEIRA TAG IMAGEM -- OUTRA FORMA
// const bandeiraURL = "https://flagsapi.com/BR/shiny/64.png";
// const bandeiraImage = document.createElement("img");
// bandeiraImage.src = bandeiraURL;
// bandeiraImage.alt = "Bandeira do Brasil";
// document.body.appendChild(bandeiraImage);

// BANDEIRA BACKGROUND -- OUTRA FORMA
// const elemento = document.getElementById("meuElemento");
// elemento.style.backgroundImage = `url("https://flagsapi.com/BR/shiny/64.png")`;

// BANDEIRA ELEMENTO SVG -- OUTRA FORMA
// const bandeiraSVG = `
// <svg width="64" height="64">
//   <image href="https://flagsapi.com/BR/shiny/64.png" x="0" y="0" width="64" height="64" />
// </svg>
// `;

// const elemento = document.getElementById("meuElemento");
// elemento.innerHTML = bandeiraSVG;


// DECLARAÇÃO DE CONST AQUI
const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const suggestionContainer = document.querySelector("#suggestions");
const suggestionButtons = document.querySelectorAll("#suggestions button");

// LOADER
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  toggleLoader();

  return data;
};

// TRATAMENTO DE ERRO
const showErrorMessage = () => {
  errorMessageContainer.classList.remove("hide");
};

const hideInformation = () => {
  errorMessageContainer.classList.add("hide");
  weatherContainer.classList.add("hide");

  suggestionContainer.classList.add("hide");
};

const showWeatherData = async (city) => {
  hideInformation();

  const data = await getWeatherData(city);

  if (data.cod === "404") {
    showErrorMessage();
    return;
  }

  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country);
  umidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;

  // IMAGEM CHANGE BG
  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});

// ALGUMAS SUGESTÕES AQUI
suggestionButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const city = btn.getAttribute("id");

    showWeatherData(city);
  });
});