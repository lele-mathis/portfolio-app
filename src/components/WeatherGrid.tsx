import React, { useState, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
  GridEventListener,
  GridRenderCellParams,
} from '@mui/x-data-grid';
import { Button, Switch, FormControlLabel, Toolbar } from '@mui/material';
import { FaTrash as TrashIcon } from 'react-icons/fa';

import WeatherLoc from '../models/weatherLoc';
import ConfirmDialog from '../ui/ConfirmDialog';
import { locationActions } from '../store/location-slice';
import { uiActions } from '../store/store';

const WeatherGrid: React.FC<{ weatherList: WeatherLoc[] }> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const showIcons = useAppSelector((state) => state.ui.showIcons);
  const [dialogMessage, setDialogMessage] = useState('');
  const [toRemove, setToRemove] = useState('');
  const dialogOpen = dialogMessage !== '';

  const rowClickHandler: GridEventListener<'rowClick'> = (
    params,
    event,
    details
  ) => {
    dispatch(uiActions.closeNotification());
    navigate('/weather/' + params.row.id); //route to new detail page
  };

  const removeLocationHandler = useCallback((rowId: number | string) => {
    setDialogMessage('Would you like to delete this location?'); //open dialog asking for confirmation
    setToRemove(rowId.toString());
  }, []);

  const removeAllLocationsHandler = () => {
    setDialogMessage('Would you like to delete all locations?');
  };

  const columnsWithIcons = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80 }, //this is the location ID not the weather ID
      { field: 'locationName', headerName: 'Location', width: 120 },
      { field: 'state', headerName: 'State/Region', width: 120 },
      { field: 'country', headerName: 'Country', width: 120 },
      {
        field: 'icon',
        headerName: '',
        renderCell: (params: GridRenderCellParams<{ icon: string }>) => (
          <img
            alt=''
            src={`https://openweathermap.org/img/wn/${params.row.icon}.png`}
          />
        ),
        width: 50,
      },
      { field: 'weather', headerName: 'Weather', width: 140 },
      {
        field: 'temp',
        headerName: 'Temperature (\xB0F)',
        align: 'right',
        width: 130,
      },
      {
        field: 'wind',
        headerName: 'Wind Speed (mph)',
        align: 'right',
        width: 130,
      },
      {
        field: 'clouds',
        headerName: 'Cloudiness (%)',
        align: 'right',
        width: 120,
      },
      {
        field: 'rain',
        headerName: 'Rain in Last Hour (mm)',
        align: 'right',
        width: 170,
      },
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

  const columnsNoIcons = useMemo<GridColDef[]>(
    () => [
      { field: 'id', headerName: 'ID', width: 80 }, //this is the location ID not the weather ID
      { field: 'locationName', headerName: 'Location', width: 120 },
      { field: 'state', headerName: 'State/Region', width: 120 },
      { field: 'country', headerName: 'Country', width: 120 },
      { field: 'weather', headerName: 'Weather', width: 130 },
      {
        field: 'temp',
        headerName: 'Temperature (\xB0F)',
        align: 'right',
        width: 130,
      },
      {
        field: 'wind',
        headerName: 'Wind Speed (mph)',
        align: 'right',
        width: 130,
      },
      {
        field: 'clouds',
        headerName: 'Cloudiness (%)',
        align: 'right',
        width: 120,
      },
      {
        field: 'rain',
        headerName: 'Rain in Last Hour (mm)',
        align: 'right',
        width: 170,
      },
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
      icon: value.weather[0].icon,
      weather: value.weather[0].description,
      temp: value.main.temp,
      wind: value.wind.speed,
      clouds: value.clouds.all,
      rain: value.rain['1h'],
    };
  });

  const dialogCloseHandler = (confirm = false) => {
    if (confirm) {
      if (dialogMessage === 'Would you like to delete this location?') {
        dispatch(locationActions.removeLocation(toRemove));
      } else if (dialogMessage === 'Would you like to delete all locations?') {
        dispatch(locationActions.clearLocations());
      }
    }
    setDialogMessage('');
  };

  const switchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(uiActions.setShowIcons(event.target.checked));
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
          columns={showIcons ? columnsWithIcons : columnsNoIcons}
          onRowClick={rowClickHandler}
          sx={{ m: 2 }}
        />
      </div>
      <Toolbar
        id='DataGrid-actions'
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <FormControlLabel
          control={
            <Switch
              onChange={switchChangeHandler}
              checked={showIcons}
              defaultChecked
            />
          }
          label='Show/Hide weather icons'
        />
        <Button
          onClick={removeAllLocationsHandler}
          size='large'
          sx={{ color: 'primary' }}
        >
          <TrashIcon className='icon' /> &nbsp;Delete all locations
        </Button>
      </Toolbar>
    </>
  );
};

export default WeatherGrid;
