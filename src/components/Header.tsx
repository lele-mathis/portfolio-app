import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
              HOME
            </Link>
            <Link component={NavLink} color='secondary' to='/weather'>
              REACT DEMO APP
            </Link>
            <Link component={NavLink} color='secondary' to='/data'>
              DATA ANALYTICS PROJECTS
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}

export default Header;
