import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import deleteMenuDay from '../../model/deleteMenuDay';
import getRestaurantMenuDays from '../../model/getRestaurantMenuDays';
import putRestaurant from '../../model/putRestaurant';
import getRestaurantFromAssociateRestaurants from '../../model/getRestaurantFromAssociateRestaurants';
import sortMenuDays from '../../model/sortMenuDays';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const MenuDayCard = ({ menuItem }) => {
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
        myStates,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickMenuDayEdit = (menuId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuId === restaurantMenuDays[i].id) {
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

    const handleClickMenuDayCopy = (menuId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuId === restaurantMenuDays[i].id) {
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

    const loadDeleteMenuDayDialog = (menuId) => {
        for (let i = 0; i < restaurantMenuDays.length; i++) {
            if (menuId === restaurantMenuDays[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantMenuDays[i].title,
                    'deleteMenuDay',
                    menuId,
                    deleteMenuDayNow);
                break;
            }
        }
    };

    const deleteMenuDayNow = async (menuId) => {
        await deleteMenuDay(menuId, idToken, customId)
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        let myIndex = myRestaurant.menuItemIdsJSON.indexOf(menuId, 0)
        myRestaurant.menuItemIdsJSON.splice(myIndex, 1)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuDays = await getRestaurantMenuDays(myRestaurant)
        if (myStates['sortPrice']) {
            myMenuDays = await sortMenuDays(myMenuDays, 'price');
        }
        if (myStates['sortTitle']) {
            myMenuDays = await sortMenuDays(myMenuDays, 'title');
        }
        setRestaurantMenuDays(myMenuDays)
    }

    return (
        <div className='card'>
            <h4><i className="fas fa-list"></i>{' - '}{menuItem.title}{' - '}{menuItem.price}
            </h4>
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuDayEdit(menuItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuDayCopy(menuItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => loadDeleteMenuDayDialog(menuItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default MenuDayCard;
