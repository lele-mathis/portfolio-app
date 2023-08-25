import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';

import { useTheme, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function HomePage() {
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);
  const navigate = useNavigate();
  const theme = useTheme();

  document.title = 'Home | Lele Mathis Portfolio';

  const m = isNarrow ? 1 : 2;

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
      <Typography variant='body1' sx={{ m: m }}>
        Hi, I'm Lele Mathis, a frontend software developer and data analyst with
        a background in Physics and Materials Science research. Please take a
        look around!
      </Typography>
      <Grid
        container
        direction={isNarrow ? 'column' : 'row'}
        display='flex'
        justifyContent='center'
        alignItems='stretch'
        sx={{ my: 2 }}
      >
        <Grid item xs={5}>
          <Card
            className='homeCard'
            onClick={clickWeatherHandler}
            sx={{ m: m, p: m, height: '100%' }}
          >
            <Typography
              component='h2'
              variant='h5'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.secondary.dark,
              }}
            >
              Check out my weather app
            </Typography>

            <Typography variant='subtitle1'>
              made using react.js with redux and TypeScript
            </Typography>
            <ul>
              <li>
                Learn about current and forecasted weather around the world
              </li>
              <li>
                Add locations you're interested in and save them in a profile to
                look at later!
              </li>
            </ul>
          </Card>
        </Grid>
        <Grid item xs={5}>
          <Card
            onClick={clickDataHandler}
            className='homeCard'
            sx={{ m: m, p: m, height: '100%' }}
          >
            <Typography
              component='h2'
              variant='h5'
              sx={{
                fontWeight: 'bold',
                color: theme.palette.secondary.dark,
              }}
            >
              Check out my data analytics projects
            </Typography>
            <Typography variant='subtitle1'>
              made using SQL, Excel, and Tableau
            </Typography>
            <Typography variant='body1'>
              <ul>
                <li>
                  Learn about tornadoes, hydrogen fueling stations, and more!
                </li>
              </ul>
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  if (isNarrow) {
    return <Box sx={{ m: 1 }}>{pageContent}</Box>;
  } else {
    return <Box sx={{ m: 2, p: 2 }}>{pageContent}</Box>;
  }
}

export default HomePage;
