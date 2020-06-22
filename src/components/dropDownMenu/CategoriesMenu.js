import React, { Fragment, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const CategoriesMenu = () => {
    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;
    const [anchorCategoryMenu, setAnchorCategoryMenu] = React.useState(null);

    const closeCategoryMenu = () => {
        setAnchorCategoryMenu(null);
    };

    const categoryMenuClick = (event) => {
        setAnchorCategoryMenu(event.currentTarget);
    };

    const handleCategoryClick = (myState) => {
        setMyState(myState)
        if (myStates.helpDialogStage === 2 && myStates.helpDialogActive) { closeCategoryMenu() }
    }

    return (
        <Fragment>
            {myStates.menuItems && <Tooltip title="Select menu category">
                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                    color="inherit"
                    onClick={categoryMenuClick}>
                    <i className="fas fa-list"></i>
                </IconButton>
            </Tooltip>}
            <Menu
                id="price-menu"
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
                    {myStates.menuItems && <Tooltip title="Wine">
                        <IconButton aria-label="" color={myStates['wine'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('wine')}
                        >
                            <i className="fas fa-wine-glass"></i>
                        </IconButton>
                    </Tooltip>}
                </MenuItem>
                <MenuItem>
                    {myStates.menuItems && <Tooltip title="Beer">
                        <IconButton aria-label="" color={myStates['beer'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('beer')}
                        >
                            <i className="fas fa-beer"></i>
                        </IconButton>
                    </Tooltip>}
                </MenuItem>
                <MenuItem>
                    {myStates.menuItems && <Tooltip title="Coffee">
                        <IconButton aria-label="" color={myStates['coffee'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('coffee')}
                        >
                            <i className="fas fa-coffee"></i>
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
        </Fragment>
    );
}

export default CategoriesMenu;