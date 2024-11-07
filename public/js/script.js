const weatherInfo = document.getElementById("weather-info");
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const searchCards = document.getElementById("search-cards");

// Load previous searches from localStorage
let previousSearches =
  JSON.parse(localStorage.getItem("weatherSearches")) || [];

function addToPreviousSearches(weatherData) {
  // Remove duplicate if exists
  previousSearches = previousSearches.filter(
    (item) => item.name !== weatherData.name
  );

  // Add new search to beginning of array
  previousSearches.unshift({
    name: weatherData.name,
    country: weatherData.country,
    temp: weatherData.temp,
    description: weatherData.description,
  });

  // Keep only last 10 searches
  if (previousSearches.length > 10) {
    previousSearches.pop();
  }

  // Save to localStorage
  localStorage.setItem("weatherSearches", JSON.stringify(previousSearches));

  // Update UI
  displayPreviousSearches();
}

function displayPreviousSearches() {
  searchCards.innerHTML = previousSearches
    .map(
      (data) => `
        <div class="search-card" onclick="getWeatherData('${data.name}')">
            <h3>${data.name}, ${data.country}</h3>
            <p>${data.temp}°C - ${data.description}</p>
        </div>
    `
    )
    .join("");
}

async function getWeatherData(city) {
  try {
    const response = await fetch(`/weather/${city}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to fetch weather data");
    }

    const data = await response.json();
    displayWeatherData(data);
    addToPreviousSearches(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeatherData(data) {
  document.getElementById("city").textContent = data.name;
  const countryElement = document.getElementById("country");
  countryElement.innerHTML = `
        <div style="margin-bottom: 12px;">${data.country}</div>
        <img src="${data.flagUrl}" alt="${data.country} flag" style="width: 100px; display: block; margin: 0 auto; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    `;

  document.getElementById("temperature").textContent = `${data.temp}°C`;
  document.getElementById("description").textContent = data.description;
  document.getElementById("humidity").textContent = `${data.humidity}%`;
  document.getElementById("wind-speed").textContent = `${data.windSpeed} m/s`;

  const iconUrl = `http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  document.getElementById("weather-icon").src = iconUrl;

  weatherInfo.classList.add("active");
  //Scrolling into the weather info section
  weatherInfo.scrollIntoView();
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

// Display previous searches on page load
displayPreviousSearches();
