import { useAppSelector } from '../../hooks/typedHooks';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { isMobile } from 'react-device-detect';

import WeatherPoint from '../../models/weatherPoint';

const FiveDayForecast: React.FC<{ data: WeatherPoint[] }> = (props) => {
  const isNarrow = useAppSelector((state) => state.ui.isNarrow);
  const stringDate = (date_txt: string) => {
    //always use short date format on mobile
    let formattedDate = new Date(date_txt).toLocaleString('en-US', {
      weekday: isMobile || isNarrow ? 'short' : 'long',
      month: isMobile || isNarrow ? 'short' : 'long',
      day: 'numeric',
    });
    if (formattedDate === 'Invalid Date') {
      return date_txt.substring(0, 10); //fallback if toLocaleString() isn't working
    }
    return formattedDate;
  };
  //make schedule with icons
  let weatherByDate: { [keys: string]: { weather: string[]; icon: string[] } } =
    {};

  //from https://stackoverflow.com/questions/40410470/highest-occurrence-in-an-array-or-first-selected
  function mostFrequent(array: string[]) {
    let map = array.map(function (a) {
      return array.filter(function (b) {
        return a === b;
      }).length;
    });
    return array[map.indexOf(Math.max.apply(null, map))];
  }

  for (let value of props.data) {
    const dateString = stringDate(value.dt_txt);
    if (dateString in weatherByDate) {
      weatherByDate[stringDate(value.dt_txt)].weather.push(
        value.weather[0].main
      );
      weatherByDate[stringDate(value.dt_txt)].icon.push(
        value.weather[0].icon.substring(0, 2)
      );
    } else {
      weatherByDate[stringDate(value.dt_txt)] = { weather: [], icon: [] };
    }
  }

  const fiveDayWeather: JSX.Element[] = [];

  for (let date in weatherByDate) {
    const weatherMode = mostFrequent(weatherByDate[date].weather);
    const iconMode = mostFrequent(weatherByDate[date].icon);

    if (weatherMode && iconMode) {
      fiveDayWeather.push(
        <Grid item key={date} sx={{ textAlign: 'center' }}>
          <img //only using 'day' icons
            alt='weather icon'
            aria-labelledby='caption'
            src={
              isNarrow
                ? `https://openweathermap.org/img/wn/${iconMode}d.png`
                : `https://openweathermap.org/img/wn/${iconMode}d@2x.png`
            }
          />
          <Typography id='caption' variant={isNarrow ? 'body2' : 'body1'}>
            {date}
            <br />
            {weatherMode}
          </Typography>
          {/* <Typography variant='caption'>
            {date}
            <br />
            {weatherByDate[date].icon.map((val) => val)}
            <br />
            {weatherByDate[date].weather.map((val) => val)}
          </Typography> */}
        </Grid>
      );
    } else {
      console.log('Weather forecast data missing for ' + date);
      continue;
      //   dispatch(
      //     uiActions.showNotification({
      //       status: 'warning',
      //       title: 'Warning',
      //       message: 'Weather forecast data missing for ' + date,
      //     })
      //   );
    }
  }

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-around'
      style={{ marginBottom: '16px' }}
    >
      {fiveDayWeather}
    </Grid>
  );
};

export default FiveDayForecast;
