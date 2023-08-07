import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const ChoosePlotButtons: React.FC<{
  value: string[];
  onChange: (event: React.MouseEvent<HTMLElement>, newPlots: string[]) => void;
}> = (props) => {
  return (
    <ToggleButtonGroup
      value={props.value}
      onChange={props.onChange}
      orientation='vertical'
      size='small'
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
  );
};

export default ChoosePlotButtons;
