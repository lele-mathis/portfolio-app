import { Alert, AlertTitle } from '@mui/material';

const Notification: React.FC<{
  notification: { status: string; title: string; message: string };
  onClose: () => void;
}> = (props) => {
  const alert = props.notification;

  let alertElement = (
    <Alert severity={'warning'} sx={{ m: 1 }} onClose={props.onClose}>
      <AlertTitle>{alert.title}</AlertTitle>
      {alert.message}
    </Alert>
  );

  if (alert.status === 'error') {
    alertElement = (
      <Alert severity={'error'} sx={{ m: 1 }} onClose={props.onClose}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    );
  } else if (alert.status === 'success') {
    alertElement = (
      <Alert severity={'success'} sx={{ m: 1 }} onClose={props.onClose}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    );
  } else if (alert.status === 'info') {
    alertElement = (
      <Alert severity={'info'} sx={{ m: 1 }} onClose={props.onClose}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    );
  }
  return <>{alertElement}</>;
};

export default Notification;
