import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function PopUp({
  display = false,
  autoHideTime = 2500,
  verticalPosition = 'top',
  horizontalPosition = 'right',
  onClose,
  variant = 'filled',
  severity,
  message,
}) {
  return (
    <Snackbar
      open={display}
      autoHideDuration={autoHideTime}
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
      onClose={onClose}
    >
      <Alert variant={variant} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
}
