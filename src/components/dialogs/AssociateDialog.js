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
import getRestaurantFromAssociateRestaurants from '../../model/getRestaurantFromAssociateRestaurants';

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
        associatesRestaurants,
        restaurantId,
        idToken,
        customId,
        setAssociate,
        setAssociateDialogOpen,
        setAssociateDialogDataItem,
        associateDialogOpen,
    } = dataAndMethodsContext;

    const {
        id,
        canWrite,
        canAdmin,
        firstName,
        lastName,
        jobTitle,
        bio,
        email,
        restaurantIdsJSON,
        dialogType,
    } = dataAndMethodsContext.associateDialogData;

    const handleClose = () => {
        setAssociateDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveAssociate()
                break;
            case "Add":
                saveAssociateAdd()
                break;
            default:
        }
        setAssociateDialogOpen(false);
    };

    const saveAssociate = async () => {
        let myAssociate = {};
        myAssociate.id = id;
        myAssociate.canWrite = canWrite;
        myAssociate.canAdmin = canAdmin;
        myAssociate.firstName = firstName !== '' ? firstName : String.fromCharCode(30);
        myAssociate.lastName = lastName !== '' ? lastName : String.fromCharCode(30);
        myAssociate.jobTitle = jobTitle !== '' ? jobTitle : String.fromCharCode(30);
        myAssociate.bio = bio !== '' ? bio : String.fromCharCode(30);
        myAssociate.email = email;
        myAssociate.restaurantIdsJSON = restaurantIdsJSON;
        myAssociate.dialogType = dialogType;
        await putAssociate(myAssociate, idToken, customId)
        setAssociate(myAssociate)
    };

    const saveAssociateAdd = async () => {
        let myAssociate = {};
        myAssociate.id = id;
        myAssociate.canWrite = canWrite;
        myAssociate.canAdmin = canAdmin;
        myAssociate.firstName = firstName !== '' ? firstName : String.fromCharCode(30);
        myAssociate.lastName = lastName !== '' ? lastName : String.fromCharCode(30);
        myAssociate.jobTitle = jobTitle !== '' ? jobTitle : String.fromCharCode(30);
        myAssociate.bio = bio !== '' ? bio : String.fromCharCode(30);
        myAssociate.email = email;
        myAssociate.restaurantIdsJSON = restaurantIdsJSON;
        myAssociate.dialogType = dialogType;
        await putAssociate(myAssociate, idToken, customId)
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        // console.log(myRestaurant)
        // myRestaurant.menuDayIdsJSON.push(myNewMenuDay.id)
        // await putRestaurant(myRestaurant, idToken, customId)
        // let myMenuDays = await getRestaurantAssociates(myRestaurant, idToken, customId)
        // myAssociates = await sortAssociates(myMenuDays, 'sortDate');
        // setRestaurantAssociates(myMenuDays)
        // setAssociateDialogOpen(false);
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
                    {dialogType + ' associate details'}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="firstName"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={firstName}
                        onChange={changeFirstName}
                    />
                    <TextField
                        id="lastName"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={lastName}
                        onChange={changeLastName}
                    />
                    <TextField
                        id="jobTitle"
                        label="Job title"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={jobTitle}
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
                        value={bio}
                        onChange={changeBio}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AssociateDialog;
