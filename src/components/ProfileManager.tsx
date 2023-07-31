import { useAppSelector } from '../hooks';
import Card from '@mui/material/Card';

import CreateProfile from './CreateProfile';
import CurrentUser from './CurrentUser';
import LoginForm from './LoginForm';


function ProfileManager(){
    const user=useAppSelector((state)=>state.profile.username);

    return <Card variant='outlined' sx={{m:2,p:2}}>
        {user==='' ? <><LoginForm /><CreateProfile /></>:<CurrentUser />}
    </Card>
}

export default ProfileManager;