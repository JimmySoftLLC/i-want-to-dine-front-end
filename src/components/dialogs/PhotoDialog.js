import React, { useContext, useState, useCallback } from 'react';
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
import convertFileToDataUrl from '../../model/images/convertFileToDataUrl';
import downloadImageAPI from '../../model/images/downloadImageAPI';
import uploadImageStorage from '../../model/images/uploadImageStorage';
import compressImage from '../../model/images/compressImage';
import convertDataUrlToBlob from '../../model/images/convertDataUrlToBlob';
import deleteImageAPI from '../../model/images/deleteImageAPI';
import fileNameFromUrl from '../../model/files/fileNameFromUrl';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

import { v4 as uuidv4 } from 'uuid';

import {
    noSelectedRestaurant,
    blankImage,
    imagePath,
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
    const [upImg, setUpImg] = useState();
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 });
    const [blob, setBlob] = useState();
    const [fileValue, setFileValue] = useState('');

    const {
        restaurantId,
        idToken,
        customId,
        setPhotoDialogOpen,
        setPhotoDialogDataItem,
        setPhotoDialogData,
        photoDialogOpen,
        setRestaurantPhotos,
        setPhoto,
        setLoading,
        setLoadingDialog,
        loadingDialog,
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
        deleteFileValue,
    } = dataAndMethodsContext.photoDialogData;

    const savePhotoEditMe = async () => {
        let myPhoto = {};
        myPhoto.id = id;
        myPhoto.src = src
        myPhoto.width = width
        myPhoto.height = height
        myPhoto.caption = caption
        myPhoto.restaurantid = restaurantid
        myPhoto.pictureEditMode = pictureEditMode;
        await saveImageToDatabase()
        //await putPhoto(myPhoto, idToken, customId)
        setPhoto(myPhoto);
    };

    const savePhotoEdit = async () => {
        let myPhoto = {};
        myPhoto.id = id;
        myPhoto.src = src
        myPhoto.width = width
        myPhoto.height = height
        myPhoto.caption = caption
        myPhoto.restaurantid = restaurantid
        myPhoto.pictureEditMode = pictureEditMode;
        await saveImageToDatabase()
        //await putPhoto(myPhoto, idToken, customId)
        setPhoto(myPhoto);
    };

    const handleClose = () => {
        resetStates()
        setPhotoDialogOpen(false);
    };

    const handleSave = async () => {
        switch (dialogType) {
            case "EditMe":
                savePhotoEditMe()
                break;
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
        resetStates()
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

    const changePictureMode = (myPictureEditMode) => {
        setPhotoDialogDataItem('pictureEditMode', myPictureEditMode);
    };

    const downloadImageFromUrl = async () => {
        setLoadingDialog(true)
        let myDataUrl = await downloadImageAPI(src, idToken, customId);
        setUpImg(myDataUrl);
        let myBlob = await convertDataUrlToBlob(myDataUrl, 'newFile.jpeg')
        setBlob(myBlob)
        setLoadingDialog(false)
    }

    const getImageFromFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let myNewDialogData = JSON.parse(JSON.stringify(dataAndMethodsContext.photoDialogData))
            if (src !== blankImage) {
                myNewDialogData.deleteFileValue = '';
            }
            let myDataUrl = await convertFileToDataUrl(e.target.files[0]);
            setUpImg(myDataUrl)
            let myBlob = await convertDataUrlToBlob(myDataUrl, 'newFile.jpeg')
            setBlob(myBlob)
            if (src === blankImage) {
                let myNewId = uuidv4()
                myNewDialogData.src = imagePath + myNewId + ".jpg"
            }
            myNewDialogData.pictureEditMode = 'edit'
            await setPhotoDialogData(myNewDialogData);
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
        const blob = await new Promise(resolve => canvas.toBlob(resolve), 'image/jpeg');
        blob.lastModifiedDate = new Date();
        blob.name = fileName;
        setBlob(blob)
    };

    const handleEditOrCrop = async () => {
        switch (pictureEditMode) {
            case 'none':
                downloadImageFromUrl()
                changePictureMode('edit')
                break;
            case 'edit':
                try {
                    setUpImg(window.URL.createObjectURL(blob));
                    setCrop({ unit: '%', width: 100, aspect: 1 })
                } catch (error) {
                    console.log(error)
                }
                break;
            default:
                break;
        }
    };

    const saveImageToDatabase = async () => {
        if (deleteFileValue) {
            await deleteImageAPI(deleteFileValue, idToken, customId)
        }
        if (pictureEditMode !== "none" && src !== blankImage) {
            try {
                const compressedFile = await compressImage(blob);
                let myFileName = fileNameFromUrl(src)
                if (compressedFile) {
                    await uploadImageStorage(blob, fileNameFromUrl(myFileName))
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const forceUpdate = async () => {
        if (restaurantId !== noSelectedRestaurant) {
            setRestaurantPhotos([]);
            setLoading(true);
            // let myRestaurant = getRestaurantById(photosRestaurants, restaurantId);
            setLoading(false);
        }
    }

    const resetStates = async () => {
        setCrop({ unit: '%', width: 100, aspect: 1 })
        setUpImg();
        setImgRef();
        setBlob();
        setFileValue('');
    };

    const handleDelete = async () => {
        let myNewDialogData = JSON.parse(JSON.stringify(dataAndMethodsContext.photoDialogData))
        if (myNewDialogData.src !== blankImage) {
            myNewDialogData.deleteFileValue = myNewDialogData.src
        }
        myNewDialogData.src = blankImage
        myNewDialogData.pictureEditMode = 'none'
        await setPhotoDialogData(myNewDialogData);
        resetStates()
    }

    let dialogTitle = '';

    if (dialogType === "EditMe") { dialogTitle = 'Edit my details' };
    if (dialogType === "Edit") { dialogTitle = 'Edit photo details' };
    if (dialogType === "Add") { dialogTitle = 'Add photo details' };

    const myTextStyle = {
        fontSize: "1.5rem",
        color: "primary"
    }

    const myEditCropIcon = pictureEditMode === "none" ? "fas fa-edit" : "fas fa-crop-alt"

    const canEditImages = src === blankImage ? false : true

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
                    {loadingDialog && <CircularIndeterminate />}
                    {(src !== undefined) && <img
                        style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                        src={src}
                        alt=''
                    />}
                    {(upImg && pictureEditMode !== 'none') && <ReactCrop style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                        src={upImg}
                        onImageLoaded={onLoad}
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={makeClientCrop}
                    />}
                    <p></p>
                    <input
                        accept="image/*"
                        className={classes.input}
                        hidden
                        id="raised-button-file"
                        multiple
                        type="file"
                        value={fileValue}
                        onChange={getImageFromFile}
                    />
                    <label htmlFor="raised-button-file">
                        <Button component="span" className={classes.button} style={myTextStyle}>
                            <i className="fas fa-file-upload"></i>
                        </Button>
                    </label>
                    {canEditImages && <Button onClick={() => handleEditOrCrop()} style={myTextStyle}>
                        <i className={myEditCropIcon}></i>
                    </Button>}
                    {canEditImages && <Button onClick={() => handleDelete()} style={myTextStyle}>
                        <i className="fas fa-trash"></i>
                    </Button>}
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