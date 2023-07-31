import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import Card from '@mui/material/Card';

import CreateProfile from './CreateProfile';
import CurrentUser from './CurrentUser';
import LoginForm from './LoginForm';
import useSendData from '../hooks/useSendData';
import { uiActions } from '../store/store';
import { profileActions } from '../store/profile-slice';

function ProfileManager() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const locationsList = useAppSelector((state) => state.location.locations);
  const { isLoading, sendData: saveData } = useSendData();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://react-http-3724a-default-rtdb.firebaseio.com/weather/users.json',
          {
            method: 'GET',
          }
        );

        if (!response.ok) {
          throw new Error('Request failed! Status: ' + response.status);
        }

        const data = await response.json();
        const { users: loadedUsers } = data;
        dispatch(profileActions.setUsersList(loadedUsers));
      } catch (err: any) {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error Fetching Users',
            message: 'Could not find users',
          })
        );
      }
    };
    fetchUsers();
  }, []);

  //send usersList to backend whenever it changes - not working properly, running before new user is added
  useEffect(() => {
    if (usersList.length !== 0) {
      saveData({
        url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/users.json`,
        method: 'PUT',
        body: { users: usersList },
      });
    }
  }, [usersList, saveData, dispatch]);
  const user = useAppSelector((state) => state.profile.username);

  return (
    <Card variant='outlined' sx={{ m: 2, p: 2 }}>
      {user === '' ? (
        <>
          <LoginForm />
          {locationsList.length !== 0 && <CreateProfile />}
        </>
      ) : (
        <CurrentUser />
      )}
      {isLoading && <p>Saving data to server...</p>}
    </Card>
  );
}

export default ProfileManager;
