# Lele Mathis Portfolio
Welcome to the repository for my portfolio website! This app was made using React and was written in JavaScript/TypeScript. It uses React Router, Redux toolkit, Material UI, and Plotly. The website https://lele-mathis-portfolio.web.app/ is hosted through Firebase Hosting.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The lion's share of the code is my weather app project:

## Weather App

On the Weather page, the user can enter locations using the city or postal code and optionally the state/region and country. The app then retrieves geocode information from the Open-Meteo geocoding API and uses the latitude and longitude to fetch current weather data from the OpenWeather API and displays it in a MUI DataGrid. Clicking on one of the locations shows the user weather forecast data for the next 5 days, which is also retrieved from OpenWeather.

The user has the option of entering a username to create a profile to save the locations they input, so they will be retrieved when they log in again. The usernames and location data are saved to a Firebase realtime database. Note: This database is not secured using authentication, so do not input any sensitive/identifying information as your username.

Please try it out and let me know if you run into any issues, find any bugs, or have any other feedback! I am eager to learn and improve.

