# 🌦️ WeatherPro

**WeatherPro** is a responsive weather web app that displays real-time weather information, including current conditions, 3-hour forecasts, and a 5-day forecast. Built with HTML, CSS, and JavaScript, it uses the OpenWeather API to deliver accurate weather data. It also supports dark mode and geolocation.

## 🔍 Features

- 📍 Auto-detects user location or allows manual city search  
- 🌡️ Shows current temperature, humidity, wind, and weather description  
- 🕒 Displays 3-hour interval forecast  
- 📈 Line chart visualization of 3-hour temperature forecast using Chart.js  
- 📆 5-day weather forecast using OpenWeather's 3-hour forecast for 5 days API  
- 🌓 Light and dark mode with responsive UI  
- 📱 Mobile-friendly and accessible design  
- 🔍 Search button and Enter key both trigger weather updates  

## 🛠️ Technologies Used

- HTML5, CSS3, JavaScript (Vanilla)  
- [OpenWeather API](https://openweathermap.org/) (`/weather`, `/forecast`)  
- [Chart.js](https://www.chartjs.org/) for line chart  
- Geolocation API  
- Responsive Design (media queries, flex/grid layout)  

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/weatherpro.git
cd weatherpro
```
### 2. Add your OpenWeather API key

Edit the `script.js` (or config file) and replace `YOUR_API_KEY`:

``` js
const API_KEY = "YOUR_API_KEY";
```
### 3. Open in Browser

You can open index.html directly in your browser,
Or use a Live Server extension if you're using VS Code.

---

## 🚀 Future Improvements

- 🌍 Multi-language support  
- 🌫️ Air quality index display  
- 🚨 Weather alerts  

---

## 🙌 Credits

- [OpenWeather API](https://openweathermap.org/)  
- [Chart.js](https://www.chartjs.org/)
---

## 📄 License

This project is licensed under the **MIT License**.

---

Made with ❤️ by **Zakaria Ghazi**
