import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putMenuDay from '../../model/menuDay/putMenuDay';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import getMenuDays from '../../model/menuDay/getMenuDays';
import putRestaurant from '../../model/restaurant/putRestaurant';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import sortMenuDays from '../../model/menuDay/sortMenuDays';
import 'date-fns';
import MenuItemsMenuDay from '../menuItemMenuDay/MenuItemsMenuDay';
// import EntertainmentItemsMenuDay from '../entertainmentItemMenuDay/EntertainmentItemsMenuDay';
import AssociatesMenuDay from '../associateMenuDay/AssociatesMenuDay';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        menuItemIdsJSON,
        entertainmentItemIdsJSON,
        associatesJSON,
        dialogType,
    } = dataAndMethodsContext.menuDayDialogData;

    const { menuDayDialogData } = dataAndMethodsContext;

    const {
        menuDayDialogOpen,
        setMenuDayDialogOpen,
        setMenuDayDialogDataItem,
        idToken,
        customId,
        setRestaurantMenuDays,
        associatesRestaurants,
        restaurantId,
        setMenuDayDialogData,
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
        myNewMenuDay.title = title
        myNewMenuDay.dateFrom = dateFrom;
        myNewMenuDay.dateTo = dateTo;
        myNewMenuDay.description = description
        myNewMenuDay.menuItemIdsJSON = menuItemIdsJSON
        myNewMenuDay.entertainmentItemIdsJSON = entertainmentItemIdsJSON
        myNewMenuDay.associatesJSON = associatesJSON;
        myNewMenuDay.restaurantId = restaurantId;
        //console.log(MenuDaysTableName, idToken, myNewMenuDay, customId);
        await putMenuDay(myNewMenuDay, idToken, customId);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        let myMenuDays = await getMenuDays(myRestaurant.menuDayIdsJSON)
        myMenuDays = await sortMenuDays(myMenuDays, 'sortDate');
        setRestaurantMenuDays(myMenuDays)
    };

    const saveMenuDayAdd = async () => {
        let myNewMenuDay = {}
        myNewMenuDay.id = id;
        myNewMenuDay.title = title
        myNewMenuDay.dateFrom = dateFrom;
        myNewMenuDay.dateTo = dateTo;
        myNewMenuDay.description = description
        myNewMenuDay.menuItemIdsJSON = menuItemIdsJSON;
        myNewMenuDay.entertainmentItemIdsJSON = entertainmentItemIdsJSON;
        myNewMenuDay.associatesJSON = associatesJSON;
        myNewMenuDay.restaurantId = restaurantId;
        // console.log(myNewMenuDay, idToken, customId);
        await putMenuDay(myNewMenuDay, idToken, customId);
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        // console.log(myRestaurant)
        myRestaurant.menuDayIdsJSON.push(myNewMenuDay.id)
        await putRestaurant(myRestaurant, idToken, customId)
        let myMenuDays = await getMenuDays(myRestaurant.menuDayIdsJSON)
        myMenuDays = await sortMenuDays(myMenuDays, 'sortDate');
        setRestaurantMenuDays(myMenuDays)
    };

    const selectAllMenuItems = () => {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        myNewMenuDayDialogData.menuItemIdsJSON = JSON.parse(JSON.stringify(myRestaurant.menuItemIdsJSON))
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    const unSelectAllMenuItems = () => {
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        myNewMenuDayDialogData.menuItemIdsJSON = []
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    const selectAllAssociates = () => {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        let myNewAssociateJSON = [];
        for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
            myNewAssociateJSON.push(myRestaurant.associatesJSON[i].id)
        }
        myNewMenuDayDialogData.associatesJSON = JSON.parse(JSON.stringify(myNewAssociateJSON))
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    const unSelectAllAssociates = () => {
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        myNewMenuDayDialogData.associatesJSON = []
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    const changeTitle = (e) => {
        setMenuDayDialogDataItem('title', e.target.value)
    };

    const changeDateFrom = (myDate) => {
        // const myDateTo = new Date(dateTo)
        let myMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        // if (myDate.getTime() > myDateTo.getTime()) {
        //     myMenuDayDialogData['dateFrom'] = myDate;
        //     myMenuDayDialogData['dateTo'] = myDate;
        // } else {
        myMenuDayDialogData['dateFrom'] = myDate;
        // }
        setMenuDayDialogData(myMenuDayDialogData);
    };

    const changeDateTo = (myDate) => {
        // const myDateFrom = new Date(dateFrom)
        let myMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        // if (myDate.getDate() < myDateFrom.getTime()) {
        //     myMenuDayDialogData['dateTo'] = myDateFrom;
        // } else {
        myMenuDayDialogData['dateTo'] = myDate;
        // }
        setMenuDayDialogData(myMenuDayDialogData);
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
                                variant="filled"
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
                                variant="filled"
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
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Menu Items</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item xs={12}>
                                        <MenuItemsMenuDay />
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <DialogActions>
                                <Button onClick={() => selectAllMenuItems()} color="default">Select All</Button>
                                <Button onClick={() => unSelectAllMenuItems()} color="default">Unselect All</Button>
                            </DialogActions>
                            {/* <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Entertainment Items</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item xs={12}>
                                        <EntertainmentItemsMenuDay />
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel> */}
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header2"
                                >
                                    <Typography>Associates</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid item xs={12}>
                                        <AssociatesMenuDay />
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <DialogActions>
                                <Button onClick={() => selectAllAssociates()} color="default">Select All</Button>
                                <Button onClick={() => unSelectAllAssociates()} color="default">Unselect All</Button>
                            </DialogActions>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="default">Cancel</Button>
                            <Button onClick={() => handleSave()} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default MenuDayDialog;

