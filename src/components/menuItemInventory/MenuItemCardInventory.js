import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import deleteMenuItem from '../../model/deleteMenuItem';
import getRestaurantMenuItems from '../../model/getRestaurantMenuItems';
import putRestaurant from '../../model/putRestaurant';
import getRestaurantFromAssociateRestaurants from '../../model/getRestaurantFromAssociateRestaurants';
import sortMenuItems from '../../model/sortMenuItems';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const MenuItemCardInventory = ({ menuItem }) => {
    const classes = useStyles();

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        setMenuItemDialogData,
        setMenuItemDialogOpen,
        idToken,
        customId,
        setRestaurantMenuItems,
        associatesRestaurants,
        restaurantId,
        myStates,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickMenuItemEdit = (menuId) => {
        for (let i = 0; i < restaurantMenuItems.length; i++) {
            if (menuId === restaurantMenuItems[i].id) {
                let myEditItem = {
                    title: restaurantMenuItems[i].title,
                    description: restaurantMenuItems[i].description,
                    categoryJSON: restaurantMenuItems[i].categoryJSON,
                    price: restaurantMenuItems[i].price,
                    id: restaurantMenuItems[i].id,
                    restaurant: restaurantMenuItems[i].restaurant,
                    dialogType: 'Edit',
                }
                setMenuItemDialogData(myEditItem);
                setMenuItemDialogOpen(true);
                break;
            }
        }
    };

    const handleClickMenuItemCopy = (menuId) => {
        for (let i = 0; i < restaurantMenuItems.length; i++) {
            if (menuId === restaurantMenuItems[i].id) {
                let myEditItem = {
                    title: restaurantMenuItems[i].title,
                    description: restaurantMenuItems[i].description,
                    categoryJSON: restaurantMenuItems[i].categoryJSON,
                    price: restaurantMenuItems[i].price,
                    id: uuidv4(),
                    restaurant: restaurantMenuItems[i].restaurant,
                    dialogType: "Add",
                }
                setMenuItemDialogData(myEditItem);
                setMenuItemDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteMenuItemDialog = (menuId) => {
        for (let i = 0; i < restaurantMenuItems.length; i++) {
            if (menuId === restaurantMenuItems[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantMenuItems[i].title,
                    'deleteMenuItem',
                    menuId,
                    deleteMenuItemNow);
                break;
            }
        }
    };

    const deleteMenuItemNow = async (menuId) => {
        await deleteMenuItem(menuId, idToken, customId)
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        let myIndex = myRestaurant.menuItemIdsJSON.indexOf(menuId, 0)
        myRestaurant.menuItemIdsJSON.splice(myIndex, 1)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuItems = await getRestaurantMenuItems(myRestaurant)
        if (myStates['sortPrice']) {
            myMenuItems = await sortMenuItems(myMenuItems, 'price');
        }
        if (myStates['sortTitle']) {
            myMenuItems = await sortMenuItems(myMenuItems, 'title');
        }
        setRestaurantMenuItems(myMenuItems)
    }

    const items = []
    for (let i = 0; i < menuItem.categoryJSON.length; i++) {
        switch (menuItem.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={menuItem.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pork':
                items.push(<i className='icon-ham' key={menuItem.id + "_pork"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'lamb':
                items.push(<i className='icon-lamb' key={menuItem.id + "_lamb"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'poultry':
                items.push(<i className='fas fa-feather' key={menuItem.id + "_feather"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'fish':
                items.push(<i className='fas fa-fish' key={menuItem.id + "_fish"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'shellfish':
                items.push(<i className='icon-shell' key={menuItem.id + "_shell"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'vegetarian':
                items.push(<i className='fas fa-seedling' key={menuItem.id + "_seedling"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'cheese':
                items.push(<i className='fas fa-cheese' key={menuItem.id + "_cheese"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pasta':
                items.push(<i className='icon-spaghetti' key={menuItem.id + "_pasta"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'sandwich':
                items.push(<i className='fas fa-hamburger' key={menuItem.id + "_hamburger"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dessert':
                items.push(<i className='fas fa-birthday-cake' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'specials':
                items.push(<i className='fas fa-tag' key={menuItem.id + "_specials"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4><i className="fas fa-list"></i>{' - '}{items}{menuItem.title}{' - '}{menuItem.price}
            </h4>
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemEdit(menuItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemCopy(menuItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => loadDeleteMenuItemDialog(menuItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default MenuItemCardInventory;

