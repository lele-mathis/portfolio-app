import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/typedHooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import CreateProfile from './CreateProfile';
import CurrentUser from './CurrentUser';
import LoginForm from './LoginForm';
import useSendData from '../../hooks/useSendData';
import { uiActions } from '../../store/store';
import { profileActions } from '../../store/profile-slice';
import { firebaseUrl } from '../../store/info';

function ProfileManager() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  //const locationsList = useAppSelector((state) => state.location.locations);
  const isMobile = useAppSelector((state) => state.ui.isNarrow);
  const { isLoading, sendData: saveData } = useSendData();

  //get list of users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(firebaseUrl + '/weather/users.json', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Request failed! Status: ' + response.status);
        }

        const data = await response.json();
        const { users: loadedUsers } = data;
        dispatch(profileActions.setUsersList(loadedUsers));
      } catch (err: any) {
        dispatch(
          uiActions.showNotification({
            status: 'warning',
            title: 'Issue Fetching Users',
            message: 'Could not find users',
          })
        );
      }
    };
    fetchUsers();
  }, [dispatch]);

  //send usersList to backend whenever it changes
  useEffect(() => {
    if (usersList.length !== 0) {
      saveData({
        url: firebaseUrl + '/weather/users.json',
        method: 'PUT',
        body: { users: usersList },
      });
    }
  }, [usersList, saveData, dispatch]);
  const user = useAppSelector((state) => state.profile.username);

  const m = isMobile ? 1 : 2;
  return (
    <Card
      sx={{
        m: m,
        p: m,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      variant='outlined'
    >
      {user === '' ? (
        <Grid
          container
          direction={isMobile ? 'column' : 'row'}
          justifyContent='space-around'
        >
          <Grid item xs={5}>
            <CreateProfile />
          </Grid>
          <Grid item xs={5}>
            <LoginForm />
          </Grid>
        </Grid>
      ) : (
        <CurrentUser />
      )}

      {isLoading && (
        <p style={{ textAlign: 'center' }}>Saving users to server...</p>
      )}
    </Card>
  );
}

export default ProfileManager;
