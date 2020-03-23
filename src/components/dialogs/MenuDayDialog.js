import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import Toolbar from '@material-ui/core/Toolbar';
import { Tooltip } from '@material-ui/core';
import putMenuDay from '../../model/putMenuDay';
import getRestaurantFromAssociateRestaurants from '../../model/getRestaurantFromAssociateRestaurants';
import getRestaurantMenuDays from '../../model/getRestaurantMenuDays';
import putRestaurant from '../../model/putRestaurant';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const MenuDayDialog = () => {
    const classes = useStyles();
    const dataAndMethodsContext = useContext(DataAndMethodsContext);

    const {
        id,
        title,
        description,
        categoryJSON,
        restaurant,
        price,
        dialogType,
    } = dataAndMethodsContext.MenuDayDialogData;

    const {
        MenuDayDialogOpen,
        setMenuDialogOpen,
        setMenuDayDialogDataItem,
        idToken,
        customId,
        setResturantMenuDays,
        associatesRestaurants,
        restaurantId,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setMenuDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveMenuDay()
                break;
            case "Add":
                saveMenuDayAdd()
                break;
            default:
        }
        setMenuDialogOpen(false);
    };

    const saveMenuDay = async () => {
        let myNewMenuDay = {}
        myNewMenuDay.id = id;
        myNewMenuDay.title = title;
        myNewMenuDay.description = description;
        myNewMenuDay.categoryJSON = categoryJSON;
        myNewMenuDay.restaurant = restaurant;
        myNewMenuDay.price = price;
        //console.log(MenuDaysTableName, idToken, myNewMenuDay, customId);
        await putMenuDay(myNewMenuDay, idToken, customId);
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        const myMenuDays = await getRestaurantMenuDays(myRestaurant, idToken, customId)
        setResturantMenuDays(myMenuDays)
    };

    const saveMenuDayAdd = async () => {
        let myNewMenuDay = {}
        myNewMenuDay.id = id;
        myNewMenuDay.title = title;
        myNewMenuDay.description = description;
        myNewMenuDay.categoryJSON = categoryJSON;
        myNewMenuDay.restaurant = restaurant;
        myNewMenuDay.price = price;
        //console.log(MenuDaysTableName, idToken, myNewMenuDay, customId);
        await putMenuDay(myNewMenuDay, idToken, customId);
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        myRestaurant.MenuDayIdsJSON.push(myNewMenuDay.id)
        await putRestaurant(myRestaurant, idToken, customId)
        const myMenuDays = await getRestaurantMenuDays(myRestaurant, idToken, customId)
        setResturantMenuDays(myMenuDays)
    };

    const changeTitle = (e) => {
        setMenuDayDialogDataItem('title', e.target.value)
    };

    const changeDescription = (e) => {
        setMenuDayDialogDataItem('description', e.target.value)
    };

    const changeRestaurant = (e) => {
        setMenuDayDialogDataItem('restaurant', e.target.value)
    };

    const changePrice = (e) => {
        setMenuDayDialogDataItem('price', e.target.value)
    };

    const checkIfPresent = (value) => {
        if (categoryJSON) {
            if (categoryJSON.indexOf(value) !== -1) { return true }
        }
        return false
    }

    return (
        <div>
            <Dialog className={classes.root} open={MenuDayDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogType + " menu day"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={title}
                        onChange={changeTitle}
                    />
                    <TextField
                        id="restaurant"
                        label="Restaurant"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={restaurant}
                        onChange={changeRestaurant}
                    />
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

export default MenuDayDialog;


