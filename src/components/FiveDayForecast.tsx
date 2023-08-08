import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import WeatherPoint from '../models/weatherPoint';

const FiveDayForecast: React.FC<{ data: WeatherPoint[] }> = (props) => {
  //average over the weather types of each day - take mode?
  //make schedule with icons
  return (
    <Card variant='outlined' sx={{ m: 1 }}>
      <Grid container direction='row'></Grid>
    </Card>
  );
};

export default FiveDayForecast;
