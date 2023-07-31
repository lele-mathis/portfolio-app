import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function HomePage() {
  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <Typography component='h1' variant='h3' color='primary'>
        Welcome to my website!
      </Typography>
      <Typography variant='body1'>
        I'm Lele Mathis, a frontend software developer and data analyst. This is
        my portfolio website. 
      </Typography>
      <ul>
        <li><Link component={NavLink} to='weather'>Check out my weather app built using ReactJS with redux and TypeScript</Link></li>
        <li><Link component={NavLink} to='data'>Check out my data analytics projects using SQL, Excel, and Tableau</Link></li>
      </ul>
    </Paper>
  );
}

export default HomePage;
