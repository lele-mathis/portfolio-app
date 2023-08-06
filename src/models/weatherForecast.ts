import WeatherPoint from './weatherPoint';

type WeatherForecast = {
  cnt: number; //number of timestamps
  list: WeatherPoint[];
  city: {
    id: string;
    name: string;
    coord: { lat: string; lon: string };
    country: string;
    population: number;
    timezone: string;
    sunrise: string;
    sunset: string;
  };
};

export default WeatherForecast;
