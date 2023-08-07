import { NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Header() {
  const PAGES = [
    { name: 'Home', path: '/' },
    { name: 'Weather App', path: '/weather' },
    { name: 'Data Analytics Projects', path: '/data' },
  ];

  const navContent = PAGES.map((page) => (
    <Box sx={{ mx: 1, flexShrink: 1 }} key={page.path}>
      <Button
        component={NavLink}
        to={page.path}
        size='large'
        style={({ isActive }) =>
          isActive
            ? { color: '#ec6e4c', fontWeight: 'bold' }
            : { color: '#FFF', fontWeight: 'bold' }
        }
      >
        {page.name}
      </Button>
    </Box>
  ));
  return (
    <header>
      <AppBar color='primary' position='static'>
        <Container maxWidth='xl'>
          <Toolbar component='nav' id='toolbar' disableGutters>
            <Typography
              variant='h3'
              color='#dcfcfc'
              style={{
                fontFamily: 'Brush Script MT',
                textShadow: 2,
                textDecoration: 'none',
                flexGrow: 1,
                flexShrink: 1,
              }}
              component={NavLink}
              to='/'
            >
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
