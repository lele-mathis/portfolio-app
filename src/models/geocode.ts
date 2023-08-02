//type returned by open-meteo geocoding API
type Geocode = {
  id: string;
  name: string;
  latitude: string;
  elevation: string;
  longitude: string;
  admin1: string; //this is the state for US cities
  country: string;
};

export default Geocode;
