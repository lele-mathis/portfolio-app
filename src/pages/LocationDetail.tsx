import { useParams, Link } from 'react-router-dom';

import { Button, Typography, Card } from '@mui/material';
import { IoIosArrowBack } from 'react-icons/io';

function LocationDetailPage() {
  let { locId } = useParams();
  return (
    <>
      <Card variant='outlined' sx={{ m: 2, p: 2 }}>
        <Typography component='h2' variant='h5'>
          Location Details
        </Typography>
        <p>Location ID: {locId}</p>
      </Card>
      <Button component={Link} to='..'>
        <IoIosArrowBack className='icon' /> Back
      </Button>
    </>
  );
}

export default LocationDetailPage;

//add a loader to get info about this locatioon
