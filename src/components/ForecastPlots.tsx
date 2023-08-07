import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Slider, Container, Grid } from '@mui/material';

import WeatherPoint from '../models/weatherPoint';
import ChoosePlotButtons from './ChoosePlotButtons';

const ForecastPlots: React.FC<{ data: WeatherPoint[] }> = (props) => {
  const [chosenPlots, setChosenPlots] = useState<string[]>(['temp']);
  const [plotHeight, setPlotHeight] = useState<number>(300); //in pixels
  const [plotWidth, setPlotWidth] = useState<number>(1000);

  const choosePlotHandler = (
    event: React.MouseEvent<HTMLElement>,
    newPlots: string[]
  ) => {
    console.log('Plots chosen: ' + newPlots);
    setChosenPlots(newPlots);
  };

  const widthChangeHandler = (event: Event, newWidth: number | number[]) => {
    setPlotWidth(newWidth as number);
  };

  const heightChangeHandler = (event: Event, newHeight: number | number[]) => {
    setPlotHeight(newHeight as number);
  };

  type PlotData = { x: Date[]; y: number[]; title: string };
  type PlotDataObj = {
    [key: string]: PlotData;
  };

  //make all the plot elements and then render the selected ones - memoize?
  const plotData: PlotDataObj = {
    //add traces for min and max temp
    temp: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.main.temp),
      title: 'Temperature',
    },
    pop: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.pop),
      title: 'Probability of Precipitation (%)',
    },
    rain: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => (value.rain ? value.rain['3h'] : 0)),

      title: 'Rain per 3 hours (mm)',
    },
    snow: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => (value.snow ? value.snow['3h'] : 0)),
      title: 'Snow per 3 hours (mm)',
    },
    clouds: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.clouds.all),
      title: 'Cloud Cover (%)',
    },
    wind: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.wind.speed),
      title: 'Wind Speed (mph)',
    },
    vis: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.visibility),
      title: 'Average Visibility (meters)',
    },
    press: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.main.pressure),
      title: 'Pressure (hPa)',
    },
    hum: {
      x: props.data.map((value) => value.dt_txt),
      y: props.data.map((value) => value.main.humidity),
      title: 'Humidity (%)',
    },
  };

  const chosenPlotData: PlotData[] = [];

  for (let plot of chosenPlots) {
    chosenPlotData.push(plotData[plot]);
  }

  return (
    <>
      <Grid container direction='row' wrap='nowrap'>
        <Grid item>
          <Grid container direction='column'>
            <Grid item sx={{ m: 1 }}>
              <ChoosePlotButtons
                value={chosenPlots}
                onChange={choosePlotHandler}
              />
            </Grid>
            <Grid item sx={{ m: 1 }}>
              Plot width:
              <Slider
                value={plotWidth}
                min={200}
                max={1200}
                onChange={widthChangeHandler}
                aria-label='plot width'
                color='secondary'
              />
              Plot height:
              <Slider
                value={plotHeight}
                min={100}
                max={1000}
                onChange={heightChangeHandler}
                aria-label='plot height'
                color='secondary'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Container>
            {chosenPlotData.map((value) => (
              <Plot
                data={[
                  {
                    x: value.x,
                    y: value.y,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: '#762F3D' },
                  },
                ]}
                layout={{
                  width: plotWidth,
                  height: plotHeight,
                  title: value.title,
                  margin: { l: 30, r: 30, t: 35, b: 40, pad: 5 },
                }}
              />
            ))}
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default ForecastPlots;
