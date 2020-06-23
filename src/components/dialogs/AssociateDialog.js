import React, { useContext } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putAssociate from '../../model/associate/putAssociate';
import getAssociate from '../../model/associate/getAssociate';
import putRestaurant from '../../model/restaurant/putRestaurant';
import isEmail from 'validator/lib/isEmail';
import testPutAssociateInRestaurant from '../../model/restaurant/testPutAssociateInRestaurant';
import putAssociateInRestaurant from '../../model/restaurant/putAssociateInRestaurant';
import putRestaurantInAssociate from '../../model/associate/putRestaurantInAssociate';
import getRestaurantAssociates from '../../model/restaurant/getRestaurantAssociates';
import removeRestaurantFromIds from '../../model/associate/removeRestaurantFromIds';
import removeAssociateFromRestaurant from '../../model/restaurant/removeAssociateFromRestaurant';
import sortAssociates from '../../model/associate/sortAssociates';
import getAssociateFromRestaurant from '../../model/associate/getAssociateFromRestaurant';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import getAssociatesRestaurants from '../../model/associate/getAssociatesRestaurants';
import updateMenuDaysWithAssociateChanges from '../../model/menuDay/updateMenuDaysWithAssociateChanges';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import sortRestaurants from '../../model/restaurant/sortRestaurants';
import saveImageToDatabase from '../../model/images/saveImageToDatabase';
import ImageEditor from '../imageEditor/ImageEditor';
import Checkbox from '@material-ui/core/Checkbox';

import {
    noSelectedRestaurant,
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
        associatesRestaurants,
        restaurantId,
        idToken,
        customId,
        setAssociateDialogOpen,
        setAssociateDialogDataItem,
        setAssociateDialogData,
        associateDialogOpen,
        setRestaurantAssociates,
        setAssociate,
        associate,
        setAssociatesRestaurants,
        setRestaurantId,
        setRestaurantMenuItems,
        setRestaurantMenuDays,
        restaurantMenuDays,
        setLoading,
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
        showEmail,
        hideAssociate,
    } = dataAndMethodsContext.associateDialogData;

    const {
        deleteFileName,
        imageUrl,
        blob,
        editMode,
    } = dataAndMethodsContext.imageEditorData;

    // edit logged in associate save to database
    // get associates for restaurant from database
    // update restaurant with these new associates and save to database
    // update state for associate, restaurantAssociates
    const saveAssociateEditMe = async () => {
        let myAssociate = {};
        myAssociate.id = id;
        myAssociate.firstName = firstName
        myAssociate.lastName = lastName
        myAssociate.jobTitle = jobTitle
        myAssociate.bio = bio
        myAssociate.email = email
        myAssociate.restaurantIdsJSON = restaurantIdsJSON;
        myAssociate.accessLevel = accessLevel;
        myAssociate.imageUrl = imageUrl;
        myAssociate.hideAssociate = hideAssociate;
        await saveImageToDatabase(deleteFileName, imageUrl, blob, editMode, idToken, customId)
        await putAssociate(myAssociate, idToken, customId)
        setAssociate(myAssociate);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        if (myRestaurant) {
            let myAssociates = await getRestaurantAssociates(myRestaurant, idToken, customId)
            myRestaurant.associatesJSON = myAssociates;
            await putRestaurant(myRestaurant, idToken, customId)
            myAssociates = await sortAssociates(myAssociates, associate);
            setRestaurantAssociates(myAssociates)
        }
    };

    // create myAssociate and poplulate it with the dialog's entries.
    // check if this change still leaves admins for restaurant if not message user
    // if access level not set to none get associate from database 
    // with a valid email, if the record does not exist message the user with an error.
    // if got the associate from the database update with restaurant id remove the old associate from the restaurant
    // then put the updated associate in the restaurant associates array
    // save the restaurant to the database
    // get all the restaurant associates from the database
    // sort associates and update state
    const saveAssociateEdit = async () => {
        let myAssociate = {};
        myAssociate.id = id;
        myAssociate.firstName = firstName;
        myAssociate.lastName = lastName;
        myAssociate.jobTitle = jobTitle;
        myAssociate.bio = bio;
        myAssociate.email = email;
        myAssociate.restaurantIdsJSON = restaurantIdsJSON;
        myAssociate.accessLevel = accessLevel;
        myAssociate.imageUrl = imageUrl;
        myAssociate.hideAssociate = hideAssociate;
        await saveImageToDatabase(deleteFileName, imageUrl, blob, editMode, idToken, customId)
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
        if (!testPutAssociateInRestaurant(myRestaurant, myAssociate)) {
            setMessage('There needs to be at least one associate with admin rights per restaurant.');
            return null;
        }
        if (myAssociate.accessLevel === 'none') {
            const tempAssociate = await getAssociate(myAssociate.id, idToken, customId)
            if (tempAssociate) {
                myAssociate = await removeRestaurantFromIds(tempAssociate, restaurantId)
                await putAssociate(myAssociate, idToken, customId)
                myAssociate.firstName = firstName;
                myAssociate.lastName = lastName;
                myAssociate.jobTitle = jobTitle;
                myAssociate.bio = bio;
                myAssociate.email = '';
                myAssociate.restaurantIdsJSON = restaurantIdsJSON;
                myAssociate.accessLevel = accessLevel;
                myAssociate.imageUrl = imageUrl;
                myAssociate.hideAssociate = hideAssociate;
            }
        } else {
            if (!isEmail(email)) {
                setMessage('A valid email is required.');
                return null;
            }
            if (dialogType === "Edit") {
                myRestaurant = await removeAssociateFromRestaurant(myRestaurant, id);
            }
            const associateExists = getAssociateFromRestaurant(myRestaurant, email)
            if (associateExists) {
                setMessage('That associate already exists in restaurant.');
                return null;
            }
            myAssociate = await getAssociate(email, idToken, customId)
            if (!myAssociate) {
                setMessage('No associate account with that email address exists.');
                return null;
            } else {
                myAssociate.accessLevel = accessLevel;
                myAssociate.email = email;
                myAssociate = await putRestaurantInAssociate(myAssociate, restaurantId);
                await putAssociate(myAssociate, idToken, customId);
            }
        }
        myAssociate.hideAssociate = hideAssociate;
        myRestaurant = putAssociateInRestaurant(myRestaurant, myAssociate);
        await putRestaurant(myRestaurant, idToken, customId);
        // now get logged in associate and update associates restaurants
        const newAssociate = await getAssociate(associate.id, idToken, customId)
        let newAssociatesRestaurants = await getAssociatesRestaurants(newAssociate)
        newAssociatesRestaurants = await sortRestaurants(newAssociatesRestaurants)
        setAssociate(newAssociate)
        setAssociatesRestaurants(newAssociatesRestaurants)
        let myAssociates = await getRestaurantAssociates(myRestaurant, idToken, customId);
        myAssociates = await sortAssociates(myAssociates, newAssociate);
        setRestaurantAssociates(myAssociates);
        let myNewMenuDays = await updateMenuDaysWithAssociateChanges(restaurantMenuDays, myAssociates, idToken, customId)
        setRestaurantMenuDays(myNewMenuDays)
        for (let i = 0; i < myAssociates.length; i++) {
            if (myAssociates[i].id === associate.id) {
                if (myAssociates[i].accessLevel === 'none') {
                    setRestaurantMenuItems([]);
                    setRestaurantMenuDays([]);
                    setRestaurantAssociates([]);
                    setRestaurantId(noSelectedRestaurant)
                    const myAssociatesRestaurants = await getAssociatesRestaurants(myAssociate);
                    newAssociatesRestaurants = await sortRestaurants(newAssociatesRestaurants);
                    setAssociatesRestaurants(myAssociatesRestaurants);
                    return true;
                }
            }
        }
        return true;
    };

    const handleClose = () => {
        setAssociateDialogOpen(false);
    };

    const handleSave = async () => {
        switch (dialogType) {
            case "EditMe":
                saveAssociateEditMe()
                break;
            case "Edit":
                const success = await saveAssociateEdit()
                if (!success) { return null; }
                break;
            case "Add":
                const successAdd = await saveAssociateEdit()
                if (!successAdd) { return null; }
                break;
            default:
        }
        await forceUpdate();
        setAssociateDialogOpen(false);
    };

    const changeFirstName = (e) => {
        setAssociateDialogDataItem('firstName', e.target.value);
    };

    const changeLastName = (e) => {
        setAssociateDialogDataItem('lastName', e.target.value);
    };

    const changeJobTitle = (e) => {
        setAssociateDialogDataItem('jobTitle', e.target.value);
    };

    const changeBio = (e) => {
        setAssociateDialogDataItem('bio', e.target.value);
    };

    const changeEmail = (e) => {
        setAssociateDialogDataItem('email', e.target.value);
    };

    const changeHideAssociate = (e) => {
        setAssociateDialogDataItem('hideAssociate', e.target.checked);
    };

    const handleLowerCase = (e) => {
        let myAssociateDialogData = JSON.parse(JSON.stringify(dataAndMethodsContext.associateDialogData))
        myAssociateDialogData.firstName = myAssociateDialogData.firstName.toLowerCase()
        myAssociateDialogData.lastName = myAssociateDialogData.lastName.toLowerCase()
        myAssociateDialogData.jobTitle = myAssociateDialogData.jobTitle.toLowerCase()
        myAssociateDialogData.bio = myAssociateDialogData.bio.toLowerCase()
        setAssociateDialogData(myAssociateDialogData)
    };

    const forceUpdate = async () => {
        if (restaurantId !== noSelectedRestaurant) {
            setRestaurantAssociates([]);
            setLoading(true);
            let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
            let myRestaurantAssociates = await getRestaurantAssociates(myRestaurant);
            myRestaurantAssociates = await sortAssociates(myRestaurantAssociates, associate);
            setRestaurantAssociates(myRestaurantAssociates);
            setLoading(false);
        }
    }

    const handleAccessLevelChange = (e) => {
        setAssociateDialogDataItem('accessLevel', e.target.value);
    };

    const setMessage = (myMessage) => {
        setAssociateDialogDataItem('message', myMessage);
    };


    let dialogTitle = '';

    if (dialogType === "EditMe") { dialogTitle = 'Edit my details' };
    if (dialogType === "Edit") { dialogTitle = 'Edit associate details' };
    if (dialogType === "Add") { dialogTitle = 'Add associate details' };

    let loggedInUser = false;
    let loggedInUserMessage = '';
    if (associate.id === id) {
        loggedInUser = true;
        loggedInUserMessage = 'Logged in user'
    }

    let showDetails = (accessLevel === "none" && associate.id !== id) || dialogType === "EditMe" ? true : false;

    return (
        <div>
            <Dialog className={classes.root} open={associateDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogTitle}</DialogTitle>
                <DialogContent>
                    <p>{loggedInUserMessage}</p>
                    {showDetails && <TextField
                        id="firstName"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={firstName}
                        onChange={changeFirstName}
                    />}
                    {showDetails && <TextField
                        id="lastName"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={lastName}
                        onChange={changeLastName}
                    />}
                    {showDetails && <TextField
                        id="jobTitle"
                        label="Job title"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={jobTitle}
                        onChange={changeJobTitle}
                    />}
                    {/* {showDetails && <p> */}
                    <Checkbox
                        checked={hideAssociate}
                        onChange={changeHideAssociate}
                        name="hideAssociate"
                        color="primary"
                    />
                    {'Hide associate from public'}
                    {/* </p>} */}
                    {showDetails && <p component="legend">Profile Image</p>}
                    {showDetails && <ImageEditor />}
                    {showDetails && <TextField
                        id="bio"
                        label="Bio"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="4"
                        value={bio}
                        onChange={changeBio}
                    />}
                    {dialogType !== "EditMe" && <p component="legend">Access level</p>}
                    {dialogType !== "EditMe" && <RadioGroup aria-label="gender" name="gender1" value={accessLevel} onChange={handleAccessLevelChange}>
                        <FormControlLabel value="none" control={<Radio color="primary" />} label="No Access" />
                        <FormControlLabel value="read" control={<Radio color="primary" />} label="Read" />
                        <FormControlLabel value="edit" control={<Radio color="primary" />} label="Edit" />
                        <FormControlLabel value="admin" control={<Radio color="primary" />} label="Admin" />
                    </RadioGroup>}
                    {((accessLevel === "read" || accessLevel === "edit" || accessLevel === "admin") && dialogType !== "EditMe" && !loggedInUser && showEmail) && <TextField
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
                    <Button onClick={handleLowerCase} color="default">
                        Lowercase
                    </Button>
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