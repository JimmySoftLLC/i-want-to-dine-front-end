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
import putEntertainmentItem from '../../model/entertainmentItem/putEntertainmentItem';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import putRestaurant from '../../model/restaurant/putRestaurant';
import sortEntertainmentItems from '../../model/entertainmentItem/sortEntertainmentItems';
import getEntertainmentItems from '../../model/entertainmentItem/getEntertainmentItems';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const EntertainmentItemDialog: any = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

    const {
        id,
        title,
        description,
        timeFrom,
        timeTo,
        imageUrl,
        categoryJSON,
        dialogType,
    } = dataAndMethodsContext.entertainmentItemDialogData;

    const {
        entertainmentItemDialogOpen,
        setEntertainmentItemDialogDataCategory,
        setEntertainmentItemDialogOpen,
        setEntertainmentItemDialogDataItem,
        idToken,
        customId,
        setRestaurantEntertainmentItems,
        associatesRestaurants,
        restaurantId,
        myStates,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setEntertainmentItemDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveEntertainmentItem()
                break;
            case "Add":
                saveEntertainmentItemAdd()
                break;
            default:
        }
        setEntertainmentItemDialogOpen(false);
    };

    const saveEntertainmentItem = async () => {
        let myNewEntertainmentItem: any = {}
        myNewEntertainmentItem.id = id;
        myNewEntertainmentItem.title = title;
        myNewEntertainmentItem.description = description;
        myNewEntertainmentItem.timeFrom = timeFrom;
        myNewEntertainmentItem.timeTo = timeTo;
        myNewEntertainmentItem.imageUrl = imageUrl;
        myNewEntertainmentItem.categoryJSON = categoryJSON;
        myNewEntertainmentItem.restaurantId = restaurantId;
        //console.log(entertainmentItemsTableName, idToken, myNewEntertainmentItem, customId);
        await putEntertainmentItem(myNewEntertainmentItem, idToken, customId);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
        let myEntertainmentItems = await getEntertainmentItems(myRestaurant.entertainmentItemIdsJSON);
        myEntertainmentItems = await sortEntertainmentItems(myEntertainmentItems, myStates);
        setRestaurantEntertainmentItems(myEntertainmentItems)
    };

    const saveEntertainmentItemAdd = async () => {
        let myNewEntertainmentItem: any = {}
        myNewEntertainmentItem.id = id;
        myNewEntertainmentItem.title = title;
        myNewEntertainmentItem.description = description;
        myNewEntertainmentItem.timeFrom = timeFrom;
        myNewEntertainmentItem.timeTo = timeTo;
        myNewEntertainmentItem.imageUrl = imageUrl;
        myNewEntertainmentItem.categoryJSON = categoryJSON;
        myNewEntertainmentItem.restaurantId = restaurantId;
        //console.log(entertainmentItemsTableName, idToken, myNewEntertainmentItem, customId);
        await putEntertainmentItem(myNewEntertainmentItem, idToken, customId);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
        myRestaurant.entertainmentItemIdsJSON.push(myNewEntertainmentItem.id);
        await putRestaurant(myRestaurant, idToken, customId);
        let myEntertainmentItems = await getEntertainmentItems(myRestaurant.entertainmentItemIdsJSON);
        myEntertainmentItems = await sortEntertainmentItems(myEntertainmentItems, myStates);
        setRestaurantEntertainmentItems(myEntertainmentItems)
    };

    const changeTitle = (e: any) => {
        setEntertainmentItemDialogDataItem('title', e.target.value)
    };

    const changeDescription = (e: any) => {
        setEntertainmentItemDialogDataItem('description', e.target.value)
    };

    const changeTimeFrom = (date: any) => {
        setEntertainmentItemDialogDataItem('timeFrom', date)
    };

    const changeTimeTo = (date: any) => {
        setEntertainmentItemDialogDataItem('timeTo', date)
    };

    const checkIfPresent = (value: any) => {
        if (categoryJSON) {
            if (categoryJSON.indexOf(value) !== -1) { return true }
        }
        return false
    }

    return (
        <div>
            <Dialog className={classes.root} open={entertainmentItemDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogType + " entertainment item"}</DialogTitle>
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
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="3"
                        value={description}
                        onChange={changeDescription}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDateTimePicker
                                margin="normal"
                                id="time-picker-from"
                                label="From"
                                value={timeFrom}
                                onChange={changeTimeFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <KeyboardDateTimePicker
                                margin="normal"
                                id="time-picker-to"
                                label="To"
                                value={timeTo}
                                onChange={changeTimeTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Toolbar>
                        <div >
                            <Tooltip title="Theater">
                                <IconButton aria-label="" color={checkIfPresent("theater") ? "inherit" : "default"}
                                    onClick={() => setEntertainmentItemDialogDataCategory('theater')}
                                >
                                    <i className="fas fa-theater-masks"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Music">
                                <IconButton aria-label="" color={checkIfPresent("music") ? "inherit" : "default"}
                                    onClick={() => setEntertainmentItemDialogDataCategory('music')}
                                >
                                    <i className="fas fa-music"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Karaokes">
                                <IconButton aria-label="" color={checkIfPresent("karaokes") ? "inherit" : "default"}
                                    onClick={() => setEntertainmentItemDialogDataCategory('karaokes')}
                                >
                                    <i className="fas fa-microphone"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Dancing">
                                <IconButton aria-label="" color={checkIfPresent("dancing") ? "inherit" : "default"}
                                    onClick={() => setEntertainmentItemDialogDataCategory('dancing')}
                                >
                                    <i className="icon-dancing"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Comedy">
                                <IconButton aria-label="" color={checkIfPresent("comedy") ? "inherit" : "default"}
                                    onClick={() => setEntertainmentItemDialogDataCategory('comedy')}
                                >
                                    <i className="fas fa-laugh"></i>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
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

export default EntertainmentItemDialog;