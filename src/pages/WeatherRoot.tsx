import { Outlet, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/typedHooks';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Notification from '../ui/Notification';
import { uiActions } from '../store/store';
import ProfileManager from '../components/ProfileManager';

function WeatherRootLayout() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.ui.notification);
  const isMobile = useAppSelector((state) => state.ui.isMobile);

  const notificationCloseHandler = () => {
    dispatch(uiActions.closeNotification());
  };

  const pageContent = (
    <>
      <Link to='/weather' style={{ textDecoration: 'none' }}>
        <Typography component='h1' variant='h4' color='primary'>
          Weather App
        </Typography>
      </Link>
      {notification.status !== '' && (
        <Notification
          notification={notification}
          onClose={notificationCloseHandler}
        />
      )}
      <Outlet />
      <ProfileManager />
      <footer>
        <Typography
          component='p'
          variant='caption'
          sx={{ textAlign: 'center' }}
        >
          Weather data from{' '}
          <Link to='https://openweathermap.org/'>OpenWeather</Link>, geocoding
          using{' '}
          <Link to='https://open-meteo.com/en/docs/geocoding-api'>
            Open-Meteo
          </Link>
        </Typography>
      </footer>
    </>
  );

  if (isMobile) {
    return <Box sx={{ m: 1 }}>{pageContent}</Box>;
  } else {
    return <Paper sx={{ m: 2, p: 2 }}>{pageContent}</Paper>;
  }
}

export default WeatherRootLayout;
