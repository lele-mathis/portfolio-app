import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Header() {
  const PAGES = [
    { name: 'HOME', path: '/' },
    { name: 'DEMO REACT APP', path: '/weather' },
    { name: 'DATA ANALYTICS PROJECTS', path: '/data' },
  ];

  const navContent = PAGES.map((page) => (
    <Box sx={{ mx: 2 }}>
      <NavLink
        to={page.path}
        style={({ isActive }) =>
          isActive
            ? { color: '#F59623', textDecoration: 'underline' }
            : { color: '#F5C062', textDecoration: 'none' }
        }
      >
        {page.name}
      </NavLink>
    </Box>
  ));
  return (
    <header>
      <AppBar color='primary' position='static'>
        <Container maxWidth='xl'>
          <Toolbar component='nav' id='toolbar' disableGutters>
            <Typography variant='h4' style={{ flexGrow: 1 }}>
              Lele Mathis
            </Typography>
            {navContent}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}

export default Header;
