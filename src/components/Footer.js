import { Link, IconButton } from '@mui/material';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', maxWidth: 'xl', margin: 2 }}>
      <p>
        © 2023 Lele Mathis{' '}
        <IconButton
          component={Link}
          to='https://www.linkedin.com/in/lele-mathis/'
        >
          <FaLinkedin className='icon' />
        </IconButton>
        <IconButton component={Link} to='https://github.com/lele-mathis'>
          <FaGithub className='icon' />
        </IconButton>
      </p>
      <Link href='https://github.com/lele-mathis/portfolio-app'>
        View source code
      </Link>
    </footer>
  );
}

export default Footer;
