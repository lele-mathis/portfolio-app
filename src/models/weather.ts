class Weather {
  coord: Object;
  weather: Object[];
  main: Object;
  visibility: number;
  wind: Object;
  name: string;

  constructor(
    coord: Object,
    weather: Object[],
    main: Object,
    visibility: number,
    wind: Object,
    cityName: string
  ) {
    this.coord = coord;
    this.weather = weather;
    this.main = main;
    this.visibility = visibility;
    this.wind = wind;
    this.name = cityName;
  }
}

export default Weather;
