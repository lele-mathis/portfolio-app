import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Slider, Container, Grid } from '@mui/material';
import { isMobile } from 'react-device-detect';

import useWindowDimensions from '../../hooks/useWindowDimensions';
import WeatherPoint from '../../models/weatherPoint';
import ChoosePlotButtons from './ChoosePlotButtons';
import PlotMenu from './PlotMenu';

const ForecastPlots: React.FC<{ data: WeatherPoint[] }> = (props) => {
  const [chosenPlots, setChosenPlots] = useState<string[]>(['temp']);
  const [plotHeight, setPlotHeight] = useState<number>(300); //in pixels
  const [plotWidth, setPlotWidth] = useState<number>(1000);
  const windowDimensions = useWindowDimensions();

  const choosePlotHandler = (
    event: React.MouseEvent<HTMLElement>,
    newPlots: string[]
  ) => {
    setChosenPlots(newPlots);
  };

  const selectPlotHandler = (newPlot: string) => {
    if (!chosenPlots.find((plot) => plot === newPlot)) {
      setChosenPlots((oldPlots) => oldPlots.concat(newPlot));
    }
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

  let dateTimes = props.data.map((value) => new Date(value.dt_txt));
  //for my phone that has issues with date objects
  if (dateTimes[0].toLocaleString() === 'Invalid Date') {
    dateTimes = props.data.map((value) => value.dt_txt as unknown as Date);
  }
  //make all the plot elements and then render the selected ones - memoize?
  const plotData: PlotDataObj = {
    //add traces for min and max temp later
    temp: {
      x: dateTimes,
      y: props.data.map((value) => value.main.temp),
      title: 'Temperature (\xB0F)',
    },
    pop: {
      x: dateTimes,
      y: props.data.map((value) => value.pop),
      title: 'Probability of Precipitation (%)',
    },
    rain: {
      x: dateTimes,
      y: props.data.map((value) => (value.rain ? value.rain['3h'] : 0)),

      title: 'Rain per 3 hours (mm)',
    },
    snow: {
      x: dateTimes,
      y: props.data.map((value) => (value.snow ? value.snow['3h'] : 0)),
      title: 'Snow per 3 hours (mm)',
    },
    clouds: {
      x: dateTimes,
      y: props.data.map((value) => value.clouds.all),
      title: 'Cloud Cover (%)',
    },
    wind: {
      x: dateTimes,
      y: props.data.map((value) => value.wind.speed),
      title: 'Wind Speed (mph)',
    },
    vis: {
      x: dateTimes,
      y: props.data.map((value) => value.visibility),
      title: 'Average Visibility (meters)',
    },
    press: {
      x: dateTimes,
      y: props.data.map((value) => value.main.pressure),
      title: 'Pressure (hPa)',
    },
    hum: {
      x: dateTimes,
      y: props.data.map((value) => value.main.humidity),
      title: 'Humidity (%)',
    },
  };

  const chosenPlotData: PlotData[] = [];

  for (let plot of chosenPlots) {
    chosenPlotData.push(plotData[plot]);
  }

  const sliders = (
    <>
      {' '}
      Plot width:
      <Slider
        value={plotWidth}
        min={200}
        max={1200}
        onChange={widthChangeHandler}
        aria-label='plot width'
        color='primary'
      />
      Plot height:
      <Slider
        value={plotHeight}
        min={100}
        max={1000}
        onChange={heightChangeHandler}
        aria-label='plot height'
        color='primary'
      />
    </>
  );
  if (!isMobile) {
    //desktop version allows resizing plots
    return (
      <Grid container direction='row' wrap='nowrap' sx={{ m: 1, p: 1 }}>
        <Grid item>
          <Grid container direction='column'>
            <Grid item sx={{ m: 1 }}>
              <ChoosePlotButtons
                value={chosenPlots}
                onChange={choosePlotHandler}
              />
            </Grid>
            <Grid item sx={{ m: 1 }}></Grid>
            {sliders}
          </Grid>
        </Grid>
        <Grid item>
          <Container>
            {chosenPlotData.map((value) => (
              <Plot
                key={value.title}
                data={[
                  {
                    x: value.x,
                    y: value.y,
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {
                      color: '#ec6e4c',
                    },
                  },
                ]}
                layout={{
                  width: plotWidth,
                  height: plotHeight,
                  xaxis: {
                    range: [value.x[0], value.x[value.x.length - 1]],
                    showgrid: false,
                    showline: true,
                    linecolor: '#000',
                  },
                  yaxis: { showgrid: false, showline: true, linecolor: '#000' },
                  title: {
                    text: value.title,
                    font: { size: 16, color: '#000' },
                  },
                  font: { color: '#000' },
                  margin: { l: 30, r: 30, t: 30, b: 40, pad: 0 },
                }}
              />
            ))}
          </Container>
        </Grid>
      </Grid>
    );
  } else {
    //mobile version has fixed width and height, uses PlotMenu to select plots, and hides plotly ModeBar
    return (
      <Grid container direction='column'>
        {chosenPlotData.map((value) => (
          <Grid item key={value.title}>
            <Plot
              key={value.title}
              data={[
                {
                  x: value.x,
                  y: value.y,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {
                    color: '#ec6e4c',
                  },
                },
              ]}
              layout={{
                width: windowDimensions.width - 50,
                height: (windowDimensions.width - 50) / 1.618,
                xaxis: {
                  range: [value.x[0], value.x[value.x.length - 1]],
                  showgrid: false,
                  showline: true,
                  linecolor: '#000',
                },
                yaxis: {
                  showgrid: false,
                  showline: true,
                  linecolor: '#000',
                },
                title: {
                  text: value.title,
                  font: { size: 16, color: '#000' },
                },
                font: { color: '#000' },
                margin: { l: 30, r: 30, t: 30, b: 40, pad: 0 },
              }}
              config={{ displayModeBar: false }}
            />
          </Grid>
        ))}
        <Grid item>
          <PlotMenu values={chosenPlots} onChange={selectPlotHandler} />
        </Grid>
      </Grid>
    );
  }
};

export default ForecastPlots;
