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
import getAssociate from '../../model/getAssociate';
import putRestaurant from '../../model/putRestaurant';
import putAssociateInRestaurant from '../../model/putAssociateInRestaurant';
import getRestaurantAssociates from '../../model/getRestaurantAssociates';
import sortAssociates from '../../model/sortAssociates';
import getAssociateFromRestaurant from '../../model/getAssociateFromRestaurant';
import getRestaurantFromArray from '../../model/getRestaurantFromArray';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

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
        setAssociateDialogOpen,
        setAssociateDialogDataItem,
        associateDialogOpen,
        setRestaurantAssociates,
        setAssociate,
        associate,
    } = dataAndMethodsContext;

    const {
        id,
        firstName,
        lastName,
        jobTitle,
        bio,
        email,
        restaurantIdsJSON,
        accessLevel,
        dialogType,
        message,
    } = dataAndMethodsContext.associateDialogData;

    const handleClose = () => {
        setAssociateDialogOpen(false);
    };

    const handleSave = async () => {
        switch (dialogType) {
            case "EditMe":
                saveAssociateEditMe()
                break;
            case "Edit":
                saveAssociateEdit()
                break;
            case "Add":
                const success = await saveAssociateAdd()
                if (!success) { return null; }
                break;
            default:
        }
        setAssociateDialogOpen(false);
    };

    // edit logged in associate then update restaurant associate table
    const saveAssociateEditMe = async () => {
        let myAssociate = {};
        myAssociate.id = id;
        myAssociate.firstName = firstName !== '' ? firstName : String.fromCharCode(30);
        myAssociate.lastName = lastName !== '' ? lastName : String.fromCharCode(30);
        myAssociate.jobTitle = jobTitle !== '' ? jobTitle : String.fromCharCode(30);
        myAssociate.bio = bio !== '' ? bio : String.fromCharCode(30);
        myAssociate.email = email !== '' ? email : String.fromCharCode(30);
        myAssociate.restaurantIdsJSON = restaurantIdsJSON;
        myAssociate.accessLevel = accessLevel;
        await putAssociate(myAssociate, idToken, customId)
        try {
            let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
            await putRestaurant(myRestaurant, idToken, customId)
            let myAssociates = await getRestaurantAssociates(myRestaurant, idToken, customId)
            myAssociates = await sortAssociates(myAssociates, 'sortName');
            setRestaurantAssociates(myAssociates)
        } catch (error) {

        }
        setAssociate(myAssociate);
    };

    // create myAssociate and poplulate it with the dialog's entries.
    // If associate access is not "none" check if already exists in database using email as an id
    // if found load associate from database if not found add associate to database.  
    // Then using the updated associate put it to the resturant, save restaurant to 
    // database.  Then read back all restaurant associates from database.
    const saveAssociateEdit = async () => {
        let myAssociate = {};
        myAssociate.id = id;
        myAssociate.firstName = firstName !== '' ? firstName : String.fromCharCode(30);
        myAssociate.lastName = lastName !== '' ? lastName : String.fromCharCode(30);
        myAssociate.jobTitle = jobTitle !== '' ? jobTitle : String.fromCharCode(30);
        myAssociate.bio = bio !== '' ? bio : String.fromCharCode(30);
        myAssociate.email = email !== '' ? email : String.fromCharCode(30);
        myAssociate.restaurantIdsJSON = restaurantIdsJSON;
        myAssociate.accessLevel = accessLevel;
        if (myAssociate.accessLevel !== 'none') {
            myAssociate.id = email;
            const associate = await getAssociate(idToken, customId, myAssociate.id)
            if (!associate) {
                await putAssociate(myAssociate, idToken, customId)
            } else {
                myAssociate = associate;
            }
        }
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myRestaurant = putAssociateInRestaurant(myRestaurant, myAssociate)
        await putRestaurant(myRestaurant, idToken, customId)
        let myAssociates = await getRestaurantAssociates(myRestaurant, idToken, customId)
        myAssociates = await sortAssociates(myAssociates, 'sortName');
        setRestaurantAssociates(myAssociates)
    };

    // create myAssociate and poplulate it with the dialog's entries.
    // check if myAssociate is already in the restaurant if so do not proceed and message user.
    // Then if associate access is not "none" check if already exists in database using email as an id
    // if found load associate from database if not found add associate to database.  
    // Then using the updated associate put it to the resturant, save restaurant to 
    // database.  Then read back all restaurant associates from database.
    const saveAssociateAdd = async () => {
        let myAssociate = {};
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        myAssociate.id = id;
        myAssociate.firstName = firstName !== '' ? firstName : String.fromCharCode(30);
        myAssociate.lastName = lastName !== '' ? lastName : String.fromCharCode(30);
        myAssociate.jobTitle = jobTitle !== '' ? jobTitle : String.fromCharCode(30);
        myAssociate.bio = bio !== '' ? bio : String.fromCharCode(30);
        myAssociate.email = email !== '' ? email : String.fromCharCode(30);
        myAssociate.restaurantIdsJSON = [];
        myAssociate.restaurantIdsJSON.push(myRestaurant.id);
        myAssociate.accessLevel = accessLevel;
        if (myAssociate.accessLevel !== 'none') {
            myAssociate.id = email;
            const associateExists = getAssociateFromRestaurant(myRestaurant, myAssociate.id)
            if (associateExists) {
                setMessage('That associate already exists in restaurant.');
                return null;
            }
            const associate = await getAssociate(idToken, customId, myAssociate.id)
            if (!associate) {
                await putAssociate(myAssociate, idToken, customId)
            } else {
                myAssociate = associate;
            }
        } else {
            const associateExists = getAssociateFromRestaurant(myRestaurant, myAssociate.id)
            if (associateExists) {
                setMessage('That associate already exists in restaurant.')
                return null;
            }
        }
        myRestaurant = putAssociateInRestaurant(myRestaurant, myAssociate)
        await putRestaurant(myRestaurant, idToken, customId)
        let myAssociates = await getRestaurantAssociates(myRestaurant, idToken, customId)
        myAssociates = await sortAssociates(myAssociates, 'sortName');
        setRestaurantAssociates(myAssociates)
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

    const changeEmail = (e) => {
        setAssociateDialogDataItem('email', e.target.value)
    };

    const handleAccessLevelChange = (e) => {
        setAssociateDialogDataItem('accessLevel', e.target.value)
    };

    const setMessage = (myMessage) => {
        setAssociateDialogDataItem('message', myMessage)
    };

    let dialogTitle = ''

    if (dialogType === "EditMe") { dialogTitle = 'Edit my details' }
    if (dialogType === "Edit") { dialogTitle = 'Edit associate details' }
    if (dialogType === "Add") { dialogTitle = 'Add associate details' }

    return (
        <div>
            <Dialog className={classes.root} open={associateDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogTitle}</DialogTitle>
                <DialogContent>
                    {((accessLevel === "none" && associate.id !== id) || dialogType === "EditMe") && <TextField
                        id="firstName"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={firstName}
                        onChange={changeFirstName}
                    />}
                    {((accessLevel === "none" && associate.id !== id) || dialogType === "EditMe") && <TextField
                        id="lastName"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={lastName}
                        onChange={changeLastName}
                    />}
                    {((accessLevel === "none" && associate.id !== id) || dialogType === "EditMe") && <TextField
                        id="jobTitle"
                        label="Job title"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={jobTitle}
                        onChange={changeJobTitle}
                    />}
                    {((accessLevel === "none" && associate.id !== id) || dialogType === "EditMe") && <TextField
                        id="bio"
                        label="Bio"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="8"
                        value={bio}
                        onChange={changeBio}
                    />}
                    {dialogType !== "EditMe" && <FormLabel component="legend">Access level</FormLabel>}
                    {dialogType !== "EditMe" && <RadioGroup aria-label="gender" name="gender1" value={accessLevel} onChange={handleAccessLevelChange}>
                        <FormControlLabel value="none" control={<Radio color="primary" />} label="No Access" />
                        <FormControlLabel value="view" control={<Radio color="primary" />} label="View" />
                        <FormControlLabel value="edit" control={<Radio color="primary" />} label="Edit" />
                        <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
                    </RadioGroup>}
                    {((accessLevel === "view" || accessLevel === "edit" || accessLevel === "admin") && dialogType !== "EditMe") && <TextField
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="filled"
                        value={email}
                        onChange={changeEmail}
                    />}
                    <p>{message}</p>
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
