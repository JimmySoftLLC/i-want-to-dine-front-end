import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    associatesTableName,
} from '../../api/apiConstants';

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
        myAssociate.email = associateDialogData.email;
        myAssociate.restaurantIdsJSON = associateDialogData.id;
        myAssociate.id = associateDialogData.id
        myAssociate.dialogType = associateDialogData.dialogType;
        const successAssociatePut = await putItemDynamoDB(associatesTableName, idToken, myAssociate, customId)
        setAssociate(myAssociate)
        setAssociateDialogOpen(false);
    };

    const changeFirstName = (e) => {
        setAssociateDialogDataItem('firstName', e.target.value)
    };

    const changeLastName = (e) => {
        setAssociateDialogDataItem('lastName', e.target.value)
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
