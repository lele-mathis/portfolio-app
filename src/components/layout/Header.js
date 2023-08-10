import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../hooks/typedHooks';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Header() {
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);
  const PAGES = [
    { name: 'Home', path: '/' },
    { name: 'Weather App', path: '/weather' },
    {
      name: 'Data Analytics Projects',
      path: '/data',
    },
  ];

  let navContent = PAGES.map((page) => (
    <Box sx={{ mx: 1, flexShrink: 1 }} key={page.path}>
      <Button
        component={NavLink}
        to={page.path}
        size={isNarrow ? 'medium' : 'large'}
        style={({ isActive }) =>
          isActive
            ? { color: '#ec6e4c', fontWeight: 'bold', textAlign: 'center' }
            : { color: '#FFF', fontWeight: 'bold', textAlign: 'center' }
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
              variant={isNarrow ? 'h4' : 'h3'}
              color='#dcfcfc'
              style={{
                fontFamily: 'Brush Script MT',
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
