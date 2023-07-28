import { NavLink } from 'react-router-dom';
//import MuiAppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';

function Header() {
  return (
    <header>
      <nav>
        <Toolbar
          component='nav'
          variant='dense'
          sx={{ justifyContent: 'space-around', overflowX: 'auto' }}
        >
          <Link component={NavLink} to='/'>
            Home
          </Link>
          <Link component={NavLink} to='/weather'>
            Weather App
          </Link>
          <Link component={NavLink} to='/data'>
            Data Projects
          </Link>
        </Toolbar>
      </nav>
    </header>
  );
}

export default Header;
