import { Card, Link, IconButton } from '@mui/material';

import LinkedInLogo from '../graphics/LI_logo.png';
import GithubLogo from '../graphics/GH_logo.png';

function Footer() {
  return (
    <footer style={{ textAlign: 'center', maxWidth: 'xl', margin: 2 }}>
      <Card sx={{ width: 200, mx: 'auto' }}>
        Follow me:
        <IconButton
          component={Link}
          to='https://www.linkedin.com/in/lele-mathis/'
        >
          <img
            style={{ height: 30, width: 30 }}
            src={LinkedInLogo}
            alt='LinkedIn Logo'
          />
        </IconButton>
        <IconButton component={Link} to='https://github.com/lele-mathis'>
          <img
            style={{ height: 30, width: 30 }}
            src={GithubLogo}
            alt='Github Logo'
          />
        </IconButton>
      </Card>
    </footer>
  );
}

export default Footer;
