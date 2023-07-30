import { useAppSelector, useAppDispatch } from '../hooks';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { profileActions, weatherActions, uiActions } from '../store/store';
import { Typography } from '@mui/material';

function CurrentUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.username);

  const logOutHandler = () => {
    dispatch(uiActions.closeNotification());
    dispatch(weatherActions.clearLocations());
    dispatch(profileActions.logOut());
  };

  return (
    <Card variant='outlined' sx={{ m: 2, px: 2, py: 1, textAlign: 'center' }}>
      Current user is <span style={{ fontWeight: 'bold' }}>{user}</span>
      <Button
        onClick={logOutHandler}
        variant='outlined'
        color='secondary'
        sx={{ mx: 1 }}
      >
        Log out
      </Button>
    </Card>
  );
}

export default CurrentUser;
