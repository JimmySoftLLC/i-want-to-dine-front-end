import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },

    },
}));

const DeleteConfirmDialog = () => {
    const classes = useStyles();
    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { deleteConfirmDialog, closeDialog, deleteItem } = deleteConfirmDialogContext;
    return (
        deleteConfirmDialog != null && (
            <div>
                <Dialog
                    className={classes.root}
                    open={deleteConfirmDialog.dialogOpen}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  '}
                        {deleteConfirmDialog.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.message}</strong>
                            {`.  This process is irreversable are you sure?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color="default" onClick={() => closeDialog()}>
                            CANCEL
                        </Button>
                        <Button color="primary" onClick={() => deleteItem(deleteConfirmDialog.index)}>
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    );
}

export default DeleteConfirmDialog;
