import Geocode from '../models/geocode';
import Weather from '../models/weather';
import WeatherForecast from '../models/weatherForecast';
import { openWeatherApiKey as apiKey } from './info';
const units = 'imperial'; //for Weather

export async function geocodeCity(city: string, state = '', country = '') {
  const count = 5; //max number of search results to show user

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=${count}&language=en&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch geocode data for url: ' + url);
  }
  const data = await response.json();
  const { results }: { results: Geocode[] } = data;

  if (results === undefined) {
    throw new Error('Could not find location: ' + city);
  }

  const geocodeList: Geocode[] = results.filter(
    (loc) =>
      (state === '' || loc.admin1 === state) &&
      (country === '' || loc.country === country)
  );

  if (geocodeList.length === 0) {
    throw new Error(
      'Could not find location: ' + city + ', ' + state + ', ' + country
    );
  }
  //console.log(geocodeList.map((loc) => loc.name + ', ' + loc.admin1));
  return geocodeList;

  //console.log('lat:' + geocodeData.latitude + ' lon:' + geocodeData.longitude);
}

export async function fetchCurrentWeather(location: Geocode) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=${units}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch weather data for url: ' + url);
  }

  const data: Weather = await response.json();
  return data;
}

export async function fetchWeatherForecast(location: Geocode) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=${units}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch weather forecast data for url: ' + url);
  }

  const data: WeatherForecast = await response.json();
  return data;
}

//not being used - currently logic is in WeatherHome
// export const getWeatherList = async (
//   locationsList: Geocode[],
//   dispatch: AppDispatch
// ) => {
//   let weatherData: Weather[] = [];
//   for (let location of locationsList) {
//     //console.log('Fetching weather for ' + location.name);
//     fetchWeatherData(location)
//       .then((value: Weather) => {
//         weatherData.push(value); //this is working
//         // console.log(
//         //   'weatherData:' + weatherData.map((weather) => weather.name)
//         // );
//       })
//       .catch((error: any) => {
//         dispatch(
//           uiActions.showNotification({
//             status: 'error',
//             title: 'Error Fetching Weather',
//             message: error.message,
//           })
//         );
//       });
//   }
//   return weatherData;
// };
