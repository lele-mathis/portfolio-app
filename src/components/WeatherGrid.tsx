import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';
//import Card from '@mui/material/Card';
import Weather from '../models/weather';
import ConfirmDialog from '../ui/ConfirmDialog';
import { weatherActions } from '../store/store';

const WeatherGrid: React.FC<{ weatherList: Weather[] }> = (props) => {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toRemove, setToRemove] = useState('');
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Location', width: 100 },
    { field: 'weather', headerName: 'Weather', width: 150 },
    { field: 'temp', headerName: 'Temperature (\xB0F)', width: 150 },
    { field: 'feelsLike', headerName: 'Feels Like (\xB0F)', width: 150 },
    { field: 'wind', headerName: 'Wind Speed (mph)', width: 150 },
    { field: 'clouds', headerName: 'Cloud Cover (%)', width: 150 },
    { field: 'rain', headerName: 'Rain in last hour (in)', width: 150 },
  ];

  let rows: GridRowsProp = [{ id: 'ID', main: 'Dummy data' }];

  //turn weather objects into DataGrid rows
  rows = props.weatherList.map((value: Weather) => {
    if (value.rain === undefined) {
      value.rain = { '1h': 0 };
    }
    return {
      id: value.id,
      name: value.name,
      weather: value.weather[0].description,
      temp: value.main.temp,
      feelsLike: value.main['feels_like'],
      wind: value.wind.speed,
      clouds: value.clouds.all,
      rain: value.rain['1h'],
    };
  });

  const rowClickHandler: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details // GridCallbackDetails
  ) => {
    setDialogOpen(true); //open dialog asking for confirmation
    setToRemove(params.row.name);
  };

  const dialogCloseHandler = (confirm = false) => {
    if (confirm) {
      dispatch(weatherActions.removeLocation(toRemove));
    }
    setDialogOpen(false);
  };
  return (
    <>
      {dialogOpen && (
        <ConfirmDialog open={dialogOpen} onClose={dialogCloseHandler} />
      )}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={rowClickHandler}
          density='compact'
          sx={{ m: 2 }}
        />
        ;
      </div>
    </>
  );
};

export default WeatherGrid;
