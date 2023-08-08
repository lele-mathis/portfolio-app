import { useAppSelector } from '../hooks/typedHooks';
import { Typography, Pagination } from '@mui/material';
import { VscGraphLine } from 'react-icons/vsc';
import { IoIosArrowUp } from 'react-icons/io';
const DataGridFooter = () => {
  const isMobile = useAppSelector((state) => state.ui.isMobile);

  return (
    <>
      <Typography color='primary'>
        {isMobile ? (
          'Tap '
        ) : (
          <>
            <IoIosArrowUp />
            &nbsp;
          </>
        )}
        on a row to see forecast data for the next 5 days&nbsp;
        {isMobile ? (
          <VscGraphLine style={{ position: 'relative', top: 3 }} />
        ) : (
          <IoIosArrowUp />
        )}
        &nbsp;
      </Typography>
      {!isMobile && <Pagination size='small' />}
    </>
  );
};

export default DataGridFooter;
