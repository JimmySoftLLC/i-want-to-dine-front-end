import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertDialogContext from '../../context/alertDialog/alertDialogContext';

const AlertDialog = () => {

  const alertDialogContext = useContext(AlertDialogContext);

  const { alertDialog, closeAlertDialog } = alertDialogContext;

  return (
    alertDialog != null && (
      <div>
        <Dialog
          open={alertDialog.alertOpen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            <i className='fas fa-exclamation-triangle'></i>
            {'  '}
            {alertDialog.alertTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {alertDialog.alertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => closeAlertDialog()} className='btn btn-light'>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
  );
}

export default AlertDialog;
