type WeatherPoint = {
  dt: number; //time of data forecasted, unix, UTC
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [{ id: string; main: string; description: string; icon: string }];
  clouds: { all: string };
  wind: { speed: number; deg: number; gust: number };
  visibility: number; //Average visibility in meters
  pop: number; //probability of precipitation (between 0 and 1)
  rain: { '3h': number } | undefined;
  snow: { '3h': number } | undefined;
  sys: { pod: string }; //part of day, n - night, d - day
  dt_txt: Date;
};

export default WeatherPoint;
