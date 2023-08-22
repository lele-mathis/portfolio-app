import { Link, IconButton, Typography } from '@mui/material';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', maxWidth: 'xl', margin: 2 }}>
      <Typography id='copyright-and-links' sx={{ m: 1 }}>
        © 2023 Lele Mathis{' '}
        <IconButton
          component={Link}
          alt='Linkedin icon'
          href='https://www.linkedin.com/in/lele-mathis/'
        >
          <FaLinkedin className='icon' color='#340442' />
        </IconButton>
        <IconButton
          component={Link}
          alt='Github icon'
          href='https://github.com/lele-mathis'
        >
          <FaGithub className='icon' color='#340442' />
        </IconButton>
        <br />
        Last updated August 22th, 2023, hosted on{' '}
        <Link href='https://firebase.google.com/'>Firebase</Link>
      </Typography>
      <Link href='https://github.com/lele-mathis/portfolio-app'>
        View source code
      </Link>
    </footer>
  );
}

export default Footer;
