import { useEffect, useState, lazy, Suspense } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/typedHooks';
import Card from '@mui/material/Card';

import Geocode from '../models/geocode';
import Weather from '../models/weather';
import WeatherLoc from '../models/weatherLoc';
import NewLocation from '../components/weatherHome/NewLocationForm';

import { fetchCurrentWeather } from '../store/weather-actions';
import { uiActions } from '../store/ui-slice';
import useSendData from '../hooks/useSendData';
import { firebaseUrl } from '../store/info';

const WeatherGrid = lazy(() => import('../components/weatherHome/WeatherGrid'));

const initialState: WeatherLoc[] = [];

function WeatherHomePage() {
  document.title = 'Weather App | Lele Mathis Portfolio';
  const { isLoading: locationsSaving, sendData: saveLocations } = useSendData();
  const dispatch = useAppDispatch();
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.location.locations
  );

  const username = useAppSelector((state) => state.profile.username);
  const [weatherList, setWeatherList] = useState(initialState);
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);

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

  const m = isNarrow ? 1 : 2;
  let pageContent = (
    <Card variant='outlined' sx={{ m: m }}>
      <p style={{ textAlign: 'center' }}>
        No locations to display - enter one above!
      </p>
    </Card>
  );

  if (locationsList.length !== 0) {
    pageContent = (
      <Suspense fallback={<p>Loading weather grid...</p>}>
        <WeatherGrid weatherList={weatherList} />
      </Suspense>
    );
  }

  return (
    <>
      <NewLocation />
      {pageContent}
      {locationsSaving && <p>Saving locations...</p>}
    </>
  );
}

export default WeatherHomePage;
