import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import putRestaurant from '../../model/restaurant/putRestaurant';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import deletePhotoFromRestaurant from '../../model/restaurant/deletePhotoFromRestaurant';
import sortRestaurants from '../../model/restaurant/sortRestaurants';
import getAssociatesRestaurants from '../../model/associate/getAssociatesRestaurants';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const PhotoCardInventory = ({ Photo }) => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantPhotos,
        setPhotoDialogData,
        setPhotoDialogOpen,
        idToken,
        customId,
        setRestaurantPhotos,
        restaurantId,
        setImageEditorData,
        associatesRestaurants,
        associate,
        setAssociatesRestaurants,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const photoEditClick = (mySrc) => {
        for (let i = 0; i < restaurantPhotos.length; i++) {
            if (mySrc === restaurantPhotos[i].src) {
                let myEditItem = {
                    src: restaurantPhotos[i].src,
                    caption: restaurantPhotos[i].caption,
                    restaurantid: restaurantPhotos[i].restaurantid,
                    dialogType: 'Edit',
                }
                setPhotoDialogData(myEditItem);
                let myImageEditorItem = {
                    imageUrl: restaurantPhotos[i].src,
                    editMode: 'none',
                    deleteFileName: '',
                    width: 1,
                    height: 1,
                    aspectRatio: 1,
                    blob: '',
                    showDelete: false,
                }
                setImageEditorData(myImageEditorItem);
                setPhotoDialogOpen(true);
                break;
            }
        }
    };

    const deletePhotoClick = (mySrc) => {
        console.log(mySrc)
        for (let i = 0; i < restaurantPhotos.length; i++) {
            if (mySrc === restaurantPhotos[i].src) {
                setDeleteConfirmDialog(true,
                    restaurantPhotos[i].caption,
                    'deletePhoto',
                    mySrc,
                    deletePhotoFromRestaurantById);
                break;
            }
        }
    };

    const deletePhotoFromRestaurantById = async (mySrc) => {
        // delete photo from restaurant and save restaurant to database
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        myRestaurant = await deletePhotoFromRestaurant(mySrc, myRestaurant, idToken, customId)
        await putRestaurant(myRestaurant, idToken, customId)
        let newAssociatesRestaurants = await getAssociatesRestaurants(associate)
        newAssociatesRestaurants = await sortRestaurants(newAssociatesRestaurants)
        setAssociatesRestaurants(newAssociatesRestaurants)
        setRestaurantPhotos(myRestaurant.photosJSON)
    }

    // only photos who can admin to edit photo accounts
    // let canEdit = false;
    // associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "edit" ? canEdit = true : canEdit = false
    let canAdmin = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

    return (
        <div className='card  all-center'>
            {Photo.src !== undefined && <div>
                <img
                    src={Photo.src}
                    alt=''
                    className='round-img'
                    style={{ width: '80px', height: '80px' }}
                />
            </div>}
            <div>
                <h4>{Photo.caption}
                </h4>
                <div className={classes.root} >
                    {canAdmin && <Button variant="outlined" color="primary" onClick={() => photoEditClick(Photo.src)}>
                        <i className={"fas fa-edit"}></i>
                    </Button>}
                    {canAdmin && <Button variant="outlined" color="primary" onClick={() => deletePhotoClick(Photo.src)}>
                        <i className="fas fa-trash"></i>
                    </Button>}
                </div>
            </div>
        </div>
    );
};

export default PhotoCardInventory;