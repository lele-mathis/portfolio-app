import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/typedHooks';

import { Container } from '@mui/material';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function RootLayout() {
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);

  return (
    <>
      <Header />
      {isNarrow ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <Container maxWidth='xl'>
          <main>
            <Outlet />
          </main>
        </Container>
      )}
      <Footer />
    </>
  );
}

export default RootLayout;
