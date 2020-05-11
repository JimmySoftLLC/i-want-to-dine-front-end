import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';
import sortEntertainmentItems from '../../model/entertainmentItem/sortEntertainmentItems';
import deleteEntertainmentItemFromRestaurant from '../../model/entertainmentItem/deleteEntertainmentItemFromRestaurant';
import updateMenuDaysWithEntertainmentItemChanges from '../../model/menuDay/updateMenuDaysWithEntertainmentItemChanges';
import dateString from '../../model/dateString';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const EntertainmentItemCardInventory = ({ entertainmentItem }) => {
    const classes = useStyles();

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantEntertainmentItems,
        setEntertainmentItemDialogData,
        setEntertainmentItemDialogOpen,
        idToken,
        customId,
        setRestaurantEntertainmentItems,
        associatesRestaurants,
        restaurantId,
        myStates,
        associate,
        setRestaurantMenuDays,
        restaurantMenuDays,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickEntertainmentItemEdit = (entertainmentItemId) => {
        for (let i = 0; i < restaurantEntertainmentItems.length; i++) {
            if (entertainmentItemId === restaurantEntertainmentItems[i].id) {
                let myEditItem = {
                    id: restaurantEntertainmentItems[i].id,
                    title: restaurantEntertainmentItems[i].title,
                    description: restaurantEntertainmentItems[i].description,
                    timeFrom: restaurantEntertainmentItems[i].timeFrom,
                    timeTo: restaurantEntertainmentItems[i].timeTo,
                    imageUrl: restaurantEntertainmentItems[i].imageUrl,
                    categoryJSON: restaurantEntertainmentItems[i].categoryJSON,
                    dialogType: 'Edit',
                }
                setEntertainmentItemDialogData(myEditItem);
                setEntertainmentItemDialogOpen(true);
                break;
            }
        }
    };

    const handleClickEntertainmentItemCopy = (entertainmentItemId) => {
        for (let i = 0; i < restaurantEntertainmentItems.length; i++) {
            if (entertainmentItemId === restaurantEntertainmentItems[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: restaurantEntertainmentItems[i].title,
                    description: restaurantEntertainmentItems[i].description,
                    timeFrom: restaurantEntertainmentItems[i].timeFrom,
                    timeTo: restaurantEntertainmentItems[i].timeTo,
                    imageUrl: restaurantEntertainmentItems[i].imageUrl,
                    categoryJSON: restaurantEntertainmentItems[i].categoryJSON,
                    dialogType: "Add",
                }
                setEntertainmentItemDialogData(myEditItem);
                setEntertainmentItemDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteEntertainmentItemDialog = (entertainmentItemId) => {
        for (let i = 0; i < restaurantEntertainmentItems.length; i++) {
            if (entertainmentItemId === restaurantEntertainmentItems[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantEntertainmentItems[i].title,
                    'deleteEntertainmentItem',
                    entertainmentItemId,
                    deleteEntertainmentItemById);
                break;
            }
        }
    };

    const deleteEntertainmentItemById = async (entertainmentItemId) => {
        let myNewEntertainmentItems = await deleteEntertainmentItemFromRestaurant(entertainmentItemId, restaurantId, associatesRestaurants, true, idToken, customId)
        myNewEntertainmentItems = await sortEntertainmentItems(myNewEntertainmentItems, myStates);
        let myNewMenuDays = await updateMenuDaysWithEntertainmentItemChanges(restaurantMenuDays, myNewEntertainmentItems, idToken, customId)
        setRestaurantEntertainmentItems(myNewEntertainmentItems)
        setRestaurantMenuDays(myNewMenuDays)
    }

    const items = []
    for (let i = 0; i < entertainmentItem.categoryJSON.length; i++) {
        switch (entertainmentItem.categoryJSON[i]) {
            case 'theater':
                items.push(<i className='fas fa-theater-masks' key={entertainmentItem.id + "_theater"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'music':
                items.push(<i className='fas fa-music' key={entertainmentItem.id + "_music"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'karaokes':
                items.push(<i className='fas fa-microphone' key={entertainmentItem.id + "_karaokes"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dancing':
                items.push(<i className='fas fa-running' key={entertainmentItem.id + "_dancing"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'comedy':
                items.push(<i className='fas fa-laugh' key={entertainmentItem.id + "_comedy"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    // format dates for display
    let myTime = dateString(entertainmentItem.timeFrom, entertainmentItem.timeTo, 'time')

    // let canRead = false;
    // associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "read" ? canRead = true : canRead = false
    let canEdit = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "edit" ? canEdit = true : canEdit = false
    let canAdmin = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

    return (
        <div className='card'>
            <h4><i className="fas fa-list"></i>{' - '}{items}{entertainmentItem.title}
            </h4>
            <h5>{myTime}
            </h5>
            <div className={classes.root} >
                {(canEdit || canAdmin) && <Button variant="outlined" color="primary" onClick={() => handleClickEntertainmentItemEdit(entertainmentItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => handleClickEntertainmentItemCopy(entertainmentItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => loadDeleteEntertainmentItemDialog(entertainmentItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button>}
            </div>
        </div>
    );
};

export default EntertainmentItemCardInventory;

