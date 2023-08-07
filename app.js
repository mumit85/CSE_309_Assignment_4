const apiKey = '913bdc461fea26492a4a702c7526f2e4';
let city = 'Dhaka'; // Default city
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

const weatherDiv = document.getElementById('weather');
const locationName = document.getElementById('location-name');
const searchInput = document.getElementById('search-input');

function searchWeather() {
  city = searchInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  fetchWeatherData(apiUrl);
}

function fetchWeatherData(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const forecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00')); // Get the forecast for 12:00:00 each day
      forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        const temperature = Math.round(forecast.main.temp - 273.15); // Convert Kelvin to Celsius
        const html = `
          <div>
            <h2>${date.toDateString()}</h2>
            <img src="${iconUrl}" alt="${forecast.weather[0].description}">
            <p>${temperature} °C</p>
            <p>${forecast.weather[0].description}</p>
          </div>
        `;
        weatherDiv.innerHTML += html;
      });
      locationName.textContent = `${city} 5 Day Weather Forecast`;
    })
    .catch(error => console.error(error));
}

fetchWeatherData(apiUrl);
