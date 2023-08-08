import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function HomePage() {
  const navigate = useNavigate();
  const isMobile = useAppSelector((state) => state.ui.isMobile);

  const clickWeatherHandler = () => {
    navigate('weather');
  };

  const clickDataHandler = () => {
    navigate('data');
  };

  const pageContent = (
    <>
      <Typography component='h1' variant='h4' color='primary'>
        Portfolio Website Home
      </Typography>
      <Typography variant='body1' sx={{ m: 2 }}>
        Hi, I'm Lele Mathis, a frontend software developer and data analyst.
      </Typography>
      <Grid container>
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
    </>
  );
  if (isMobile) {
    return <Box sx={{ m: 1 }}>{pageContent}</Box>;
  } else {
    return <Paper sx={{ m: 2, p: 2 }}>{pageContent}</Paper>;
  }
}

export default HomePage;
