class Weather {
  coord: Object;
  weather: Object[];

  constructor(coord: Object, weather: Object[]) {
    this.coord = coord;
    this.weather = weather;
  }
}

export default Weather;
