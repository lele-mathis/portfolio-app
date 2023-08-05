import React, { useState, useCallback, useMemo } from 'react';
import { useAppDispatch } from '../hooks';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { FaTrash as TrashIcon } from 'react-icons/fa';

import WeatherLoc from '../models/weatherLoc';
import ConfirmDialog from '../ui/ConfirmDialog';
import { locationActions } from '../store/location-slice';

const WeatherGrid: React.FC<{ weatherList: WeatherLoc[] }> = (props) => {
  const dispatch = useAppDispatch();
  const [dialogMessage, setDialogMessage] = useState('');
  const [toRemove, setToRemove] = useState('');
  const dialogOpen = dialogMessage !== '';

  const removeLocationHandler = useCallback((rowId: number | string) => {
    setDialogMessage('Would you like to remove this location?'); //open dialog asking for confirmation
    setToRemove(rowId.toString());
  }, []);

  const removeAllLocationsHandler = () => {
    setDialogMessage('Would you like to remove all locations?');
  };

  //useMemo to save this since it never changes
  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 100 }, //this is the location ID not the weather ID
      { field: 'locationName', headerName: 'Location', width: 120 },
      { field: 'state', headerName: 'State/Region', width: 120 },
      { field: 'country', headerName: 'Country', width: 120 },
      { field: 'weather', headerName: 'Weather', width: 150 },
      { field: 'temp', headerName: 'Temperature (\xB0F)', width: 150 },
      { field: 'wind', headerName: 'Wind Speed (mph)', width: 150 },
      { field: 'clouds', headerName: 'Cloud Cover (%)', width: 150 },
      { field: 'rain', headerName: 'Rain in Last Hour (in)', width: 150 },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            icon={<TrashIcon />}
            label='Delete'
            onClick={() => removeLocationHandler(params.id)}
          />,
        ],
      },
    ],
    [removeLocationHandler]
  );

  //turn weather objects into DataGrid rows
  const rows = props.weatherList.map((value: WeatherLoc) => {
    if (value.rain === undefined) {
      value.rain = { '1h': 0 };
    }
    return {
      id: value.locationId,
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
        <DataGrid rows={rows} columns={columns} sx={{ m: 2 }} />
      </div>
      <Button onClick={removeAllLocationsHandler} sx={{ m: 2 }}>
        <TrashIcon /> &nbsp;Delete all locations
      </Button>
    </>
  );
};

export default WeatherGrid;
