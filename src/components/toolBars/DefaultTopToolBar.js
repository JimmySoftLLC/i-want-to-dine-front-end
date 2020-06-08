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
    const [anchorPriceMenu, setAnchorPriceMenu] = React.useState(null);
    const [anchorCategoryMenu, setAnchorCategoryMenu] = React.useState(null);

    const closeCategoryMenu = () => {
        setAnchorCategoryMenu(null);
    };

    const categoryMenuClick = (event) => {
        setAnchorCategoryMenu(event.currentTarget);
    };

    const closePriceMenu = () => {
        setAnchorPriceMenu(null);
    };

    const priceMenuClick = (event) => {
        setAnchorPriceMenu(event.currentTarget);
    };

    const setUpRegistrationDialog = () => {
        dataAndMethodsContext.setSignInRegDialogTitle('Restaurant Sign In');
        dataAndMethodsContext.setSignInRegDialogType('signIn')
    }

    const goBack = () => {
        setMyState(myStates['lastState'])
    }

    const handleCategoryClick = (myState) => {
        setMyState(myState)
        if (myStates.helpDialogStage === 2 && myStates.helpDialogActive) { closeCategoryMenu() }
    }

    const handlePriceClick = (myState) => {
        setMyState(myState)
        if (myStates.helpDialogStage === 4 && myStates.helpDialogActive) { closePriceMenu() }
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
                    {myStates.menuItems && <Tooltip title="Select menu category">
                        <IconButton aria-controls="simple-menu" aria-haspopup="true"
                            color="inherit"
                            onClick={categoryMenuClick}>
                            <i className="fas fa-list"></i>
                        </IconButton>
                    </Tooltip>}
                    <Menu
                        id="simple-menu2"
                        anchorEl={anchorCategoryMenu}
                        keepMounted
                        open={Boolean(anchorCategoryMenu)}
                        onClose={closeCategoryMenu}
                    >
                        <MenuItem onClick={closeCategoryMenu}>
                            <IconButton aria-label=""
                                color={"primary"}
                            >
                                <i className="fas fa-times"></i>
                            </IconButton>
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Daily specials">
                                <IconButton aria-label="" color={myStates['specials'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('specials')}
                                >
                                    <i className="fas fa-tag"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Soup">
                                <IconButton aria-label="" color={myStates['soup'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('soup')}
                                >
                                    <i className="icon-soup"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Salad">
                                <IconButton aria-label="" color={myStates['salad'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('salad')}
                                >
                                    <i className="icon-salad"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Appetizers">
                                <IconButton aria-label="" color={myStates['appetizers'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('appetizers')}
                                >
                                    <i className="icon-appetizer"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Sandwiches">
                                <IconButton aria-label="" color={myStates['sandwich'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('sandwich')}
                                >
                                    <i className='fas fa-hamburger'></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Pizza">
                                <IconButton aria-label="" color={myStates['pizza'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('pizza')}
                                >
                                    <i className="fas fa-pizza-slice"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Pasta">
                                <IconButton aria-label="" color={myStates['pasta'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('pasta')}
                                >
                                    <i className='icon-spaghetti'></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Entrees">
                                <IconButton aria-label="" color={myStates['entree'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('entree')}
                                >
                                    <i className="fas fa-concierge-bell"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Dessert">
                                <IconButton aria-label="" color={myStates['dessert'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('dessert')}
                                >
                                    <i className="fas fa-birthday-cake"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Drinks">
                                <IconButton aria-label="" color={myStates['drinks'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('drinks')}
                                >
                                    <i className="fas fa-cocktail"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                        <MenuItem>
                            {myStates.menuItems && <Tooltip title="Kids menu">
                                <IconButton aria-label="" color={myStates['kids'] ? "secondary" : "default"}
                                    onClick={() => handleCategoryClick('kids')}
                                >
                                    <i className="fas fa-child"></i>
                                </IconButton>
                            </Tooltip>}
                        </MenuItem>
                    </Menu>
                    {myStates.menuItems && <Tooltip title="Set price points">
                        <IconButton aria-controls="simple-menu" aria-haspopup="true"
                            color="inherit"
                            onClick={priceMenuClick}>
                            <i className="fas icon-dollar_1"></i>
                        </IconButton>
                    </Tooltip>}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorPriceMenu}
                        keepMounted
                        open={Boolean(anchorPriceMenu)}
                        onClose={closePriceMenu}
                    >
                        <MenuItem onClick={closePriceMenu}>
                            <IconButton aria-label=""
                                color={"primary"}
                            >
                                <i className="fas fa-times"></i>
                            </IconButton>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip title="0-20 dollars">
                                <IconButton aria-label=""
                                    color={myStates['dollar_1'] ? "secondary" : "default"}
                                    onClick={() => handlePriceClick('dollar_1')}>
                                    <i className="icon-dollar_1"></i>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip title="20-35 dollars">
                                <IconButton aria-label=""
                                    color={myStates['dollar_2'] ? "secondary" : "default"}
                                    onClick={() => handlePriceClick('dollar_2')}>
                                    <i className="icon-dollar_2"></i>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                        <MenuItem>
                            <Tooltip title="35 and up dollars">
                                <IconButton aria-label=""
                                    color={myStates['dollar_3'] ? "secondary" : "default"}
                                    onClick={() => handlePriceClick('dollar_3')}>
                                    <i className="icon-dollar_3"></i>
                                </IconButton>
                            </Tooltip>
                        </MenuItem>
                    </Menu>
                    {myStates.menuItems && <Tooltip title="Beef and other">
                        <IconButton aria-label="" color={myStates['meat'] ? "default" : "inherit"}
                            onClick={() => setMyState('meat')}
                        >
                            <i className='icon-tbone'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Pork">
                        <IconButton aria-label="" color={myStates['pork'] ? "default" : "inherit"}
                            onClick={() => setMyState('pork')}
                        >
                            <i className='icon-ham'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Poultry">
                        <IconButton aria-label="" color={myStates['poultry'] ? "default" : "inherit"}
                            onClick={() => setMyState('poultry')}
                        >
                            <i className="fas fa-feather"></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Fish">
                        <IconButton aria-label="" color={myStates['fish'] ? "default" : "inherit"}
                            onClick={() => setMyState('fish')}
                        >
                            <i className='fas fa-fish'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Shellfish">
                        <IconButton aria-label="" color={myStates['shellfish'] ? "default" : "inherit"}
                            onClick={() => setMyState('shellfish')}
                        >
                            <i className='icon-shell'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Vegetarian">
                        <IconButton aria-label="" color={myStates['vegetarian'] ? "default" : "inherit"}
                            onClick={() => setMyState('vegetarian')}
                        >
                            <i className='fas fa-seedling'></i>
                        </IconButton>
                    </Tooltip>}
                    {myStates.menuItems && <Tooltip title="Cheese">
                        <IconButton aria-label="" color={myStates['cheese'] ? "default" : "inherit"}
                            onClick={() => setMyState('cheese')}
                        >
                            <i className='fas fa-cheese'></i>
                        </IconButton>
                    </Tooltip>}

                    {myStates.menuItems && <Tooltip title="Carryout">
                        <IconButton aria-label="" color={myStates['carryout'] ? "default" : "inherit"}
                            onClick={() => setMyState('carryout')}
                        >
                            <i className="fas fa-shopping-bag"></i>
                        </IconButton>
                    </Tooltip>}

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