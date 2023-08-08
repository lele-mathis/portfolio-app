import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';
import { Button, Alert, AlertTitle } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

import Geocode from '../models/geocode';
import Forecast from '../components/Forecast';

function LocationForecastPage() {
  const locationList = useAppSelector((state) => state.location.locations);
  let { locId } = useParams();

  //move this into a loader?
  const location: Geocode | undefined = locationList.find(
    (loc) => loc.id == locId
  );

  if (location === undefined) {
    //redirect to error page
    return (
      <>
        <Alert severity={'error'} sx={{ m: 2 }}>
          <AlertTitle>Could not find location with ID {locId}</AlertTitle>
        </Alert>
        <Button component={Link} to='..'>
          <IoIosArrowBack className='icon' /> Back
        </Button>
      </>
    );
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
