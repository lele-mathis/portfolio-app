import { useAppSelector } from '../hooks';

import { Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

import Geocode from '../models/geocode';
import NewLocation from '../components/NewLocation';

const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns: GridColDef[] = [
  { field: 'city', headerName: 'City', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
];

function WeatherHomePage() {
  const locationsList: Geocode[] = useAppSelector(
    (state) => state.weather.locations
  );

  //request weather data and display it

  return (
    <>
      <Typography component='h1' variant='h3'>
        Weather info will go here
      </Typography>
      <NewLocation />
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </>
  );
}

export default WeatherHomePage;
