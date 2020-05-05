import React, { useContext, useState, useCallback, Fragment } from 'react';
import ReactCrop from 'react-image-crop';
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
import getRestaurantFromArray from '../../model/restaurant/getRestaurantFromArray';
import getAssociatesRestaurants from '../../model/associate/getAssociatesRestaurants';
import updateMenuDaysWithAssociateChanges from '../../model/menuDay/updateMenuDaysWithAssociateChanges';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import imageCompression from 'browser-image-compression';

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
    const [upImg, setUpImg] = useState();
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 9 / 9 });
    const [previewUrl, setPreviewUrl] = useState();

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
        setAssociatesRestaurants,
        setRestaurantId,
        setRestaurantMenuItems,
        setRestaurantMenuDays,
        restaurantMenuDays,
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
        imageUrl,
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
                const success = await saveAssociateEdit()
                if (!success) { return null; }
                break;
            case "Add":
                const successAdd = await saveAssociateEdit()
                if (!successAdd) { return null; }
                break;
            default:
        }
        setAssociateDialogOpen(false);
    };

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
        await putAssociate(myAssociate, idToken, customId)
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        if (myRestaurant) {
            let myAssociates = await getRestaurantAssociates(myRestaurant, idToken, customId)
            myRestaurant.associatesJSON = myAssociates;
            await putRestaurant(myRestaurant, idToken, customId)
            myAssociates = await sortAssociates(myAssociates, associate);
            setRestaurantAssociates(myAssociates)
        }
        setAssociate(myAssociate);
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
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId);
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
        myRestaurant = putAssociateInRestaurant(myRestaurant, myAssociate);
        await putRestaurant(myRestaurant, idToken, customId);
        // now get logged in associate and update associates restaurants
        const newAssociate = await getAssociate(associate.id, idToken, customId)
        const newAssociatesRestaurants = await getAssociatesRestaurants(newAssociate)
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
                    setAssociatesRestaurants(myAssociatesRestaurants);
                    return true;
                }
            }
        }
        return true;
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

    const changeImageUrl = (e) => {
        setAssociateDialogDataItem('imageUrl', e.target.value);
    };

    // const changeImage = async (e) => {
    //     console.log(e.target.files[0].name)
    //     await readURL(e);
    //     //setAssociateDialogDataItem('imageUrl', e.target.files[0].name);
    // };

    // const readURL = async (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         var reader = new FileReader();
    //         reader.onload = function (e) {
    //             setMyUrl(e.target.result);
    //         }
    //         reader.readAsDataURL(e.target.files[0]);
    //         await handleImageUpload(e);
    //     }
    // }

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onLoad = useCallback(img => {
        setImgRef(img);
    }, []);

    const makeClientCrop = async crop => {
        if (imgRef && crop.width && crop.height) {
            createCropPreview(imgRef, crop, 'newFile.jpeg');
        }
    };

    const createCropPreview = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                console.log(fileName, blob);
                window.URL.revokeObjectURL(previewUrl);
                setPreviewUrl(window.URL.createObjectURL(blob));
            }, 'image/jpeg');
        });
    };


    // const handleImageUpload = async (event) => {
    //     const imageFile = event.target.files[0];
    //     console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    //     console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    //     const options = {
    //         maxSizeMB: 1,
    //         maxWidthOrHeight: 1920,
    //         useWebWorker: true
    //     }
    //     try {
    //         const compressedFile = await imageCompression(imageFile, options);
    //         console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    //         console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    //         //   await uploadToServer(compressedFile); // write your own logic
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    function handleImageUpload(event) {

        var imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        var options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

                //return uploadToServer(compressedFile); // write your own logic
            })
            .catch(function (error) {
                console.log(error.message);
            });
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

    return (
        <div>
            <Dialog className={classes.root} open={associateDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogTitle}</DialogTitle>
                <DialogContent>
                    <p>{loggedInUserMessage}</p>
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
                        id="imageUrl"
                        label="Image URL"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={imageUrl}
                        onChange={changeImageUrl}
                    />}
                    {upImg && <ReactCrop style={{ display: 'block', marginTop: '0.5rem', marginBottom: '0.5rem' }}
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={makeClientCrop}
                    />}
                    {/* {previewUrl && <img alt="Crop preview" src={previewUrl} />} */}

                    <input
                        accept="image/*"
                        className={classes.input}
                        hidden
                        id="raised-button-file"
                        multiple
                        type="file"
                        // onChange={changeImage}
                        onChange={onSelectFile}
                    />
                    <label htmlFor="raised-button-file">
                        <Button component="span" className={classes.button}>
                            Upload
                    </Button>
                    </label>

                    {((accessLevel === "none" && associate.id !== id) || dialogType === "EditMe") && <TextField
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

                    {dialogType !== "EditMe" && <FormLabel component="legend">Access level</FormLabel>}
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