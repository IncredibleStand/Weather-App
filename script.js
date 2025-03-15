const API_KEY = '40701085b1ade060a4bfbd658def94a3'; // Replace with your API key
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message');
const weatherInfo = document.getElementById('weather-info');

const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherEmoji = document.getElementById('weather-emoji');

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
    } else {
      showError('City not found. Please try again.');
    }
  } catch (error) {
    showError('An error occurred. Please try again later.');
  }
});

// Add event listener for Enter key
cityInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission (if inside a form)
    searchBtn.click(); // Trigger the search button's click event
  }
});

function displayWeather(data) {
  errorMessage.classList.add('d-none'); // Hide error message
  weatherInfo.classList.remove('d-none'); // Show weather info

  cityName.textContent = `${data.name}, ${data.sys.country}`;
  temperature.textContent = data.main.temp;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  windSpeed.textContent = data.wind.speed;

  // Set weather emoji and background
  const weatherCondition = data.weather[0].main.toLowerCase();
  setWeatherTheme(weatherCondition);
}

function setWeatherTheme(weatherCondition) {
  const body = document.body;
  body.className = ''; // Reset all classes
  body.classList.add(weatherCondition);

  // Set emoji based on weather condition
  switch (weatherCondition) {
    case 'clear':
      weatherEmoji.textContent = '☀️';
      break;
    case 'clouds':
      weatherEmoji.textContent = '☁️';
      break;
    case 'rain':
      weatherEmoji.textContent = '🌧️';
      break;
    case 'snow':
      weatherEmoji.textContent = '❄️';
      break;
    case 'smoke':
      weatherEmoji.textContent = '💨';
      break;
    case 'thunderstorm':
      weatherEmoji.textContent = '⛈️';
      break;
    case 'mist':
      weatherEmoji.textContent = '🌫️';
      break;
    default:
      weatherEmoji.textContent = '🌈';
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('d-none'); // Show error message
  weatherInfo.classList.add('d-none'); // Hide weather info
}