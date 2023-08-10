import { useRouteError, Link as RouterLink } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Typography, Box, Link } from '@mui/material';

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
  console.log(JSON.stringify(error));
  document.title = 'Error | Lele Mathis Portfolio';

  return (
    <>
      <Header />
      <Box
        component='main'
        sx={{
          textAlign: 'center',
          mx: 1,
          my: 2,
        }}
      >
        <Typography component='h1' variant='h2' sx={{ color: '#cb3030' }}>
          Unexpected Error!
        </Typography>
        <Typography component='h2' variant='h4'>
          Status {error.status}: {error.statusText}
        </Typography>
        <Typography component='h3' variant='h6'>
          {error.data}
        </Typography>
        <Link component={RouterLink} to='/'>
          Go back to Home
        </Link>
      </Box>
      <Footer />
    </>
  );
};

export default ErrorPage;
