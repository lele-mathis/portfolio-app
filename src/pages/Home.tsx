import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function HomePage() {
  const navigate = useNavigate();

  const clickWeatherHandler = () => {
    navigate('weather');
  };

  const clickDataHandler = () => {
    navigate('data');
  };

  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <Typography component='h1' variant='h3' color='primary'>
        Welcome to my website!
      </Typography>
      <Typography variant='body1' sx={{ m: 2 }}>
        I'm Lele Mathis, a frontend software developer and data analyst. This is
        my portfolio website.
      </Typography>
      <Grid container sx={{ m: 2 }}>
        <Grid item sx={{ m: 2 }}>
          <Button
            onClick={clickWeatherHandler}
            variant='outlined'
            size='large'
            style={{
              textTransform: 'none',
            }}
            sx={{ p: 4 }}
          >
            <Typography>
              Check out my weather app built using ReactJS with redux and
              TypeScript
            </Typography>
          </Button>
        </Grid>
        <Grid item sx={{ m: 2 }}>
          <Button
            onClick={clickDataHandler}
            variant='outlined'
            size='large'
            style={{
              textTransform: 'none',
            }}
            sx={{ p: 4 }}
          >
            <Typography>
              Check out my data analytics projects using SQL, Excel, and Tableau
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default HomePage;
