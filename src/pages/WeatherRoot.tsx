import { Outlet } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function WeatherRootLayout() {
  return (
    <Paper sx={{ m: 2, p: 2 }}>
      {' '}
      <Typography component='h1' variant='h4' color='primary'>
        Weather App
      </Typography>
      <Outlet />
    </Paper>
  );
}

export default WeatherRootLayout;
