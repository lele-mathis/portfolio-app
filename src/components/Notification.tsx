import { Alert, AlertTitle } from '@mui/material';

const Notification: React.FC<{
  notification: { status: string; title: string; message: string };
}> = (props) => {
  const alert = props.notification;
  return (
    <Alert severity={alert.status === 'error' ? 'error' : 'info'}>
      <AlertTitle>{alert.title}</AlertTitle>
      {alert.message}
    </Alert>
  );
};

export default Notification;
