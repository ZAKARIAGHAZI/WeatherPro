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

const updateDisplay = () => {
  if (!currentWeatherData) return;

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
  document.getElementById("humidity").textContent = `${currentWeatherData.main.humidity}%`;
  document.getElementById("wind").textContent = `${currentWeatherData.wind.speed} km/h`;
  document.getElementById("pressure").textContent = `${currentWeatherData.main.pressure} hPa`;

  const weather = currentWeatherData.weather[0].main;
  document.getElementById("weatherIcon").textContent =weatherIconMap[weather] || "❓";
  document.getElementById("location").textContent = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;
  document.getElementById("description").textContent =currentWeatherData.weather[0].description;
};

const getWeather = async (lat, lon, city = "") => {
  let url = city ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    currentWeatherData = data;
    updateDisplay();
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
