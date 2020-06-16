import React, { useContext, useState, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import convertFileToDataUrl from '../../model/images/convertFileToDataUrl';
import downloadImageAPI from '../../model/images/downloadImageAPI';
import convertDataUrlToBlob from '../../model/images/convertDataUrlToBlob';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import detectText from '../../model/images/detectText';

import { v4 as uuidv4 } from 'uuid';

import {
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

const ImageEditor = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const [upImg, setUpImg] = useState();
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 1 });

    const {
        idToken,
        customId,
        setLoadingDialog,
        loadingDialog,
        setImageEditorDataItem,
        setImageEditorData,
    } = dataAndMethodsContext;

    const {
        imageUrl,
        editMode,
        aspectRatio,
        blob,
        showDelete,
    } = dataAndMethodsContext.imageEditorData;

    const downloadImageFromUrl = async () => {
        setLoadingDialog(true)
        let myDataUrl = await downloadImageAPI(imageUrl, idToken, customId);
        setUpImg(myDataUrl);
        let myBlob = await convertDataUrlToBlob(myDataUrl, 'newFile.jpeg')
        let myImageEditorData = JSON.parse(JSON.stringify(dataAndMethodsContext.imageEditorData))
        myImageEditorData.blob = myBlob
        myImageEditorData.editMode = 'edit'
        myImageEditorData.saveFile = true
        setImageEditorData(myImageEditorData)
        setLoadingDialog(false)
    }

    const getImageFromFile = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            let myImageEditorData = JSON.parse(JSON.stringify(dataAndMethodsContext.imageEditorData))
            if (imageUrl !== blankImage) {
                myImageEditorData.deleteFileName = '';
            }
            let myDataUrl = await convertFileToDataUrl(e.target.files[0]);
            setUpImg(myDataUrl)
            let myBlob = await convertDataUrlToBlob(myDataUrl, 'newFile.jpeg')
            myImageEditorData.blob = myBlob
            const myText = await detectText(myBlob);
            console.log(myText);
            if (imageUrl === blankImage || imageUrl === "") {
                let myNewId = uuidv4()
                myImageEditorData.imageUrl = imagePath + myNewId + ".jpg"
            }
            myImageEditorData.editMode = 'edit'
            myImageEditorData.saveFile = true
            await setImageEditorData(myImageEditorData);
            setCrop({ unit: '%', width: 100, aspect: aspectRatio })
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
        setImageEditorDataItem('blob', blob)
    };

    const handleEditOrCrop = async () => {
        switch (editMode) {
            case 'none':
                downloadImageFromUrl()
                setImageEditorDataItem('editMode', 'edit');
                setCrop({ unit: '%', width: 100, aspect: aspectRatio })
                break;
            case 'edit':
                try {
                    setUpImg(window.URL.createObjectURL(blob));
                    setCrop({ unit: '%', width: 100, aspect: aspectRatio })
                    setImageEditorDataItem('saveFile', true)
                } catch (error) {
                    console.log(error)
                }
                break;
            default:
                break;
        }
    };

    const cropSize = async (mySize) => {
        let myImageEditorData = JSON.parse(JSON.stringify(dataAndMethodsContext.imageEditorData))
        switch (mySize) {
            case '1_1':
                myImageEditorData.width = 1
                myImageEditorData.height = 1
                myImageEditorData.aspectRatio = 1
                break;
            case '4_3':
                myImageEditorData.width = 4
                myImageEditorData.height = 3
                myImageEditorData.aspectRatio = 4 / 3
                break;
            case '3_4':
                myImageEditorData.width = 3
                myImageEditorData.height = 4
                myImageEditorData.aspectRatio = 3 / 4
                break;
            case '16_9':
                myImageEditorData.width = 16
                myImageEditorData.height = 9
                myImageEditorData.aspectRatio = 16 / 9
                break;
            default:
        }
        await setImageEditorData(myImageEditorData)
        setCrop({ unit: '%', width: 100, aspect: myImageEditorData.aspectRatio })
    }

    const handleDelete = async () => {
        let myImageEditorData = JSON.parse(JSON.stringify(dataAndMethodsContext.imageEditorData))
        if (myImageEditorData.imageUrl !== blankImage) {
            myImageEditorData.deleteFileName = myImageEditorData.imageUrl
        }
        myImageEditorData.imageUrl = blankImage
        myImageEditorData.editMode = 'none'
        await setImageEditorData(myImageEditorData);
    }

    const myTextStyle = {
        fontSize: "1.5rem",
        color: "primary"
    }

    const myEditCropIcon = editMode === "none" ? "fas fa-edit" : "fas fa-crop-alt"
    const canEditImages = imageUrl === blankImage || imageUrl === "" ? false : true

    return (
        <div>
            {loadingDialog && <CircularIndeterminate />}
            {(!loadingDialog && editMode === 'none' && imageUrl !== undefined) && <img
                style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                src={imageUrl}
                alt=''
            />}
            {(upImg && editMode !== 'none') && <ReactCrop style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
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
                onChange={e => getImageFromFile(e)}
            />
            <label htmlFor="raised-button-file">
                <Button component="span" className={classes.button} style={myTextStyle}>
                    <i className="fas fa-file-upload"></i>
                </Button>
            </label>
            {canEditImages && <Button onClick={() => handleEditOrCrop()} style={myTextStyle}>
                <i className={myEditCropIcon}></i>
            </Button>}
            {(canEditImages && showDelete) && <Button onClick={() => handleDelete()} style={myTextStyle}>
                <i className="fas fa-trash"></i>
            </Button>}
            {(editMode === "edit" && !showDelete) && <Button onClick={() => cropSize('1_1')} style={myTextStyle}>
                1:1
            </Button>}
            {(editMode === "edit" && !showDelete) && <Button onClick={() => cropSize('3_4')} style={myTextStyle}>
                3:4
            </Button>}
            {(editMode === "edit" && !showDelete) && <Button onClick={() => cropSize('4_3')} style={myTextStyle}>
                4:3
            </Button>}
            {(editMode === "edit" && !showDelete) && <Button onClick={() => cropSize('16_9')} style={myTextStyle}>
                16:9
            </Button>}
        </div>
    );
}

export default ImageEditor;