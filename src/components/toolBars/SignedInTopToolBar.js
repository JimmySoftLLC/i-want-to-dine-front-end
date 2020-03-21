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
import getRestaurantFromAssociateRestaurants from '../../model/getRestaurantFromAssociateRestaurants';
import getRestaurantMenuItems from '../../model/getRestaurantMenuItems';
// import updateAssociateRestaurants from '../../model/updateAssociateRestaurants';
import putAssociate from '../../model/putAssociate';
import deleteRestaurant from '../../model/deleteRestaurant';
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
        setMenuDialogData,
        setMenuDialogOpen,
        setResturantMenuItems,
        setRestaurantId,
        restaurantId,
    } = dataAndMethodsContext;
    const deleteConfirmDialogContext = useContext(DeleteConfirmDialogContext);

    const { setDeleteConfirmDialog } = deleteConfirmDialogContext

    const handleChange = async (event) => {
        setRestaurantId(event.target.value);
        if (event.target.value === noSelectedRestaurant) {
            setResturantMenuItems([]);
            return;
        }
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, event.target.value)
        const myMenuItems = await getRestaurantMenuItems(myRestaurant, idToken, customId)
        setResturantMenuItems(myMenuItems)
    };

    const handleEditRestaurant = () => {
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        console.log(myRestaurant)
        let myRestaurantData = {
            restaurantName: myRestaurant.restaurantName,
            description: myRestaurant.description,
            street: myRestaurant.street,
            city: myRestaurant.city,
            stateUS: myRestaurant.stateUS,
            zipCode: myRestaurant.zipCode,
            phoneNumber: myRestaurant.phoneNumber,
            urlLink: myRestaurant.urlLink,
            id: myRestaurant.id,
            menuItemIdsJSON: myRestaurant.menuItemIdsJSON,
            associateIdsJSON: myRestaurant.associateIdsJSON,
            approved: myRestaurant.approved,
            myAssociate: associate,
            dialogType: "Edit",
        }
        setRestaurantDialogData(myRestaurantData);
        setRestaurantDialogOpen(true);
    };

    const handleNewRestaurant = () => {
        let myAssociateIdsJSON = []
        myAssociateIdsJSON.push(associate.id)
        let myNewId = uuidv4()
        let myNewAssociate = JSON.parse(JSON.stringify(associate))
        myNewAssociate.restaurantIdsJSON.push(myNewId)
        let myRestaurantData = {
            restaurantName: '',
            description: '',
            street: '',
            city: '',
            stateUS: '',
            zipCode: '',
            phoneNumber: '',
            urlLink: '',
            id: myNewId,
            menuItemIdsJSON: [],
            associateIdsJSON: myAssociateIdsJSON,
            approved: false,
            myAssociate: myNewAssociate,
            dialogType: "New",
        }
        setRestaurantDialogData(myRestaurantData);
        setRestaurantDialogOpen(true);
    };

    const handleNewMenuItem = () => {
        let myNewId = uuidv4()
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
        let myEditItem = {
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            id: myNewId,
            restaurant: myRestaurant.restaurantName,
            dialogType: "Add",
        }
        setMenuDialogData(myEditItem);
        setMenuDialogOpen(true);
    };

    const loadDeleteRestaurantWarningDialog = () => {
        let myRestaurant = getRestaurantFromAssociateRestaurants(associatesRestaurants, restaurantId)
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
        const associatesRestaurants = await getAssociateRestaurants(myAssociate, idToken, customId)
        setAssociatesRestaurants(associatesRestaurants);
        setRestaurantId(noSelectedRestaurant);
    }

    // const updateAssociatesRestaurantsNow = async () => {
    //     const mytest = await updateAssociateRestaurants(idToken, customId, associate, restaurants)
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

    return (
        <Fragment>
            <Toolbar>
                <div >
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={restaurantId}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={noSelectedRestaurant}>{noSelectedRestaurant}</MenuItem>
                        {myRestaurantMenuItems}
                    </Select>
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Edit restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleEditRestaurant()}>
                            <i className="icon-restaurant-edit"></i>
                        </IconButton>
                    </Tooltip>}
                    <Tooltip title="Add restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewRestaurant()}>
                            <i className="icon-restaurant-plus"></i>
                        </IconButton>
                    </Tooltip>
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Delete restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => loadDeleteRestaurantWarningDialog()}>
                            <i className="icon-restaurant-minus"></i>
                        </IconButton>
                    </Tooltip>}
                    {restaurantId !== noSelectedRestaurant && <Tooltip title="Add menu item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleNewMenuItem()}>
                            <i className="fas fa-list"></i>
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


