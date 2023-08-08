import { useAppSelector } from '../hooks/typedHooks';
import { Card, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import WeatherPoint from '../models/weatherPoint';

const FiveDayForecast: React.FC<{ data: WeatherPoint[] }> = (props) => {
  const isMobile = useAppSelector((state) => state.ui.isMobile);

  const stringDate = (date: Date) => {
    return date.toString().substring(0, 10);
  };
  //make schedule with icons
  let weatherByDate: { [keys: string]: { weather: string[]; icon: string[] } } =
    {};

  //from https://stackoverflow.com/questions/40410470/highest-occurrence-in-an-array-or-first-selected
  function modeString(array: string[]) {
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
    const weatherMode = modeString(weatherByDate[date].weather);
    const iconMode = modeString(weatherByDate[date].icon);
    fiveDayWeather.push(
      <Grid item key={date}>
        <img //only using 'day' icons
          alt={weatherMode ? weatherMode : ''}
          aria-labelledby='caption'
          src={
            isMobile
              ? `https://openweathermap.org/img/wn/${iconMode}d.png`
              : `https://openweathermap.org/img/wn/${iconMode}d@2x.png`
          }
        />
        <Typography id='caption' variant={isMobile ? 'caption' : 'body1'}>
          {date}: {weatherMode}
        </Typography>
        {/* <Typography variant='caption'>
          {weatherByDate[date].icon.map((val) => val)}
          <br />
          {weatherByDate[date].weather.map((val) => val)}
        </Typography> */}
      </Grid>
    );
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
