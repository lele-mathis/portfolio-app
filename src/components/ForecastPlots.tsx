import { useState } from 'react';
import Plot from 'react-plotly.js';
import { ToggleButtonGroup, ToggleButton, Container } from '@mui/material';

import WeatherPoint from '../models/weatherPoint';

const ForecastPlots: React.FC<{ data: WeatherPoint[] }> = (props) => {
  const [chosenPlots, setChosenPlots] = useState<string[]>(['temp']);
  const choosePlotHandler = (
    event: React.MouseEvent<HTMLElement>,
    newPlots: string[]
  ) => {
    console.log('Plots chosen: ' + newPlots);
    setChosenPlots(newPlots);
  };

  type PlotVariant = {
    [key: string]: JSX.Element;
  };

  const plotWidth = 1000;
  const plotHeight = 300;

  //make all the plot elements and then render the selected ones - memoize?
  const plotElements: PlotVariant = {
    //add traces for min and max temp
    temp: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.main.temp),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Temperature',
        }}
      />
    ),
    pop: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.pop),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Probability of Precipitation',
        }}
      />
    ),
    rain: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => (value.rain ? value.rain['3h'] : 0)),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Rain per 3 hours (mm)',
        }}
      />
    ),
    snow: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => (value.snow ? value.snow['3h'] : 0)),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Snow per 3 hours (mm)',
        }}
      />
    ),
    clouds: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.clouds.all),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Cloud Cover (%)',
        }}
      />
    ),
    wind: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.wind.speed),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Wind Speed (mph)',
        }}
      />
    ),
    vis: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.visibility),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Average Visibility (meters)',
        }}
      />
    ),
    press: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.main.pressure),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Pressure (hPa)',
        }}
      />
    ),
    hum: (
      <Plot
        data={[
          {
            x: props.data.map((value) => value.dt_txt),
            y: props.data.map((value) => value.main.humidity),
            type: 'scatter',
            mode: 'lines+markers',
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          title: 'Humidity (%)',
        }}
      />
    ),
  };

  const chosenPlotElements: JSX.Element[] = [];

  for (let plot of chosenPlots) {
    chosenPlotElements.push(plotElements[plot]);
  }

  return (
    <>
      <ToggleButtonGroup
        value={chosenPlots}
        onChange={choosePlotHandler}
        sx={{ mx: 'auto' }}
      >
        <ToggleButton value='temp'>Temperature</ToggleButton>
        <ToggleButton value='pop'>Chance of Precip</ToggleButton>
        <ToggleButton value='rain'>Amount of Rain</ToggleButton>
        <ToggleButton value='snow'>Amount of Snow</ToggleButton>
        <ToggleButton value='clouds'>Cloud cover</ToggleButton>
        <ToggleButton value='wind'>Wind speed</ToggleButton>
        <ToggleButton value='vis'>Visibility</ToggleButton>
        <ToggleButton value='press'>Pressure</ToggleButton>
        <ToggleButton value='hum'>Humidity</ToggleButton>
      </ToggleButtonGroup>

      <Container maxWidth='xl'>{chosenPlotElements}</Container>
    </>
  );
};

export default ForecastPlots;
