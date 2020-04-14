import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { v4 as uuidv4 } from 'uuid';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import getAssociateRestaurants from '../../model/getAssociateRestaurants';
import getRestaurantFromArray from '../../model/getRestaurantFromArray';
import getRestaurantMenuItems from '../../model/getRestaurantMenuItems';
import getRestaurantMenuDays from '../../model/getRestaurantMenuDays';
import getRestaurantAssociates from '../../model/getRestaurantAssociates';
// import updateAssociateRestaurants from '../../model/updateAssociateRestaurants';
import putAssociate from '../../model/putAssociate';
import deleteRestaurant from '../../model/deleteRestaurant';
import sortMenuItems from '../../model/sortMenuItems';
import sortMenuDays from '../../model/sortMenuDays';
import sortAssociates from '../../model/sortAssociates';
import associateAccessLevel from '../../model/associateAccessLevel';
import {
    noSelectedRestaurant,
} from '../../api/apiConstants';

const SignedInTopToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { associatesRestaurants,
        setRestaurantDialogData,
        setRestaurantDialogOpen,
        associate,
        setAssociatesRestaurants,
        setAssociate,
        idToken,
        customId,
        setMenuItemDialogData,
        setMenuItemDialogOpen,
        setRestaurantMenuItems,
        setRestaurantId,
        restaurantId,
        myStates,
        setMenuDayDialogData,
        setMenuDayDialogOpen,
        setRestaurantMenuDays,
        setAssociateDialogData,
        setAssociateDialogOpen,
        setRestaurantAssociates,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext

    // change restaurant if none selected clear menu items, menudays, associates
    // other wise get menu items, menudays, associates from database and sort
    const changeRestaurantSelection = async (event) => {
        setRestaurantId(event.target.value);
        if (event.target.value === noSelectedRestaurant) {
            setRestaurantMenuItems([]);
            setRestaurantMenuDays([]);
            setRestaurantAssociates([]);
            return;
        }
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, event.target.value);
        let myMenuItems = await getRestaurantMenuItems(myRestaurant);
        myMenuItems = await sortMenuItems(myMenuItems, myStates);
        setRestaurantMenuItems(myMenuItems);
        let myMenuDays = await getRestaurantMenuDays(myRestaurant);
        myMenuDays = await sortMenuDays(myMenuDays, 'sortDate');
        setRestaurantMenuDays(myMenuDays);
        let myRestaurantAssociates = await getRestaurantAssociates(myRestaurant);
        myRestaurantAssociates = await sortAssociates(myRestaurantAssociates, associate);
        setRestaurantAssociates(myRestaurantAssociates);
    };


    // set data for restaurant dialog this will be use if the restaurant is saved tossed if canceled
    // deep copy the associate pass everything else
    const handleEditRestaurant = () => {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        let myAssociate = JSON.parse(JSON.stringify(associate));
        //console.log(myRestaurant)
        let myRestaurantData = {
            id: myRestaurant.id,
            restaurantName: myRestaurant.restaurantName,
            description: myRestaurant.description,
            street: myRestaurant.street,
            city: myRestaurant.city,
            stateUS: myRestaurant.stateUS,
            zipCode: myRestaurant.zipCode,
            phoneNumber: myRestaurant.phoneNumber,
            urlLink: myRestaurant.urlLink,
            menuItemIdsJSON: myRestaurant.menuItemIdsJSON,
            associatesJSON: myRestaurant.associatesJSON,
            menuDayIdsJSON: myRestaurant.menuDayIdsJSON,
            approved: myRestaurant.approved,
            myAssociate: myAssociate,
            dialogType: "Edit",
        }
        setRestaurantDialogData(myRestaurantData);
        setRestaurantDialogOpen(true);
    };

    // set data for restaurant dialog this will be use if the restaurant is saved tossed if canceled
    // - get new id for restaurant
    // - create an array to add associate
    // - deep copy associate
    // - add access level to admin in new associate since they are creating the restaurant
    // - push the restaurant id onto new assoicates restaurantIdsJSON
    // - create new restaurant dialog data object set most entries to blank
    //   -- set myAssoicateJSON
    //   -- set approved to false (need to approve ownership before becomming live)
    //   -- set myAssociate, this will be used later to update the associate with the new restaurant
    //   -- set dialogType to new
    const handleNewRestaurant = () => {
        let myId = uuidv4();
        let myRestaurantsAssociatesJSON = [];
        let myAssociate = JSON.parse(JSON.stringify(associate));
        myAssociate.email = myAssociate.id;
        myAssociate.accessLevel = 'admin';
        myAssociate.restaurantIdsJSON.push(myId);
        myRestaurantsAssociatesJSON.push(myAssociate);
        let myRestaurantData = {
            id: myId,
            restaurantName: '',
            description: '',
            street: '',
            city: '',
            stateUS: '',
            zipCode: '',
            phoneNumber: '',
            urlLink: '',
            menuItemIdsJSON: [],
            associatesJSON: myRestaurantsAssociatesJSON,
            menuDayIdsJSON: [],
            approved: false,
            myAssociate: myAssociate,
            dialogType: "New",
        }
        setRestaurantDialogData(myRestaurantData);
        setRestaurantDialogOpen(true);
    };

    const handleNewMenuItem = () => {
        let myNewId = uuidv4()
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        let myEditItem = {
            id: myNewId,
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            restaurant: myRestaurant.restaurantName,
            dialogType: "Add",
        }
        setMenuItemDialogData(myEditItem);
        setMenuItemDialogOpen(true);
    };

    const handleNewMenuDay = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            description: '',
            menuIdsJSON: [],
            associatesJSON: [],
            dialogType: "Add",
        }
        setMenuDayDialogData(myEditItem);
        setMenuDayDialogOpen(true);
    };

    const handleNewAssociate = () => {
        let myNewId = uuidv4()
        let myAssociateData = {
            id: myNewId,
            firstName: '',
            lastName: '',
            jobTitle: '',
            bio: '',
            email: '',
            restaurantIdsJSON: [],
            accessLevel: 'none',
            dialogType: "Add",
        };
        setAssociateDialogData(myAssociateData);
        setAssociateDialogOpen(true);
    };

    const loadDeleteRestaurantWarningDialog = () => {
        let myRestaurant = getRestaurantFromArray(associatesRestaurants, restaurantId)
        setDeleteConfirmDialog(true,
            myRestaurant.restaurantName,
            'deleteRestaurant',
            restaurantId,
            deleteRestaurantNow);
    };

    const deleteRestaurantNow = async () => {
        let myAssociate = JSON.parse(JSON.stringify(associate));
        let indexOfRestaurantId = myAssociate.restaurantIdsJSON.indexOf(restaurantId);
        myAssociate.restaurantIdsJSON.splice(indexOfRestaurantId, 1);
        setAssociate(myAssociate)
        await putAssociate(myAssociate, idToken, customId)
        await deleteRestaurant(restaurantId, idToken, customId)
        const associatesRestaurants = await getAssociateRestaurants(myAssociate)
        setAssociatesRestaurants(associatesRestaurants);
        setRestaurantId(noSelectedRestaurant);
    }

    // const updateAssociatesRestaurantsNow = async () => {
    //     const mytest = await updateAssociateRestaurants( associate, restaurants,idToken, customId,)
    // }

    const BootstrapInput = withStyles(theme => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }))(InputBase);

    const myRestaurantMenuItems = associatesRestaurants.map(restaurant => <MenuItem
        value={restaurant.id}
        key={restaurant.id}>
        {restaurant.restaurantName}
    </MenuItem>);

    let canRead = false;
    associateAccessLevel(associatesRestaurants, restaurantId, associate.id) === "read" ? canRead = true : canRead = false
    let canEdit = false;
    associateAccessLevel(associatesRestaurants, restaurantId, associate.id) === "edit" ? canEdit = true : canEdit = false
    let canAdmin = false;
    associateAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

    return (
        <Fragment>
            <Toolbar>
                <div >
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={restaurantId}
                        onChange={changeRestaurantSelection}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={noSelectedRestaurant}>{noSelectedRestaurant}</MenuItem>
                        {myRestaurantMenuItems}
                    </Select>
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Restaurant settings">
                        <IconButton aria-label=""
                            color={myStates['restaurantSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('restaurantSettings')}>
                            <i className="icon-restaurant-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Menu settings">
                        <IconButton aria-label=""
                            color={myStates['menuSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('menuSettings')}>
                            <i className="icon-list-solid-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Calendar settings">
                        <IconButton aria-label=""
                            color={myStates['menuDaySettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('menuDaySettings')}>
                            <i className="icon-calendar-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Calendar settings">
                        <IconButton aria-label=""
                            color={myStates['associateSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('associateSettings')}>
                            <i className="fas fa-user-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['restaurantSettings'] && canAdmin) && <Tooltip title="Edit restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleEditRestaurant()}>
                            <i className="icon-restaurant-edit"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId === noSelectedRestaurant && <Tooltip title="Add restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewRestaurant()}>
                            <i className="icon-restaurant-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['restaurantSettings'] && (canRead || canEdit || canAdmin)) && <Tooltip title="Add restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewRestaurant()}>
                            <i className="icon-restaurant-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['restaurantSettings'] && canAdmin) && <Tooltip title="Delete restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => loadDeleteRestaurantWarningDialog()}>
                            <i className="icon-restaurant-minus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['menuSettings'] && canAdmin) && <Tooltip title="Add menu item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewMenuItem()}>
                            <i className="icon-list-solid-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['menuDaySettings'] && canAdmin) && <Tooltip title="Add menu day">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewMenuDay()}>
                            <i className="icon-calendar-solid-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['associateSettings'] && canAdmin) && <Tooltip title="Add menu item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewAssociate()}>
                            <i className="fas fa-user-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {/* <IconButton aria-label=""
                        color="inherit"
                        onClick={() => updateAssociatesRestaurantsNow()}>
                        Update
                    </IconButton> */}
                </div>
            </Toolbar>
        </Fragment >
    );
}

export default SignedInTopToolBar;


