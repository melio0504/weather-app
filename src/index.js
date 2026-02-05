import './styles.css';
import { getWeatherIcon, thermometerIcon, umbrellaIcon, windIcon } from './weatherIcons';

/* 
  This is just a free tier API key so I don't mind
  having it in my frontend since I am just 
  practicing how to do asynchronous code.

  So don't worry if you are reading this shitty codebase
  of mine. I will learn how to handle API in backend.

  Love much~
*/

const WEATHER_API = '9T7BNC95NS5QXRVSWVDPTCEUV';
const GIPHY_API = 'AEM2sVUVAZQT47TtYFcrutqvDw4WzO01';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input[name="searchBar"]');
const currentTimeSpan = document.getElementById('currentTime');
const weatherIconImg = document.getElementById('weather-icon');
const currentTempH2 = document.querySelector('.current-temp');
const feelSpan = document.querySelector('.feel');
const weatherGifImg = document.getElementById('weather-gif');
const tempRangeSpan = document.getElementById('temp-range');
const rainChanceSpan = document.getElementById('rain-chance');
const windSpeedSpan = document.getElementById('wind-speed');
const sunriseTimeSpan = document.getElementById('sunrise-time');
const sunsetTimeSpan = document.getElementById('sunset-time');
const uvIndexSpan = document.getElementById('uv-index');
const pressureSpan = document.getElementById('pressure');
const humiditySpan = document.getElementById('humidity');
const nextHoursSection = document.querySelector('.next-hours');
const nextDaysSection = document.querySelector('.next-days');

async function getWeatherData(location) {
  try {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${WEATHER_API}&contentType=json`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Could not fetch weather data:", error);
    alert('Could not find weather data for the specified location. Please try again.');
    
    return null;
  }
}

async function getGiphy(searchTerm) {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API}&q=${searchTerm}&limit=1&offset=0&rating=g&lang=en`);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data.data[0].images.original.url;
    } catch (error) {
        console.error("Could not fetch GIF:", error);
    }
}

function updateCurrentTime() {
  const now = new Date();
  currentTimeSpan.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function updateUI(weatherData) {
  const { currentConditions, days } = weatherData;

  // Overview
  currentTempH2.textContent = `${Math.round(currentConditions.temp)}°`;
  feelSpan.textContent = currentConditions.conditions;
  weatherIconImg.src = getWeatherIcon(currentConditions.icon);

  const weatherCondition = currentConditions.conditions.toLowerCase();
  const getRandomTerm = terms => terms[Math.floor(Math.random() * terms.length)];
  let giphySearchTerm = 'cat';

  if (weatherCondition.includes('sun') || weatherCondition.includes('clear')) {
    giphySearchTerm = getRandomTerm(['summer cat', 'sunny cat', 'beach cat', 'cat sunbathing']);
  } else if (weatherCondition.includes('rain')) {
    giphySearchTerm = getRandomTerm(['rainy cat', 'cat in the rain', 'wet cat', 'umbrella cat']);
  } else if (weatherCondition.includes('storm') || weatherCondition.includes('thunder')) {
    giphySearchTerm = getRandomTerm(['storm cat', 'thunder cat', 'scared cat', 'cat hiding']);
  } else if (weatherCondition.includes('snow') || weatherCondition.includes('blizzard') || weatherCondition.includes('ice')) {
    giphySearchTerm = getRandomTerm(['snow cat', 'winter cat', 'cold cat', 'cat in snow']);
  } else if (weatherCondition.includes('cloud')) {
    giphySearchTerm = getRandomTerm(['cloudy cat', 'cozy cat', 'sleepy cat', 'cat nap']);
  } else if (weatherCondition.includes('fog') || weatherCondition.includes('mist') || weatherCondition.includes('haze')) {
    giphySearchTerm = getRandomTerm(['foggy cat', 'mysterious cat', 'curious cat', 'cat in mist']);
  } else if (weatherCondition.includes('wind')) {
    giphySearchTerm = getRandomTerm(['windy cat', 'cat in wind', 'fluffy cat', 'dramatic cat']);
  }

  getGiphy(giphySearchTerm).then(gifUrl => {
    if (gifUrl) {
      weatherGifImg.src = gifUrl;
    }
  });

  // Additional Details
  tempRangeSpan.textContent = `${Math.round(days[0].tempmin)}° / ${Math.round(days[0].tempmax)}°`;
  rainChanceSpan.textContent = `${days[0].precipprob}%`;
  windSpeedSpan.textContent = `${currentConditions.windspeed} km/h`;
  sunriseTimeSpan.textContent = currentConditions.sunrise.slice(0, 5);
  sunsetTimeSpan.textContent = currentConditions.sunset.slice(0, 5);
  uvIndexSpan.textContent = currentConditions.uvindex;
  pressureSpan.textContent = `${currentConditions.pressure} hPa`;
  humiditySpan.textContent = `${currentConditions.humidity}%`;

  // Next Hours
  nextHoursSection.innerHTML = '';
  const now = new Date();
  const currentHour = now.getHours();
  days[0].hours.slice(currentHour, currentHour + 24).forEach(hour => {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour-forecast');
    hourDiv.innerHTML = `
      <p>${hour.datetime.slice(0, 5)}</p>
      <img src="${getWeatherIcon(hour.icon)}" alt="${hour.conditions}" width="80px" height="80px" draggable="false">
      <p>${hour.conditions}</p>
      <p><img src="${thermometerIcon}" width="30px" height="30px" draggable="false"> ${Math.round(hour.temp)}°</p>
      <p><img src="${umbrellaIcon}" width="30px" height="30px" draggable="false"> ${hour.precipprob}%</p>
      <p><img src="${windIcon}" width="30px" height="30px" draggable="false"> ${hour.windspeed} km/h</p>
    `;
    nextHoursSection.appendChild(hourDiv);
  });

  // Next Days
  nextDaysSection.innerHTML = '';
  days.slice(1, 4).forEach(day => {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day-forecast');
    const date = new Date(day.datetime);
    const formattedDate = `${date.toLocaleDateString('en-US', { weekday: 'short' })}, ${date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}`;
    dayDiv.innerHTML = `
      <p>${formattedDate}</p>
      <img src="${getWeatherIcon(day.icon)}" alt="${day.conditions}" width="150px" height="150px" draggable="false">
      <p>${day.conditions}</p>
      <p>${Math.round(day.tempmin)}° / ${Math.round(day.tempmax)}°</p>
      <p>${day.precipprob}%</p>
    `;
    nextDaysSection.appendChild(dayDiv);
  });
}

async function searchWeather(e) {
  e.preventDefault();
  const location = searchInput.value;
  if (location) {
    const weatherData = await getWeatherData(location);
    if (weatherData) {
      updateUI(weatherData);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);
  searchForm.addEventListener('submit', searchWeather);

  getWeatherData('Manila').then(weatherData => {
    if (weatherData) {
      updateUI(weatherData);
    }
  });
});
