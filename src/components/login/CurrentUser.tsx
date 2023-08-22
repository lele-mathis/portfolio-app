import { useAppSelector, useAppDispatch } from '../../hooks/typedHooks';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { uiActions } from '../../store/ui-slice';
import { locationActions } from '../../store/location-slice';
import { profileActions } from '../../store/profile-slice';

//import { Typography } from '@mui/material';

function CurrentUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.username);
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(locationActions.clearLocations());
    dispatch(uiActions.closeNotification());
    dispatch(profileActions.logOut());
    localStorage.removeItem('profile'); //remove username from local storage
    navigate('/weather'); //go back to weather home
  };

  return (
    <Box sx={{ px: 2, py: 1, textAlign: 'center' }}>
      Current user is <span style={{ fontWeight: 'bold' }}>{user}</span>
      <Button
        onClick={logOutHandler}
        variant='contained'
        color='secondary'
        sx={{ mx: 1 }}
      >
        Log out
      </Button>
    </Box>
  );
}

export default CurrentUser;
