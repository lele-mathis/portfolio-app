class Geocode {
  name: string;
  local_names: Object;
  lat: string;
  lon: string;
  country: string;
  state: string;
  constructor(
    cityName: string,
    cityLocalNames: Object,
    cityLat: string,
    cityLon: string,
    country: string,
    state: string
  ) {
    this.name = cityName;
    this.local_names = cityLocalNames;
    this.lat = cityLat;
    this.lon = cityLon;
    this.country = country;
    this.state = state;
  }
}

export default Geocode;
