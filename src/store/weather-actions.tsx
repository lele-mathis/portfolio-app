import Geocode from '../models/geocode';
import Weather from '../models/weather';
import { uiActions } from './store';
//import { useAppDispatch } from '../hooks';
import { AppDispatch } from './store';

const apiKey = 'eab41386ed58a65dbb29ff0e92e2757a'; //from my Open Weather account
const units = 'imperial'; //for Weather

export async function geocodeCity(city: string, state = '', country = '') {
  let stateCode = '';
  let countryCode = '';

  if (country !== '') {
    countryCode = ',' + country; //find country code from country name
  }

  if (state !== '') {
    stateCode = ',' + state; //find state code from state name
    countryCode = ',US';
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch geocode data for url: ' + url);
  }
  const data = await response.json();
  const {
    results: [geocodeData],
  }: { results: Geocode[] } = data;

  if (geocodeData === undefined) {
    throw new Error(
      'Could not find location: ' + city + ', ' + state + ', ' + country
    );
  }
  //console.log('lat:' + geocodeData.latitude + ' lon:' + geocodeData.longitude);
  return geocodeData;
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

//later, make this into a Thunk - will need to dispatch error messages from here to show with uiActions
export async function fetchWeatherData(location: Geocode) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=${units}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch weather data for url: ' + url);
  }

  const data: Weather = await response.json();
  return data; //add country and optionally state info to this object!
}

//export async function geocodeZip(zip: string | number, country = '') {
//   let countryCode = '';
//   if (country !== '') {
//     countryCode = ''; //find country code from country name
//   } //fetch geocode data using ZIP code

//   const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${apiKey}`;
//   try {
//     const weatherData = await fetch(url);

//     //save in the store
//   } catch (error) {
//     // dispatch(
//     //   uiActions.showNotification({
//     //     status: 'error',
//     //     title: 'Error!',
//     //     message: 'Fetching cart data failed!',
//     //   })
//     // );
//   }
// }
