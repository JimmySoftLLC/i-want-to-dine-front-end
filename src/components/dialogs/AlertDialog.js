import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertDialogContext from '../../context/alertDialog/alertDialogContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiButton-root': {
      margin: theme.spacing(1),
      marginLeft: 0,
    },
  },
}));

const AlertDialog = () => {
  const classes = useStyles();
  const alertDialogContext = useContext(AlertDialogContext);
  const { alertDialog, closeDialog } = alertDialogContext;

  return (
    alertDialog != null && (
      <div>
        <Dialog
          className={classes.root}
          open={alertDialog.dialogOpen}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            <i className='fas fa-exclamation-triangle'></i>
            {'  '}
            {alertDialog.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {alertDialog.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="default" onClick={() => closeDialog()}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
  );
}

export default AlertDialog;
