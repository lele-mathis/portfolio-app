import { useParams, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/typedHooks';
import { Button, Alert, AlertTitle } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

import Geocode from '../models/geocode';
import Forecast from '../components/Forecast';
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
    return <></>;
  }

  return (
    <>
      <Forecast location={location} />
      <Button component={Link} to='..'>
        <IoIosArrowBack className='icon' /> Back To Weather Home
      </Button>
    </>
  );
}

export default LocationForecastPage;

//add a loader to get info about this locatioon
