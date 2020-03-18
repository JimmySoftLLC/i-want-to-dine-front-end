import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
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
    const { deleteConfirmDialog, closeDialog, deleteFunction } = deleteConfirmDialogContext;

    const [deleteName, setDeleteName] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');

    const changeDeleteName = (e) => {
        setDeleteName(e.target.value)
    };

    const chooseDelete = () => {
        if (deleteName === deleteConfirmDialog.name) {
            deleteFunction(deleteConfirmDialog.index)
            setDeleteName('')
        } else {
            setConfirmMessage('Typed in name does not match')
        }
    }

    const chooseClose = () => {
        closeDialog()
        setDeleteName('')
        setConfirmMessage('')
    }

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
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?  To confirm delete type the name below.`}
                        </DialogContentText>
                        <TextField
                            id="name"
                            label="Name of item to delete"
                            type="text"
                            fullWidth
                            variant="filled"
                            value={deleteName}
                            onChange={changeDeleteName}
                        />
                        <p>{confirmMessage}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button color="default" onClick={() => chooseClose()}>
                            CANCEL
                        </Button>
                        <Button color="primary" onClick={() => chooseDelete()}>
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    );
}

export default DeleteConfirmDialog;
