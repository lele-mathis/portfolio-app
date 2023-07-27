import { NavLink } from 'react-router-dom';
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
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            to='/weather'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Weather App
          </NavLink>
          <NavLink
            to='/data'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
          >
            Data Projects
          </NavLink>
        </Toolbar>
      </nav>
    </header>
  );
}

export default Header;
