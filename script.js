const API_KEY = "5574017e84652dc35d49973680865989";

const weatherIconMap = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌁",
  Dust: "🌪️",
  Fog: "🌫️",
  Sand: "🌪️",
  Ash: "🌋",
  Squall: "🌬️",
  Tornado: "🌪️",
};

let currentWeatherData = null;
let isCelsius = true;

function setWeatherBackground(main) {
  const body = document.body;
  body.classList.remove(
    "weather-sunny",
    "weather-cloudy",
    "weather-rainy",
    "weather-stormy",
    "weather-snowy"
  );

  switch (main) {
    case "Clear":
      body.classList.add("weather-sunny");
      break;
    case "Clouds":
      body.classList.add("weather-cloudy");
      break;
    case "Rain":
    case "Drizzle":
      body.classList.add("weather-rainy");
      break;
    case "Thunderstorm":
      body.classList.add("weather-stormy");
      break;
    case "Snow":
      body.classList.add("weather-snowy");
      break;
    default:
      body.classList.add("weather-cloudy");
  }
}

const updateDisplay = () => {
  if (!currentWeatherData) return;

  const weatherMain = currentWeatherData.weather[0].main;
  setWeatherBackground(weatherMain);
  const temp = currentWeatherData.main.temp;
  const feels = currentWeatherData.main.feels_like;

  const displayedTemp = isCelsius
    ? `${Math.round(temp)}°C`
    : `${Math.round((temp * 9) / 5 + 32)}°F`;

  const displayedFeels = isCelsius
    ? `${Math.round(feels)}°C`
    : `${Math.round((feels * 9) / 5 + 32)}°F`;

  document.getElementById("temperature").textContent = displayedTemp;
  document.getElementById("feelsLike").textContent = displayedFeels;
  document.getElementById(
    "humidity"
  ).textContent = `${currentWeatherData.main.humidity}%`;
  document.getElementById(
    "wind"
  ).textContent = `${currentWeatherData.wind.speed} km/h`;
  document.getElementById(
    "pressure"
  ).textContent = `${currentWeatherData.main.pressure} hPa`;

  const weather = currentWeatherData.weather[0].main;
  document.getElementById("weatherIcon").textContent =
    weatherIconMap[weather] || "❓";
  document.getElementById(
    "location"
  ).textContent = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;
  document.getElementById("description").textContent =
    currentWeatherData.weather[0].description;
};

const getWeather = async (lat, lon, city = "") => {
  let url = city
    ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    currentWeatherData = data;
    updateDisplay();
    await fetchHourlyForecast(lat, lon, city);
  } catch (err) {
    alert("Erreur de récupération des données météo.");
    console.error(err);
  }
};

// Geolocation
navigator.geolocation.getCurrentPosition(
  (position) => getWeather(position.coords.latitude, position.coords.longitude),
  (error) => {
    alert("Accès à la localisation refusé. Ville par défaut : Paris.");
    getWeather(null, null, "Paris");
  }
);

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// City search
document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) {
      getWeather(null, null, city);
    }
  }
});

// Unit toggle
document.getElementById("unitToggle").addEventListener("click", () => {
  isCelsius = !isCelsius;
  document.getElementById("unitToggle").textContent = isCelsius ? "°F" : "°C";
  updateDisplay();
});

// 3hour forcaste


const fetchHourlyForecast = async (lat, lon, city = "") => {
  let url = city
    ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    : `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const container = document.getElementById("hourlyForecast");
  container.innerHTML =
    '<div class="loading-container"><div class="loading"></div><span>Chargement des prévisions horaires...</span></div>';

  try {
    const res = await fetch(url);
    const data = await res.json();
    container.innerHTML = "";

    const hourlyData = data.list.slice(0, 8); // Next 24h (3h steps)

    hourlyData.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const hour = date.getHours().toString().padStart(2, "0");
      const temp = isCelsius
        ? `${Math.round(item.main.temp)}°C`
        : `${Math.round((item.main.temp * 9) / 5 + 32)}°F`;
      
      const weather = item.weather[0].main; // ✅ Use forecast weather, not current
      const icon = weatherIconMap[weather] || "";

      const card = document.createElement("div");
      card.className = "hour-card";
      card.innerHTML = `
        <div>${hour}:00</div>
        ${icon}
        <div>${temp}</div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML =
      "<div>Erreur de chargement des prévisions horaires.</div>";
    console.error("Hourly forecast error:", err);
  }
};
