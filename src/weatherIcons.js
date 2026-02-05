import clearDay from '../public/images/icons/clear-day.svg';
import clearNight from '../public/images/icons/clear-night.svg';
import cloudy from '../public/images/icons/cloudy.svg';
import fog from '../public/images/icons/fog.svg';
import hail from '../public/images/icons/hail.svg';
import partlyCloudyDay from '../public/images/icons/partly-cloudy-day.svg';
import partlyCloudyNight from '../public/images/icons/partly-cloudy-night.svg';
import rain from '../public/images/icons/rain.svg';
import rainSnowShowersDay from '../public/images/icons/partly-cloudy-day-snow.svg';
import rainSnowShowersNight from '../public/images/icons/partly-cloudy-night-snow.svg';
import showersDay from '../public/images/icons/partly-cloudy-day-rain.svg';
import showersNight from '../public/images/icons/partly-cloudy-night-rain.svg';
import sleet from '../public/images/icons/sleet.svg';
import snow from '../public/images/icons/snow.svg';
import snowShowersDay from '../public/images/icons/partly-cloudy-day-snow.svg';
import snowShowersNight from '../public/images/icons/partly-cloudy-night-snow.svg';
import thunder from '../public/images/icons/thunderstorms.svg';
import thunderRain from '../public/images/icons/thunderstorms-rain.svg';
import thunderShowersDay from '../public/images/icons/thunderstorms-day-rain.svg';
import thunderShowersNight from '../public/images/icons/thunderstorms-night-rain.svg';
import wind from '../public/images/icons/wind.svg';
import thermometerIcon from '../public/images/icons/thermometer.svg';
import umbrellaIcon from '../public/images/icons/umbrella.svg';
import windIcon from '../public/images/icons/wind.svg';

const iconMap = {
  'clear-day': clearDay,
  'clear-night': clearNight,
  'cloudy': cloudy,
  'fog': fog,
  'hail': hail,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-night': partlyCloudyNight,
  'rain': rain,
  'rain-snow-showers-day': rainSnowShowersDay,
  'rain-snow-showers-night': rainSnowShowersNight,
  'showers-day': showersDay,
  'showers-night': showersNight,
  'sleet': sleet,
  'snow': snow,
  'snow-showers-day': snowShowersDay,
  'snow-showers-night': snowShowersNight,
  'thunder': thunder,
  'thunder-rain': thunderRain,
  'thunder-showers-day': thunderShowersDay,
  'thunder-showers-night': thunderShowersNight,
  'wind': wind,
};

export function getWeatherIcon(iconName) {
  return iconMap[iconName] || clearDay;
}

export { thermometerIcon, umbrellaIcon, windIcon };
