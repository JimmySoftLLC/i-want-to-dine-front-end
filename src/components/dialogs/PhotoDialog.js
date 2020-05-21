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
import saveImageToDatabase from '../../model/images/saveImageToDatabase';
import ImageEditor from '../imageEditor/ImageEditor';
import putPhotoInRestaurant from '../../model/photo/putPhotoInRestaurant';
import putRestaurant from '../../model/restaurant/putRestaurant';
import getRestaurantById from '../../model/restaurant/getRestaurantById';

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

const PhotoDialog = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const {
        restaurantId,
        setPhotoDialogOpen,
        setPhotoDialogDataItem,
        photoDialogOpen,
        idToken,
        customId,
        associatesRestaurants,
        setLoading,
        setRestaurantPhotos,
        setImageEditorDataItem,
    } = dataAndMethodsContext;

    const {
        width,
        height,
        caption,
        dialogType,
    } = dataAndMethodsContext.photoDialogData;

    const {
        deleteFileName,
        imageUrl,
        blob,
        editMode,
    } = dataAndMethodsContext.imageEditorData;

    const savePhotoEdit = async () => {
        let myPhoto = {
            src: imageUrl,
            width: width,
            height: height,
            caption: caption,
            restaurantid: restaurantId,
        };
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        if (myRestaurant) {
            myRestaurant = putPhotoInRestaurant(myRestaurant, myPhoto)
            await putRestaurant(myRestaurant, idToken, customId)
            await saveImageToDatabase(deleteFileName, imageUrl, blob, editMode, idToken, customId)
        }
        return true;
    };

    const handleClose = () => {
        setPhotoDialogOpen(false);
    };

    const handleSave = async () => {
        switch (dialogType) {
            case "Edit":
                const success = await savePhotoEdit()
                if (!success) { return null; }
                break;
            case "Add":
                const successAdd = await savePhotoEdit()
                if (!successAdd) { return null; }
                break;
            default:
        }
        await forceUpdate();
        setPhotoDialogOpen(false);
    };

    const changeWidth = (e) => {
        setPhotoDialogDataItem('width', e.target.value);
        setImageEditorDataItem('aspectRatio', e.target.value / height)
    };

    const changeHeight = (e) => {
        setPhotoDialogDataItem('height', e.target.value);
        setImageEditorDataItem('aspectRatio', width / e.target.value)
    };

    const changeCaption = (e) => {
        setPhotoDialogDataItem('caption', e.target.value);
    };

    const forceUpdate = async () => {
        if (restaurantId !== noSelectedRestaurant) {
            setRestaurantPhotos([]);
            setLoading(true);
            let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
            setRestaurantPhotos(myRestaurant.photosJSON)
            setLoading(false);
        }
    }

    let dialogTitle = '';

    if (dialogType === "EditMe") { dialogTitle = 'Edit my details' };
    if (dialogType === "Edit") { dialogTitle = 'Edit photo details' };
    if (dialogType === "Add") { dialogTitle = 'Add photo details' };

    return (
        <div>
            <Dialog className={classes.root} open={photoDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogTitle}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="width"
                        label="Width"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={width}
                        onChange={changeWidth}
                    />
                    <TextField
                        id="height"
                        label="Height"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={height}
                        onChange={changeHeight}
                    />
                    <TextField
                        id="caption"
                        label="Caption"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={caption}
                        onChange={changeCaption}
                    />
                    <p component="legend">Photo</p>
                    <ImageEditor />
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

export default PhotoDialog;