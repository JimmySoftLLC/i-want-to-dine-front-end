import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    websiteName,
} from '../../api/apiConstants';

const DefaultTopToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const setUpRegistrationDialog = () => {
        dataAndMethodsContext.setSignInRegDialogTitle('Restaurant Sign In');
        dataAndMethodsContext.setSignInRegDialogType('signIn')
    }

    const goBack = () => {
        setMyState(myStates['lastState'])
    }

    return (
        <Fragment>
            <Toolbar>
                <div >
                    {!myStates.restaurantDetail && <Tooltip title="Refresh">
                        <IconButton aria-label="" color="inherit"
                            href="/"
                        >
                            {websiteName}
                        </IconButton>
                    </Tooltip>}
                    {myStates.restaurantDetail && <Tooltip title="Go Back">
                        <IconButton aria-label="" color="inherit"
                            onClick={() => goBack()}
                        >
                            <i className="fas fa-angle-left"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Beef and other">
                        <IconButton aria-label="" color={myStates['meat'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('meat')}
                        >
                            <i className='icon-tbone'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Pork">
                        <IconButton aria-label="" color={myStates['pork'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('pork')}
                        >
                            <i className='icon-ham'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Poultry">
                        <IconButton aria-label="" color={myStates['poultry'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('poultry')}
                        >
                            <i className="fas fa-feather"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Fish">
                        <IconButton aria-label="" color={myStates['fish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('fish')}
                        >
                            <i className='fas fa-fish'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Shellfish">
                        <IconButton aria-label="" color={myStates['shellfish'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('shellfish')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Vegetarian">
                        <IconButton aria-label="" color={myStates['vegetarian'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('vegetarian')}
                        >
                            <i className='fas fa-seedling'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Cheese">
                        <IconButton aria-label="" color={myStates['cheese'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('cheese')}
                        >
                            <i className='fas fa-cheese'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Pasta">
                        <IconButton aria-label="" color={myStates['pasta'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('pasta')}
                        >
                            <i className='icon-spaghetti'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Sandwiches">
                        <IconButton aria-label="" color={myStates['sandwich'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('sandwich')}
                        >
                            <i className='fas fa-hamburger'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Dessert">
                        <IconButton aria-label="" color={myStates['dessert'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('dessert')}
                        >
                            <i className="fas fa-birthday-cake"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Daily specials">
                        <IconButton aria-label="" color={myStates['specials'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('specials')}
                        >
                            <i className="fas fa-tag"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Carryout">
                        <IconButton aria-label="" color={myStates['carryout'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('carryout')}
                        >
                            <i className="fas fa-shopping-bag"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Set price points">
                        <IconButton aria-controls="simple-menu" aria-haspopup="true"
                            color="inherit"
                            onClick={handleClick}>
                            <i className="fas icon-dollar_1"></i>
                        </IconButton>
                    </Tooltip>}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <IconButton aria-label=""
                                color={"primary"}
                            >
                                <i className="fas fa-times"></i>
                            </IconButton>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip title="0-20 dollars">
                                <IconButton aria-label=""
                                    color={myStates['dollar_1'] ? "secondary" : "primary"}
                                    onClick={() => setMyState('dollar_1')}>
                                    <i className="icon-dollar_1"></i>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip title="20-35 dollars">
                                <IconButton aria-label=""
                                    color={myStates['dollar_2'] ? "secondary" : "primary"}
                                    onClick={() => setMyState('dollar_2')}>
                                    <i className="icon-dollar_2"></i>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip title="35 and up dollars">
                                <IconButton aria-label=""
                                    color={myStates['dollar_3'] ? "secondary" : "primary"}
                                    onClick={() => setMyState('dollar_3')}>
                                    <i className="icon-dollar_3"></i>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                    </Menu>
                    {myStates.associates && <Tooltip title="Log in">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => setUpRegistrationDialog()}>
                            <i className="fas fa-sign-in-alt"></i>
                        </IconButton>
                    </Tooltip>}
                </div>
            </Toolbar>
        </Fragment>
    );
}

export default DefaultTopToolBar;