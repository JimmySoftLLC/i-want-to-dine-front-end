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
import getAssociatesRestaurants from '../../model/associate/getAssociatesRestaurants';
import getRestaurantById from '../../model/restaurant/getRestaurantById';
import getMenuDays from '../../model/menuDay/getMenuDays';
import getRestaurantAssociates from '../../model/restaurant/getRestaurantAssociates';
import deleteAssociateFromRestaurant from '../../model/restaurant/deleteAssociateFromRestaurant';
import deleteRestaurant from '../../model/restaurant/deleteRestaurant';
import getAssociate from '../../model/associate/getAssociate';
import deleteMenuItemFromRestaurant from '../../model/menuItem/deleteMenuItemFromRestaurant';
import deleteMenuDayFromRestaurant from '../../model/menuDay/deleteMenuDayFromRestaurant';
// import updateAssociatesRestaurants from '../../model/updateAssociatesRestaurants';
import sortMenuItems from '../../model/menuItem/sortMenuItems';
import sortEntertainmentItems from '../../model/entertainmentItem/sortEntertainmentItems';
import sortMenuDays from '../../model/menuDay/sortMenuDays';
import sortAssociates from '../../model/associate/sortAssociates';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';
import getMenuItems from '../../model/menuItem/getMenuItems';
import getEntertainmentItems from '../../model/entertainmentItem/getEntertainmentItems';
import sortRestaurants from '../../model/restaurant/sortRestaurants';

import {
    noSelectedRestaurant,
    blankImage,
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
        setRestaurantEntertainmentItems,
        setRestaurantId,
        restaurantId,
        myStates,
        setMenuDayDialogData,
        setMenuDayDialogOpen,
        setRestaurantMenuDays,
        setAssociateDialogData,
        setAssociateDialogOpen,
        setRestaurantAssociates,
        setLoading,
        setEntertainmentItemDialogData,
        setEntertainmentItemDialogOpen,
        setPhotoDialogOpen,
        setPhotoDialogData,
        setImageEditorData,
        setRestaurantPhotos,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext

    // change restaurant if none selected clear menu items, menudays, associates
    // other wise get menu items, menudays, associates from database and sort
    const changeRestaurantSelection = async (event) => {
        setLoading(true);
        setRestaurantId(event.target.value);
        if (event.target.value === noSelectedRestaurant) {
            setRestaurantMenuItems([]);
            setRestaurantMenuDays([]);
            setRestaurantAssociates([]);
            setRestaurantPhotos([]);
            setLoading(false);
            return;
        }
        let myRestaurant = getRestaurantById(associatesRestaurants, event.target.value);

        let myMenuItems = await getMenuItems(myRestaurant.menuItemIdsJSON);
        myMenuItems = await sortMenuItems(myMenuItems, myStates);
        setRestaurantMenuItems(myMenuItems);

        let myEntertainmentItems = await getEntertainmentItems(myRestaurant.entertainmentItemIdsJSON);
        myEntertainmentItems = await sortEntertainmentItems(myEntertainmentItems, 'myStates');
        setRestaurantEntertainmentItems(myEntertainmentItems);

        let myPhotos = myRestaurant.photosJSON
        setRestaurantPhotos(myPhotos);

        let myMenuDays = await getMenuDays(myRestaurant.menuDayIdsJSON);
        myMenuDays = await sortMenuDays(myMenuDays, 'sortDate');
        setRestaurantMenuDays(myMenuDays);

        let myRestaurantAssociates = await getRestaurantAssociates(myRestaurant);
        myRestaurantAssociates = await sortAssociates(myRestaurantAssociates, associate);
        setRestaurantAssociates(myRestaurantAssociates);

        setLoading(false);
    };


    // set data for restaurant dialog this will be use if the restaurant is saved tossed if canceled
    // deep copy the associate pass everything else
    const editRestaurantClick = () => {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
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
            orderUrlLink: myRestaurant.orderUrlLink,
            menuItemIdsJSON: myRestaurant.menuItemIdsJSON,
            entertainmentItemIdsJSON: myRestaurant.entertainmentItemIdsJSON,
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
    const newRestaurantClick = () => {
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
            orderUrlLink: '',
            menuItemIdsJSON: [],
            entertainmentItemIdsJSON: [],
            associatesJSON: myRestaurantsAssociatesJSON,
            menuDayIdsJSON: [],
            photosJSON: [],
            approved: false,
            myAssociate: myAssociate,
            dialogType: "New",
        }
        setRestaurantDialogData(myRestaurantData);
        setRestaurantDialogOpen(true);
    };

    const newMenuItemClick = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            restaurantId: restaurantId,
            dialogType: "Add",
        }
        setMenuItemDialogData(myEditItem);
        setMenuItemDialogOpen(true);
    };

    const newEntertainmentClick = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            description: '',
            timeFrom: new Date(),
            timeTo: new Date(),
            imageUrl: '',
            categoryJSON: [],
            restaurantId: restaurantId,
            dialogType: "Add",
        }
        setEntertainmentItemDialogData(myEditItem);
        setEntertainmentItemDialogOpen(true);
    };

    const newPhotoClick = () => {
        let myEditItem = {
            src: '',
            caption: '',
            restaurantid: '',
            dialogType: 'Add',
        }
        setPhotoDialogData(myEditItem);
        let myImageEditorItem = {
            imageUrl: '',
            editMode: 'none',
            deleteFileName: '',
            width: 1,
            height: 1,
            aspectRatio: 1,
            blob: '',
            showDelete: false,
        }
        setImageEditorData(myImageEditorItem);
        setPhotoDialogOpen(true);
    };

    const newMenuDayClick = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            description: '',
            menuItemIdsJSON: [],
            entertainmentItemIdsJSON: [],
            associatesJSON: [],
            restaurantId: restaurantId,
            dialogType: "Add",
        }
        setMenuDayDialogData(myEditItem);
        setMenuDayDialogOpen(true);
    };

    const newAssociateClick = () => {
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
            showEmail: true,
            editMode: 'none',
            deleteFileName: '',
        };
        setAssociateDialogData(myAssociateData);
        let myImageEditorItem = {
            imageUrl: blankImage,
            editMode: 'none',
            deleteFileName: '',
            width: 1,
            height: 1,
            aspectRatio: 1,
            blob: '',
            showDelete: true,
        }
        setImageEditorData(myImageEditorItem);
        setAssociateDialogOpen(true);
    };

    const deleteRestaurantClick = () => {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId)
        setDeleteConfirmDialog(true,
            myRestaurant.restaurantName,
            'deleteRestaurant',
            restaurantId,
            deleteRestaurantNow);
    };

    const deleteRestaurantNow = async () => {
        let myRestaurant = getRestaurantById(associatesRestaurants, restaurantId);
        for (let i = 0; i < myRestaurant.menuItemIdsJSON.length; i++) {
            await deleteMenuItemFromRestaurant(myRestaurant.menuItemIdsJSON[i], restaurantId, associatesRestaurants, false, idToken, customId)
        }
        for (let i = 0; i < myRestaurant.menuDayIdsJSON.length; i++) {
            await deleteMenuDayFromRestaurant(myRestaurant.menuDayIdsJSON[i], restaurantId, associatesRestaurants, false, idToken, customId)
        }
        for (let i = 0; i < myRestaurant.associatesJSON.length; i++) {
            await deleteAssociateFromRestaurant(restaurantId, myRestaurant.associatesJSON[i].id, myRestaurant, false, idToken, customId)
        }
        await deleteRestaurant(restaurantId, idToken, customId)
        const newAssociate = await getAssociate(associate.id, idToken, customId)
        let newAssociatesRestaurants = await getAssociatesRestaurants(newAssociate)
        newAssociatesRestaurants = await sortRestaurants(newAssociatesRestaurants)
        setAssociate(newAssociate)
        setAssociatesRestaurants(newAssociatesRestaurants);
        setRestaurantId(noSelectedRestaurant);
    }

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
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "read" ? canRead = true : canRead = false
    let canEdit = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "edit" ? canEdit = true : canEdit = false
    let canAdmin = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

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
                            <i className="icon-book-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Entertainment settings">
                        <IconButton aria-label=""
                            color={myStates['entertainmentSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('entertainmentSettings')}>
                            <i className="icon-music-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Associate settings">
                        <IconButton aria-label=""
                            color={myStates['associateSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('associateSettings')}>
                            <i className="fas fa-user-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Photo gallery settings">
                        <IconButton aria-label=""
                            color={myStates['photoSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('photoSettings')}>
                            <i className="icon-image-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Menu day settings">
                        <IconButton aria-label=""
                            color={myStates['menuDaySettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('menuDaySettings')}>
                            <i className="icon-calendar-cog"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['restaurantSettings'] && canAdmin) && <Tooltip title="Edit restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => editRestaurantClick()}>
                            <i className="icon-restaurant-edit"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId === noSelectedRestaurant && <Tooltip title="Add restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newRestaurantClick()}>
                            <i className="icon-restaurant-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['restaurantSettings'] && (canRead || canEdit || canAdmin)) && <Tooltip title="Add restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newRestaurantClick()}>
                            <i className="icon-restaurant-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['restaurantSettings'] && canAdmin) && <Tooltip title="Delete restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => deleteRestaurantClick()}>
                            <i className="icon-restaurant-minus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['menuSettings'] && canAdmin) && <Tooltip title="Add menu item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newMenuItemClick()}>
                            <i className="icon-book-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['menuDaySettings'] && canAdmin) && <Tooltip title="Add menu day">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newMenuDayClick()}>
                            <i className="icon-calendar-solid-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['associateSettings'] && canAdmin) && <Tooltip title="Add associate">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newAssociateClick()}>
                            <i className="fas fa-user-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['entertainmentSettings'] && canAdmin) && <Tooltip title="Add entertainment item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newEntertainmentClick()}>
                            <i className="icon-music-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(restaurantId !== noSelectedRestaurant && myStates['photoSettings'] && canAdmin) && <Tooltip title="Add photo">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newPhotoClick()}>
                            <i className="icon-image-plus"></i>
                        </IconButton>
                    </Tooltip>}
                </div>
            </Toolbar>
        </Fragment >
    );
}

export default SignedInTopToolBar;
