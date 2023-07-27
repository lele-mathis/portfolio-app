class Geocode {
  name: string;
  lat: string;
  lon: string;
  country: string;
  state: string;
  constructor(
    cityName: string,
    cityLat: string,
    cityLon: string,
    country: string,
    state: string
  ) {
    this.name = cityName;
    this.lat = cityLat;
    this.lon = cityLon;
    this.country = country;
    this.state = state;
  }
}

export default Geocode;
