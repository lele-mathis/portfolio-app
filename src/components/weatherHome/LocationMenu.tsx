import { Menu, MenuItem, Divider } from '@mui/material';
import Geocode from '../../models/geocode';

const LocationMenu: React.FC<{
  open: boolean;
  items: Geocode[];
  anchorEl: HTMLElement | null;
  onChoose: (id: string) => void;
  onClose: () => void;
}> = (props) => {
  //figure out what type this is
  const itemClickHandler = (event: any) => {
    //console.log(event.target.id);
    props.onChoose(event.target.id);
  };
  const menuItems = props.items.map((loc) => (
    <MenuItem onClick={itemClickHandler} key={loc.id} id={loc.id}>
      {loc.name + ', ' + loc.admin1 + ', ' + loc.country}
    </MenuItem>
  ));

  return (
    <Menu anchorEl={props.anchorEl} open={props.open} onClose={props.onClose}>
      {menuItems}
      <Divider />
      <MenuItem onClick={itemClickHandler} key='all' id='all'>
        Add All
      </MenuItem>
    </Menu>
  );
};

export default LocationMenu;
