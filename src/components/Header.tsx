import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
//import Typography from '@mui/material/Typography';

function Header() {
  return (
    <header>
      <AppBar color='primary'>
        <Container maxWidth='xl'>
          <Toolbar
            component='nav'
            id='toolbar'
            disableGutters
            sx={{ justifyContent: 'space-around', overflowX: 'auto' }}
          >
            <NavLink
              to='/'
              style={({ isActive }) =>
                isActive
                  ? { color: '#F59623' }
                  : { textDecoration: 'none', color: '#F5C062' }
              }
            >
              HOME
            </NavLink>
            <NavLink
              to='/weather'
              style={({ isActive }) =>
                isActive
                  ? { color: '#F59623' }
                  : { textDecoration: 'none', color: '#F5C062' }
              }
            >
              REACT DEMO APP
            </NavLink>
            <NavLink
              to='/data'
              style={({ isActive }) =>
                isActive
                  ? { color: '#F59623' }
                  : { textDecoration: 'none', color: '#F5C062' }
              }
            >
              DATA ANALYTICS PROJECTS
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}

export default Header;
