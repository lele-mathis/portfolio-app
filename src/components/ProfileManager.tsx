import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

import CreateProfile from './CreateProfile';
import CurrentUser from './CurrentUser';
import LoginForm from './LoginForm';
import useSendData from '../hooks/useSendData';
import { uiActions } from '../store/store';
import { profileActions } from '../store/profile-slice';
import { firebaseUrl } from '../store/info';

function ProfileManager() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const locationsList = useAppSelector((state) => state.location.locations);
  const { isLoading, sendData: saveData } = useSendData();

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

  return (
    <Card sx={{ m: 2, p: 2 }} variant='outlined'>
      {user === '' ? (
        <Grid container direction='column'>
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
        <p style={{ textAlign: 'center' }}>Saving data to server...</p>
      )}
    </Card>
  );
}

export default ProfileManager;
