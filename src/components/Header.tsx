import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
//import Typography from '@mui/material/Typography';

function Header() {
  return (
    <header>
      <AppBar color='primary'>
        <Container maxWidth='xl'>
          <Toolbar
            component='nav'
            disableGutters
            sx={{ justifyContent: 'space-around', overflowX: 'auto' }}
          >
            <Link component={NavLink} color='secondary' to='/'>
              Home
            </Link>
            <Link component={NavLink} color='secondary' to='/weather'>
              Weather App
            </Link>
            <Link component={NavLink} color='secondary' to='/data'>
              Data Projects
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}

export default Header;
