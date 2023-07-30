import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function HomePage() {
  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <Typography component='h1' variant='h3' color='primary'>
        Welcome to my website!
      </Typography>
      <Typography variant='body1'>
        I'm Lele Mathis, a frontend software developer and data analyst. This is
        my portfolio website. Feel free to look around!
      </Typography>
    </Paper>
  );
}

export default HomePage;
