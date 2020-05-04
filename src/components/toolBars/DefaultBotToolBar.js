import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DefaultBotToolBar = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;

    const setUpRegistrationDialog = () => {
        dataAndMethodsContext.setSignInRegDialogTitle('Restaurant Sign In');
        dataAndMethodsContext.setSignInRegDialogType('signIn')
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Toolbar showLabel="false" color="primary">
                <Tooltip title="Menu items">
                    <IconButton aria-label=""
                        color={myStates['menuItems'] ? "secondary" : "primary"}
                        onClick={() => setMyState('menuItems')}>
                        <i className="fas fa-book-open"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurants">
                    <IconButton aria-label=""
                        color={myStates['restaurants'] ? "secondary" : "primary"}
                        onClick={() => setMyState('restaurants')}>
                        <i className="icon-resturant"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurant associates">
                    <IconButton aria-label=""
                        color={myStates['associates'] ? "secondary" : "primary"}
                        onClick={() => setMyState('associates')}>
                        <i className="fas fa-users"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Information">
                    <IconButton aria-label="" color={myStates['info'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setMyState('info')}
                    >
                        <i className="fas fa-info"></i>
                    </IconButton>
                </Tooltip>
                {myStates.menuItems && <Tooltip title="Set price points">
                    <IconButton aria-controls="simple-menu" aria-haspopup="true"
                        color="primary"
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
                        color="primary"
                        onClick={() => setUpRegistrationDialog()}>
                        <i className="fas fa-sign-in-alt"></i>
                    </IconButton>
                </Tooltip>}
                {/* {(myStates.restaurants) && <Tooltip title="Map restaurant">
                    <IconButton aria-label=""
                        color="primary">
                        <i className="icon-map-marker-restaurant"></i>
                    </IconButton>
                </Tooltip>} */}
            </Toolbar>
        </Fragment>
    );
}

export default DefaultBotToolBar;
