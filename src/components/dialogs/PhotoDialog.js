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
import ImageEditor from '../imageEditor/ImageEditor';

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
        // setPhotoDialogData,
        photoDialogOpen,
        setRestaurantPhotos,
        setLoading,
    } = dataAndMethodsContext;

    const {
        id,
        src,
        width,
        height,
        caption,
        restaurantid,
        pictureEditMode,
        dialogType,
    } = dataAndMethodsContext.photoDialogData;

    const savePhotoEdit = async () => {
        let myPhoto = {};
        myPhoto.id = id;
        myPhoto.src = src
        myPhoto.width = width
        myPhoto.height = height
        myPhoto.caption = caption
        myPhoto.restaurantid = restaurantid
        myPhoto.pictureEditMode = pictureEditMode;
        // await saveImageToDatabase()
    };

    const handleClose = () => {
        // resetStates()
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
        // resetStates()
        setPhotoDialogOpen(false);
    };

    const changeWidth = (e) => {
        setPhotoDialogDataItem('width', e.target.value);
    };

    const changeHeight = (e) => {
        setPhotoDialogDataItem('height', e.target.value);
    };

    const changeCaption = (e) => {
        setPhotoDialogDataItem('caption', e.target.value);
    };

    // const saveImageToDatabase = async () => {
    //     if (deleteFileValue) {
    //         await deleteImageAPI(deleteFileValue, idToken, customId)
    //     }
    //     if (pictureEditMode !== "none" && src !== blankImage) {
    //         try {
    //             const compressedFile = await compressImage(blob);
    //             let myFileName = fileNameFromUrl(src)
    //             if (compressedFile) {
    //                 await uploadImageStorage(blob, fileNameFromUrl(myFileName))
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }

    const forceUpdate = async () => {
        if (restaurantId !== noSelectedRestaurant) {
            setRestaurantPhotos([]);
            setLoading(true);
            // let myRestaurant = getRestaurantById(photosRestaurants, restaurantId);
            setLoading(false);
        }
    }

    // const handleDelete = async () => {
    //     let myNewDialogData = JSON.parse(JSON.stringify(dataAndMethodsContext.photoDialogData))
    //     if (myNewDialogData.src !== blankImage) {
    //         myNewDialogData.deleteFileValue = myNewDialogData.src
    //     }
    //     myNewDialogData.src = blankImage
    //     myNewDialogData.pictureEditMode = 'none'
    //     await setPhotoDialogData(myNewDialogData);
    //     // resetStates()
    // }

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