import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem, InputLabel, FormControl } from '@mui/material';

const ALL_PLOTS = [
  'temp',
  'pop',
  'rain',
  'snow',
  'clouds',
  'wind',
  'vis',
  'press',
  'hum',
];

const PlotMenu: React.FC<{
  values: string[];
  onChange: (event: SelectChangeEvent) => void;
}> = (props) => {
  const remainingValues = ALL_PLOTS.filter(
    (plot) => props.values.indexOf(plot) === -1
  );

  const titleMap: { [key: string]: string } = {
    temp: 'Temperature',
    pop: 'Chance of Precip',
    rain: 'Amount of Rain',
    snow: 'Amount of Snow',
    clouds: 'Cloud cover',
    wind: 'Wind speed',
    vis: 'Visibility',
    press: 'Pressure',
    hum: 'Humidity',
  };
  return (
    <FormControl fullWidth>
      <InputLabel id='plot-select'>Add a new graph</InputLabel>
      <Select
        labelId='plot-select'
        onChange={props.onChange}
        label='Add a new graph'
        fullWidth
      >
        {remainingValues.map((plot) => (
          <MenuItem value={plot} key={plot}>
            {titleMap[plot]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlotMenu;
