import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';
import { Button, Typography, Card, Link as MuiLink } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

import Geocode from '../models/geocode';
import Forecast from '../components/weatherForecast/Forecast';

let init = true;

function LocationForecastPage() {
  const locationsList = useAppSelector((state) => state.location.locations);
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);
  const username = useAppSelector((state) => state.profile.username);
  const m = isNarrow ? 1 : 2;
  let { locId } = useParams();

  let location: Geocode | undefined = locationsList.find(
    (loc) => loc.id == locId
  );

  if (location) {
    document.title = `${location.name} Forecast | Weather App | Lele Mathis Portfolio`;
  } else {
    document.title = 'Location Forecast | Weather App | Lele Mathis Portfolio';
  }

  //if after reevaluating once, the location still cannot be found, display an error page
  if (!location && (!init || username === '')) {
    return (
      <>
        <Button size='large' component={Link} to='..'>
          <IoIosArrowBack className='icon' /> Back
        </Button>
        <Card variant='outlined' sx={{ m: m, p: m, borderColor: '#cb3030' }}>
          <Typography component='h2' variant='h4' sx={{ color: '#cb3030' }}>
            Unexpected Error!
          </Typography>
          <Typography component='h3' variant='h6' sx={{ color: '#cb3030' }}>
            Location with ID {locId} cannot be found.
          </Typography>
          <p style={{ marginBottom: 0 }}>
            Try entering a new location on the{' '}
            <MuiLink component={Link} to='/weather'>
              Weather Homepage
            </MuiLink>
            {username === '' ? ' or logging in.' : '.'}
          </p>
        </Card>
      </>
    );
  }

  init = false;

  return (
    <>
      <Button size='large' component={Link} to='..'>
        <IoIosArrowBack className='icon' /> Back
      </Button>
      {location ? (
        <Forecast location={location} />
      ) : (
        <Card variant='outlined' sx={{ m: m }}>
          <Typography component='h2' variant='h5' sx={{ m: m }}>
            Location loading...
          </Typography>
        </Card>
      )}
    </>
  );
}

export default LocationForecastPage;

//add a loader to get info about this locatioon
