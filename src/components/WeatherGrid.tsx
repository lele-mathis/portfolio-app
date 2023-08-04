import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridEventListener,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';

import WeatherLoc from '../models/weatherLoc';
import ConfirmDialog from '../ui/ConfirmDialog';
import { locationActions } from '../store/location-slice';

const WeatherGrid: React.FC<{ weatherList: WeatherLoc[] }> = (props) => {
  const dispatch = useAppDispatch();
  const [dialogMessage, setDialogMessage] = useState('');
  const [toRemove, setToRemove] = useState('');
  const dialogOpen = dialogMessage !== '';

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 }, //this is the location ID not the weather ID
    { field: 'locationName', headerName: 'Location', width: 120 },
    { field: 'state', headerName: 'State/Region', width: 120 },
    { field: 'country', headerName: 'Country', width: 120 },
    { field: 'weather', headerName: 'Weather', width: 150 },
    { field: 'temp', headerName: 'Temperature (\xB0F)', width: 150 },
    { field: 'wind', headerName: 'Wind Speed (mph)', width: 150 },
    { field: 'clouds', headerName: 'Cloud Cover (%)', width: 150 },
    { field: 'rain', headerName: 'Rain in Last Hour (in)', width: 150 },
  ];

  let rows: GridRowsProp = [{ id: 'ID', main: 'Dummy data' }];

  //turn weather objects into DataGrid rows
  rows = props.weatherList.map((value: WeatherLoc) => {
    if (value.rain === undefined) {
      value.rain = { '1h': 0 };
    }
    return {
      id: value.id,
      locationName: value.locationName,
      state: value.state,
      country: value.country,
      weather: value.weather[0].description,
      temp: value.main.temp,
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
    setDialogMessage('Would you like to remove this location?'); //open dialog asking for confirmation
    setToRemove(params.row.locationId);
  };

  const removeAllLocationsHandler = () => {
    setDialogMessage('Would you like to remove all locations?');
  };

  const dialogCloseHandler = (confirm = false) => {
    if (confirm) {
      if (dialogMessage === 'Would you like to remove this location?') {
        dispatch(locationActions.removeLocation(toRemove));
      } else if (dialogMessage === 'Would you like to remove all locations?') {
        dispatch(locationActions.clearLocations());
      }
    }
    setDialogMessage('');
  };
  return (
    <>
      {dialogOpen && (
        <ConfirmDialog
          message={dialogMessage}
          open={dialogOpen}
          onClose={dialogCloseHandler}
        />
      )}
      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={rowClickHandler}
          sx={{ m: 2 }}
        />
      </div>
      <Button onClick={removeAllLocationsHandler} sx={{ m: 2 }}>
        Clear all locations
      </Button>
    </>
  );
};

export default WeatherGrid;
