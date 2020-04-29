import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import sortMenuDays from '../../model/menuDay/sortMenuDays';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';
import deleteMenuDayFromRestaurant from '../../model/menuDay/deleteMenuDayFromRestaurant';
import dateString from '../../model/dateString';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const MenuDayCard = ({ menuDay }) => {
    const classes = useStyles();

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuDays,
        setMenuDayDialogData,
        setMenuDayDialogOpen,
        idToken,
        customId,
        setRestaurantMenuDays,
        associatesRestaurants,
        restaurantId,
        associate,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const menuDayEditClick = (menuDayId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuDayId === restaurantMenuDays[i].id) {
                let myEditItem = {
                    id: restaurantMenuDays[i].id,
                    title: restaurantMenuDays[i].title,
                    dateFrom: restaurantMenuDays[i].dateFrom,
                    dateTo: restaurantMenuDays[i].dateTo,
                    description: restaurantMenuDays[i].description,
                    menuIdsJSON: restaurantMenuDays[i].menuIdsJSON,
                    associatesJSON: restaurantMenuDays[i].associatesJSON,
                    dialogType: 'Edit',
                }
                setMenuDayDialogData(myEditItem);
                setMenuDayDialogOpen(true);
                break;
            }
        }
    };

    const menuDayCopyClick = (menuDayId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuDayId === restaurantMenuDays[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: restaurantMenuDays[i].title,
                    dateFrom: restaurantMenuDays[i].dateFrom,
                    dateTo: restaurantMenuDays[i].dateTo,
                    description: restaurantMenuDays[i].description,
                    menuIdsJSON: restaurantMenuDays[i].menuIdsJSON,
                    associatesJSON: restaurantMenuDays[i].associatesJSON,
                    dialogType: "Add",
                }
                setMenuDayDialogData(myEditItem);
                setMenuDayDialogOpen(true);
                break;
            }
        }
    };

    const deleteMenuClick = (menuDayId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuDayId === restaurantMenuDays[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantMenuDays[i].title,
                    'deleteMenuDay',
                    menuDayId,
                    deleteMenuDayById);
                break;
            }
        }
    };

    const deleteMenuDayById = async (menuDayId) => {
        let myMenuDays = await deleteMenuDayFromRestaurant(menuDayId, restaurantId, associatesRestaurants, true, idToken, customId)
        myMenuDays = await sortMenuDays(myMenuDays, 'sortDate');
        setRestaurantMenuDays(myMenuDays)
    }

    // format dates for display
    let myDate = dateString(menuDay.dateFrom, menuDay.dateTo, 'menuCard')

    // set permissions for component display
    let canEdit = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "edit" ? canEdit = true : canEdit = false
    let canAdmin = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

    return (
        <div className='card'>
            <h4><i className="fas fa-calendar-day"></i>{' - '}{menuDay.title}{' - '}{myDate}
            </h4>
            <div className={classes.root} >
                {(canAdmin || canEdit) && <Button variant="outlined" color="primary" onClick={() => menuDayEditClick(menuDay.id)}>
                    <i className="fas fa-edit"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => menuDayCopyClick(menuDay.id)}>
                    <i className="fas fa-copy"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => deleteMenuClick(menuDay.id)}>
                    <i className="fas fa-trash"></i>
                </Button>}
            </div>
        </div>
    );
};

export default MenuDayCard;
