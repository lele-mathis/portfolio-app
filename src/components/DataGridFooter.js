import { useAppSelector } from '../hooks/typedHooks';
import { Typography, Pagination, Stack } from '@mui/material';
import { IoIosArrowUp } from 'react-icons/io';
const DataGridFooter = () => {
  const isMobile = useAppSelector((state) => state.ui.isMobile);

  return (
    <>
      <Typography color='primary'>
        <IoIosArrowUp />
        {isMobile ? ' Tap ' : <>&nbsp;Click on </>}a row to see the weather
        forecast {!isMobile && 'for the next 5 days '}
        <IoIosArrowUp />
        &nbsp;
      </Typography>
      <Pagination size='small' hidePrevButton hideNextButton />
    </>
  );
};

export default DataGridFooter;
