import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';

import Card from '@mui/material/Card';

import useHttp from '../hooks/use-http';
import CreateProfile from './CreateProfile';
import CurrentUser from './CurrentUser';
import LoginForm from './LoginForm';

function ProfileManager() {
  const dispatch = useAppDispatch();
  const usersList = useAppSelector((state) => state.profile.usernamesList);
  const { isLoading, error, sendRequest: saveData } = useHttp();
  useEffect(() => {
    console.log('Error: ' + error);
  }, [error]);
  //send usersList to backend whenever it changes - not working properly, running before new user is added
  useEffect(() => {
    if (usersList.length !== 0) {
      saveData(
        {
          url: `https://react-http-3724a-default-rtdb.firebaseio.com/weather/users.json`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ users: usersList }),
        },
        () => {
          console.log('usersList ' + usersList + ' saved to Firebase');
        }
      );
    }
  }, [usersList, saveData]);
  const user = useAppSelector((state) => state.profile.username);

  return (
    <Card variant='outlined' sx={{ m: 2, p: 2 }}>
      {user === '' ? (
        <>
          <LoginForm />
          <CreateProfile />
        </>
      ) : (
        <CurrentUser />
      )}
    </Card>
  );
}

export default ProfileManager;
