import Geocode from '../models/geocode';

const apiKey = 'eab41386ed58a65dbb29ff0e92e2757a';
const limit = 1;
//const weather_api = ('https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}');

export async function geocodeCity(city: string, state = '', country = '') {
  let stateCode = '';
  let countryCode = '';
  if (state !== '') {
    stateCode = ','; //find state code from state name
  }
  if (country !== '') {
    countryCode = ','; //find country code from country name
  }
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}${stateCode}${countryCode}&limit=${limit}&appid=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not fetch geocode data for url:' + url);
  }
  const data = await response.json();
  const geocodeData: Geocode = data[0];
  console.log('lat:' + geocodeData.lat + ' lon:' + geocodeData.lon);
  return geocodeData;
}

export async function geocodeZip(zip: string | number, country = '') {
  let countryCode = '';
  if (country !== '') {
    countryCode = ''; //find country code from country name
  } //fetch geocode data using ZIP code

  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${countryCode}&appid=${apiKey}`;
  try {
    const weatherData = await fetch(url);

    //save in the store
  } catch (error) {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'error',
    //     title: 'Error!',
    //     message: 'Fetching cart data failed!',
    //   })
    // );
  }
}

// export function fetchWeatherData(url: string) {
//   return async (dispatch: any) => {
//     const fetchData = async () => {
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error('Could not fetch weather data!');
//       }

//       const data = await response.json();

//       return data;
//     };

//     try {
//       const weatherData = await fetchData();
//       //save in the store
//     } catch (error) {
//       // dispatch(
//       //   uiActions.showNotification({
//       //     status: 'error',
//       //     title: 'Error!',
//       //     message: 'Fetching cart data failed!',
//       //   })
//       // );
//     }
//   };
// }
