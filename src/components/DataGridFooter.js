import { Typography, Pagination } from '@mui/material';
import { VscGraphLine } from 'react-icons/vsc';
const DataGridFooter = () => {
  return (
    <>
      <Typography color='secondary'>
        Click on a row above to see forecast data for the next 5 days &nbsp;
        <VscGraphLine style={{ position: 'relative', top: 3 }} />
      </Typography>
      <Pagination size='small' />
    </>
  );
};

export default DataGridFooter;
