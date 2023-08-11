import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/typedHooks';
import { Button } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

import Geocode from '../models/geocode';
import Forecast from '../components/weatherForecast/Forecast';
import { uiActions } from '../store/store';

function LocationForecastPage() {
  const locationList = useAppSelector((state) => state.location.locations);
  const dispatch = useAppDispatch();
  let { locId } = useParams();

  //move this into a loader?
  const location: Geocode | undefined = locationList.find(
    (loc) => loc.id == locId
  );

  if (location === undefined) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error fetching forecast',
        message: 'Could not find location with ID ' + locId,
      })
    );
    return (
      <Button size='large' component={Link} to='..'>
        <IoIosArrowBack className='icon' /> Back
      </Button>
    );
  }

  document.title = `${location.name} Forecast | Weather App | Lele Mathis Portfolio`;

  return (
    <>
      <Button size='large' component={Link} to='..'>
        <IoIosArrowBack className='icon' /> Back
      </Button>
      <Forecast location={location} />
    </>
  );
}

export default LocationForecastPage;

//add a loader to get info about this locatioon
