# Lele Mathis Portfolio

Welcome to the repository for my portfolio website! This app was made using React and was written in JavaScript/TypeScript. It uses [React Router](https://reactrouter.com/en/main), [Redux toolkit](https://redux-toolkit.js.org/), [Material UI](https://mui.com/), and [Plotly.js](https://plotly.com/javascript/react/). The [website](https://lele-mathis-portfolio.web.app/) is hosted through [Firebase Hosting](https://firebase.google.com/products/hosting).
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The lion's share of the code is my weather app project:

## Weather App

On the Weather page, the user can enter locations using the city or postal code and optionally the state/region and country. The app then retrieves geocode information from the [Open-Meteo geocoding API](https://open-meteo.com/en/docs/geocoding-api) and uses the latitude and longitude to fetch current weather data from the [OpenWeather current API](https://openweathermap.org/current) and displays it in a [MUI DataGrid](https://mui.com/x/react-data-grid/). Clicking on one of the locations shows the user weather forecast data for every 3 hours over the next 5 days, which retrieved from the [OpenWeather forecast API](https://openweathermap.org/forecast5).

The user has the option of entering a username to create a profile to save the locations they input, so they will be retrieved when they log in again. The usernames and location data are saved to a [Firebase realtime database](https://firebase.google.com/products/realtime-database). Note: This database is not secured using authentication, so do not input any sensitive/identifying information as your username.

Please try it out and let me know if you run into any issues, find any bugs, or have any other feedback! I am eager to learn and improve.

### Planned improvements:

- Add lazy loading to improve performance
- Add average daily temperature to five-day forecast summary
- Add ability to close forecast plots on mobile

### Known bugs:

- Data on plots doesn't show up on some mobile devices
