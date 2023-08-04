import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

const ConfirmDialog: React.FC<{
  message: string;
  open: boolean;
  onClose: (confirm: boolean) => void;
}> = (props) => {
  const handleCancel = () => {
    props.onClose(false);
  };

  const handleConfirm = () => {
    props.onClose(true);
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {'Would you like to remove this location?'}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm} variant='contained' autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
