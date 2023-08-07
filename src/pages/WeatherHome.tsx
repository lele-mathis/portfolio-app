import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import Geocode from '../models/geocode';
import Weather from '../models/weather';
import WeatherLoc from '../models/weatherLoc';
import NewLocation from '../components/NewLocationForm';
import WeatherGrid from '../components/WeatherGrid';
import { fetchCurrentWeather } from '../store/weather-actions';
import { uiActions } from '../store/store';
import ProfileManager from '../components/ProfileManager';
import useSendData from '../hooks/useSendData';
import { firebaseUrl } from '../store/info';

const initialState: WeatherLoc[] = [];

function WeatherHomePage() {
  const { isLoading: locationsSaving, sendData: saveLocations } = useSendData();
  const dispatch = useAppDispatch();
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.location.locations
  );

  const username = useAppSelector((state) => state.profile.username);
  const [weatherList, setWeatherList] = useState(initialState);

  //remake the weather list and send the locationsList to the backend when the locationsList changes
  useEffect(() => {
    setWeatherList([]); //reset the list before refreshing it (this makes the DataGrid flash, maybe bad?)
    //console.log(locationsList.map((loc) => loc.name + ', ' + loc.admin1));
    for (let location of locationsList) {
      fetchCurrentWeather(location)
        .then((value: Weather) => {
          const newValue: WeatherLoc = {
            ...value,
            locationId: location.id,
            locationName: location.name,
            state: location.admin1,
            country: location.country,
          };
          setWeatherList((list) => list.concat(newValue));
        })
        .catch((error: any) => {
          dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error Fetching Weather',
              message: error.message,
            })
          );
        });
    }
    if (username !== '') {
      saveLocations({
        url: `${firebaseUrl}/weather/${username}.json`,
        method: 'PUT',
        body: { locations: locationsList },
      });
    }
  }, [locationsList, saveLocations, username, dispatch]); //fetch the weather every time the list of locations changes

  let pageContent = (
    <p style={{ textAlign: 'center' }}>
      No locations to display - enter one above!
    </p>
  );

  if (locationsList.length !== 0) {
    pageContent = <WeatherGrid weatherList={weatherList} />;
  }

  return (
    <>
      <NewLocation />
      {pageContent}
      {locationsSaving && <p>Saving locations...</p>}
      <ProfileManager />
    </>
  );
}

export default WeatherHomePage;
