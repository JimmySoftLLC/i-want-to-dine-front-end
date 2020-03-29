import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putMenuDay from '../../model/putMenuDay';
import getRestaurantFromAssociateRestaurants from '../../model/getRestaurantFromAssociateRestaurants';
import getRestaurantMenuDays from '../../model/getRestaurantMenuDays';
import putRestaurant from '../../model/putRestaurant';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

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
        dateFrom,
        dateTo,
        description,
        menuIdsJSON,
        dialogType,
    } = dataAndMethodsContext.menuDayDialogData;

    const {
        menuDayDialogOpen,
        setMenuDayDialogOpen,
        setMenuDayDialogDataItem,
        idToken,
        customId,
        setResturantMenuDays,
        associatesRestaurants,
        restaurantId,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setMenuDayDialogOpen(false);
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
        setMenuDayDialogOpen(false);
    };

    const saveMenuDay = async () => {
        let myNewMenuDay = {}
        myNewMenuDay.id = id;
        myNewMenuDay.title = title;
        myNewMenuDay.dateFrom = dateFrom;
        myNewMenuDay.dateTo = dateTo;
        myNewMenuDay.description = description;
        myNewMenuDay.menuIdsJSON = menuIdsJSON;
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
        myNewMenuDay.dateFrom = dateFrom;
        myNewMenuDay.dateTo = dateTo;
        myNewMenuDay.description = description;
        myNewMenuDay.menuIdsJSON = menuIdsJSON;
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

    const changeDateFrom = (date) => {
        setMenuDayDialogDataItem('dateFrom', date)
    };

    const changeDateTo = (date) => {
        setMenuDayDialogDataItem('dateTo', date)
    };

    const changeDescription = (e) => {
        setMenuDayDialogDataItem('description', e.target.value)
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">

                    <Dialog className={classes.root} open={menuDayDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-from"
                                label="From"
                                format="MM/dd/yyyy"
                                value={dateFrom}
                                onChange={changeDateFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-to"
                                label="To"
                                format="MM/dd/yyyy"
                                value={dateTo}
                                onChange={changeDateTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="filled"
                                size="small"
                                value={description}
                                onChange={changeDescription}
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
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default MenuDayDialog;

