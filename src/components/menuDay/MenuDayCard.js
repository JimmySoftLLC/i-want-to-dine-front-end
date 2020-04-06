import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import deleteMenuDay from '../../model/deleteMenuDay';
import getRestaurantMenuDays from '../../model/getRestaurantMenuDays';
import putRestaurant from '../../model/putRestaurant';
import getRestaurantFromArray from '../../model/getRestaurantFromArray';
import sortMenuDays from '../../model/sortMenuDays';

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
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickMenuDayEdit = (menuDayId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuDayId === restaurantMenuDays[i].id) {
                let myEditItem = {
                    id: restaurantMenuDays[i].id,
                    title: restaurantMenuDays[i].title,
                    dateFrom: restaurantMenuDays[i].dateFrom,
                    dateTo: restaurantMenuDays[i].dateTo,
                    description: restaurantMenuDays[i].description,
                    menuIdsJSON: restaurantMenuDays[i].menuIdsJSON,
                    dialogType: 'Edit',
                }
                setMenuDayDialogData(myEditItem);
                setMenuDayDialogOpen(true);
                break;
            }
        }
    };

    const handleClickMenuDayCopy = (menuDayId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuDayId === restaurantMenuDays[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: restaurantMenuDays[i].title,
                    dateFrom: restaurantMenuDays[i].dateFrom,
                    dateTo: restaurantMenuDays[i].dateTo,
                    description: restaurantMenuDays[i].description,
                    menuIdsJSON: restaurantMenuDays[i].menuIdsJSON,
                    dialogType: "Add",
                }
                setMenuDayDialogData(myEditItem);
                setMenuDayDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteMenuDayDialog = (menuDayId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuDayId === restaurantMenuDays[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantMenuDays[i].title,
                    'deleteMenuDay',
                    menuDayId,
                    deleteMenuDayNow);
                break;
            }
        }
    };

    const deleteMenuDayNow = async (menuDayId) => {
        await deleteMenuDay(menuDayId, idToken, customId)
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        let myIndex = myRestaurant.menuDayIdsJSON.indexOf(menuDayId, 0)
        myRestaurant.menuDayIdsJSON.splice(myIndex, 1)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuDays = await getRestaurantMenuDays(myRestaurant)
        myMenuDays = await sortMenuDays(myMenuDays, 'sortDate');
        setRestaurantMenuDays(myMenuDays)
    }

    const myDateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
    const myDateFrom = myDateTimeFormat.formatToParts(menuDay.dateFrom)
    const myDateTo = myDateTimeFormat.formatToParts(menuDay.dateTo)
    let myDate = '';
    if (myDateFrom[0].value === myDateTo[0].value && myDateFrom[2].value === myDateTo[2].value && myDateFrom[4].value === myDateTo[4].value) {
        myDate = myDateFrom[0].value + ' ' + myDateFrom[2].value + ' ' + myDateFrom[4].value;
    } else {
        myDate = myDateFrom[0].value + ' ' + myDateFrom[2].value + ' ' + myDateFrom[4].value + ' to ' + myDateTo[0].value + ' ' + myDateTo[2].value + ' ' + myDateTo[4].value;
    }

    return (
        <div className='card'>
            <h4><i className="fas fa-calendar-day"></i>{' - '}{menuDay.title}{' - '}{myDate}
            </h4>
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuDayEdit(menuDay.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuDayCopy(menuDay.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => loadDeleteMenuDayDialog(menuDay.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default MenuDayCard;
