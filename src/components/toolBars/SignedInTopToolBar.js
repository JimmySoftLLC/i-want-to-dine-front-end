import React, { Fragment, useContext, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import { v4 as uuidv4 } from 'uuid';

const SignedInTopToolBar = () => {
    const noSelectedRestaurant = 'Select Your Restaurant'
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { associateRestaurants, editRestaurant, setEditRestaurantOpen, associate } = dataAndMethodsContext;
    const [myRestaurantId, setRestaurant] = useState(noSelectedRestaurant);

    const handleChange = event => {
        //console.log(event.target.value);
        setRestaurant(event.target.value);
    };

    const handleEditRestaurant = () => {
        for (let i = 0; 1 < associateRestaurants.length; i++) {
            if (myRestaurantId === associateRestaurants[i].id) {
                let myEditItem = {
                    restaurantName: associateRestaurants[i].restaurantName,
                    description: associateRestaurants[i].description,
                    street: associateRestaurants[i].street,
                    city: associateRestaurants[i].city,
                    stateUS: associateRestaurants[i].stateUS,
                    zipCode: associateRestaurants[i].zipCode,
                    phoneNumber: associateRestaurants[i].phoneNumber,
                    urlLink: associateRestaurants[i].urlLink,
                    id: associateRestaurants[i].id,
                    menuItemIdsJSON: associateRestaurants[i].menuItemIdsJSON,
                    associateIdsJSON: associateRestaurants[i].associateIdsJSON,
                    approved: associateRestaurants[i].approved,
                    dialogType: "Edit",
                    myAssociate: associate,
                }
                editRestaurant(myEditItem);
                setEditRestaurantOpen(true);
                break;
            }
        }
    };

    const handleNewRestaurant = () => {
        let myAssociateIdsJSON = []
        myAssociateIdsJSON.push(associate.id)
        let myNewId = uuidv4()
        let myNewAssociate = JSON.parse(JSON.stringify(associate))
        myNewAssociate.restaurantIdsJSON.push(myNewId)
        let myEditItem = {
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
            dialogType: "New",
            myAssociate: myNewAssociate,
        }
        editRestaurant(myEditItem);
        setEditRestaurantOpen(true);
    };

    const handleDeleteRestaurant = () => {

    };

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

    const dude = associateRestaurants.map(restaurant => <MenuItem
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
                        value={myRestaurantId}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={'Select Your Restaurant'}>{'Select Your Restaurant'}</MenuItem>
                        {dude}
                    </Select>
                    {myRestaurantId !== noSelectedRestaurant && <Tooltip title="Edit restaurant">
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
                    {myRestaurantId !== noSelectedRestaurant && <Tooltip title="Delete restaurant">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => handleDeleteRestaurant()}>
                            <i className="icon-restaurant-minus"></i>
                        </IconButton>
                    </Tooltip>}
                </div>
            </Toolbar>
        </Fragment >
    );
}

export default SignedInTopToolBar;


