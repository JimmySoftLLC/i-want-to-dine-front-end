import React, { Fragment, useContext, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

const SignedInTopToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { associateRestaurants } = dataAndMethodsContext;

    const [myRestaurant, setRestaurant] = React.useState('Select Your Restaurant');

    const handleChange = event => {
        console.log(event.target.value);
        setRestaurant(event.target.value);
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
        {restaurant.name}
    </MenuItem>);

    return (
        <Fragment>
            <Toolbar>
                <div >
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={myRestaurant}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <MenuItem value={'Select Your Restaurant'}>{'Select Your Restaurant'}</MenuItem>
                        {dude}
                    </Select>
                </div>
            </Toolbar>
        </Fragment >
    );
}

export default SignedInTopToolBar;


