import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putAssociate from '../../model/putAssociate';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const AssociateDialog = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const {
        associateDialogData,
        idToken,
        customId,
        setAssociate,
        setAssociateDialogOpen,
        setAssociateDialogDataItem,
        associateDialogOpen,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setAssociateDialogOpen(false);
    };

    const saveAssociate = async () => {
        let myAssociate = {};
        myAssociate.id = associateDialogData.id;
        myAssociate.canWrite = associateDialogData.canWrite;
        myAssociate.canAdmin = associateDialogData.canAdmin;
        myAssociate.firstName = associateDialogData.firstName !== '' ? associateDialogData.firstName : String.fromCharCode(30);
        myAssociate.lastName = associateDialogData.lastName !== '' ? associateDialogData.lastName : String.fromCharCode(30);
        myAssociate.jobTitle = associateDialogData.jobTitle !== '' ? associateDialogData.jobTitle : String.fromCharCode(30);
        myAssociate.bio = associateDialogData.bio !== '' ? associateDialogData.bio : String.fromCharCode(30);
        myAssociate.email = associateDialogData.email;
        myAssociate.restaurantIdsJSON = associateDialogData.restaurantIdsJSON;
        myAssociate.id = associateDialogData.id
        myAssociate.dialogType = associateDialogData.dialogType;
        await putAssociate(myAssociate, idToken, customId)
        setAssociate(myAssociate)
        setAssociateDialogOpen(false);
    };

    const changeFirstName = (e) => {
        setAssociateDialogDataItem('firstName', e.target.value)
    };

    const changeLastName = (e) => {
        setAssociateDialogDataItem('lastName', e.target.value)
    };

    const changeJobTitle = (e) => {
        setAssociateDialogDataItem('jobTitle', e.target.value)
    };

    const changeBio = (e) => {
        setAssociateDialogDataItem('bio', e.target.value)
    };

    return (
        <div>
            <Dialog className={classes.root} open={associateDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {"Edit associate details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="firstName"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={associateDialogData.firstName}
                        onChange={changeFirstName}
                    />
                    <TextField
                        id="lastName"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={associateDialogData.lastName}
                        onChange={changeLastName}
                    />
                    <TextField
                        id="jobTitle"
                        label="Job title"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={associateDialogData.jobTitle}
                        onChange={changeJobTitle}
                    />
                    <TextField
                        id="bio"
                        label="Bio"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="8"
                        value={associateDialogData.bio}
                        onChange={changeBio}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => saveAssociate()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AssociateDialog;
