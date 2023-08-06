import { Outlet } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Notification from '../ui/Notification';
import { uiActions } from '../store/store';

function WeatherRootLayout() {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.ui.notification);
  const notificationCloseHandler = () => {
    dispatch(uiActions.closeNotification());
  };
  return (
    <Paper sx={{ m: 2, p: 2 }}>
      {' '}
      <Typography component='h1' variant='h4' color='primary'>
        Weather App
      </Typography>
      {notification.status !== '' && (
        <Notification
          notification={notification}
          onClose={notificationCloseHandler}
        />
      )}
      <Outlet />
    </Paper>
  );
}

export default WeatherRootLayout;
